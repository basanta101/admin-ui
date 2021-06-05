import { useState, useEffect } from "react";
import _ from "lodash";
import {
  columns,
  pageSize,
  SEARCH_INPUT_PLACEHOLDER,
} from "./UsersView.constants";
import {
  paginate,
  calculateTotalPages,
  validateRowFields,
} from "./UsersView.utils";
import "./UsersView.css";
import { Pagination, Table, SearchInput } from "../index";
import { useFetch } from "../../utils";

const UsersView = () => {
  // replica of original data, kept for reference.
  const [originalUserData, updateOriginalUserData] = useState([]);
  /* The array (users), which will be modified, while performing table operations, 
    such as delete, edit
  */
  const [users, updateUsers] = useState([]);
  const [pagination, updatePagination] = useState({
    pageSize,
    currentPageNo: 1,
    totalPages: null,
    searchStartPageNo: 0,
  });
  const [searchText, updateSearchText] = useState({
    isDirty: false,
    value: "",
  });
  const [rowInEditModeData, updateRowInEditModeData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
  });
  const [selectedRows, updateSelectedRows] = useState([]); // rows which are checked.
  const [allRowsCheckedPages, updateAllRowsCheckedPages] = useState([]); // pages with all rows selected.

  useEffect(() => {
    // const url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
    // const { response: users } = useFetch(url);
    // const totalPages = calculateTotalPages(users, pageSize);
    // updateOriginalUserData(users);
    // updateUsers(users);
    // updatePagination({
    //   ...pagination,
    //   totalPages,
    // });
    try {
      fetch(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      )
        .then((response) => response.json())
        .then((data) => {
          const totalPages = calculateTotalPages(data, pageSize);
          updateOriginalUserData(data);
          updateUsers(data);
          updatePagination({
            ...pagination,
            totalPages,
          });
        });
    } catch (err) {
      console.log("error while fetching users data", err);
    }
  }, []);

  const handlePageChange = (pageNo) => {
    const { pageSize } = pagination;
    const newTotalPages = calculateTotalPages(users, pageSize);
    if (pageNo === 0 || pageNo > newTotalPages) return;
    updatePagination({
      ...pagination,
      currentPageNo: pageNo,
      totalPages: newTotalPages,
    });
  };

  const handleSearchTextChange = (event) => {
    const { value } = event.target;
    const searchVal = value.toLowerCase();
    const { pageSize, currentPageNo, searchStartPageNo } = pagination;
    const filteredUsers = originalUserData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchVal) ||
        item.role.toLowerCase().includes(searchVal) ||
        item.email.toLowerCase().includes(searchVal)
    );
    updateUsers(filteredUsers);
    const newTotalPages = calculateTotalPages(filteredUsers, pageSize);
    let newSearchStartPageNo = searchStartPageNo;
    if (!searchText.isDirty) {
      // isDirty is false, set the search start pageNo
      newSearchStartPageNo = currentPageNo;
    }
    updatePagination({
      ...pagination,
      currentPageNo: value ? 1 : searchStartPageNo, // if user searches
      totalPages: newTotalPages,
      searchStartPageNo: newSearchStartPageNo,
    });

    updateSearchText({ value, isDirty: value ? true : false });
  };

  const handleCheckRow = (checkedRowData) => {
    const { checked, id } = checkedRowData;
    // TODO: refactor to use one update
    if (checked && !selectedRows.includes(id)) {
      updateSelectedRows(selectedRows.concat(id));
    } else {
      updateSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  const handleCheckAllRow = (checkedColData) => {
    const { checked } = checkedColData;
    let selectedIds = selectedRows;
    let allRowsInViewCheckedPageNos = allRowsCheckedPages;
    const { pageSize, currentPageNo } = pagination;
    const checkedUsers = paginate(users, pageSize, currentPageNo).map(
      (item) => item.id
    );
    if (checked) {
      // check all the rows in view, push their ids into selectedIds(array)
      selectedIds = selectedRows.concat(checkedUsers);
      // store the page no for which all the rows are selected.
      allRowsInViewCheckedPageNos =
        allRowsInViewCheckedPageNos.concat(currentPageNo);
    }

    if (!checked) {
      selectedIds = selectedRows.filter((row) => !checkedUsers.includes(row));
      allRowsInViewCheckedPageNos = allRowsInViewCheckedPageNos.filter(
        (pageNo) => pageNo !== currentPageNo
      );
    }

    updateSelectedRows(selectedIds);
    updateAllRowsCheckedPages(allRowsInViewCheckedPageNos);
  };

  const handleRowEditBtnClick = (data) => {
    updateRowInEditModeData({ ...data });
  };

  const onCellDataChange = ({ type, val }) => {
    updateRowInEditModeData({ ...rowInEditModeData, [type]: val });
  };

  const onRowEditDone = () => {
    // if any of the filed is empty alert the user and return
    const { isValid, errMsg } = validateRowFields(rowInEditModeData);
    if (!isValid) {
      alert(errMsg);
      return;
    }
    const editedUsers = users.map((item) =>
      item.id === rowInEditModeData.id ? { ...rowInEditModeData } : item
    );
    updateOriginalUserData([...editedUsers]);
    updateUsers(editedUsers);
    updateRowInEditModeData({
      id: null,
      name: "",
      email: "",
      role: "",
    });
  };

  const handleRowDelBtnClick = (data) => {
    const { totalPages: prevTotalPages, currentPageNo, pageSize } = pagination;
    const filteredUsers = users.filter((user) => user.id !== data.id);
    const newTotalPages = calculateTotalPages(filteredUsers, pageSize);
    updateUsers(filteredUsers);
    // let pagination
    // TODO: refactor to use one update
    if (newTotalPages < prevTotalPages) {
      updatePagination({
        ...pagination,
        currentPageNo: Math.max(1, currentPageNo - 1),
        totalPages: Math.max(1, newTotalPages),
      });
      return;
    }
    updatePagination({ ...pagination, totalPages: newTotalPages });
  };

  const handleFooterDelBtnClick = () => {
    if (!selectedRows.length) return; // no row is selected return.
    const { pageSize, currentPageNo } = pagination;
    let filteredUsers = users.filter((item) => !selectedRows.includes(item.id)); // users(rows of table) which are not selected
    const newTotalPages = calculateTotalPages(filteredUsers, pageSize);
    updateUsers(filteredUsers); // update the table by deleting selected users(table rows)
    updateAllRowsCheckedPages([]); // remove pageNo from all selected pageNos row arrays
    let newCurrentPageNo = currentPageNo;
    if (currentPageNo > newTotalPages) {
      // we need to decrement the current page no.
      newCurrentPageNo = newTotalPages;
    }
    updatePagination({
      ...pagination,
      currentPageNo: Math.max(1, newCurrentPageNo),
      totalPages: Math.max(1, newTotalPages),
    });
  };

  const getPaginatedData = (users) => {
    if (!users.length) return;
    const { currentPageNo, pageSize: currentPageSize } = pagination;
    return paginate(users, currentPageSize, currentPageNo);
  };

  const onBlurCellInput = () => {
    if (!rowInEditModeData.id) return;
    // if rowEdit was going on, save it.
    onRowEditDone();
  };

  return (
    <div className="wrapper">
      <SearchInput
        placeholder={SEARCH_INPUT_PLACEHOLDER}
        value={searchText.value}
        onChange={handleSearchTextChange}
      />
      <Table
        columns={columns({
          handleCheckRow,
          handleCheckAllRow,
          isAllRowsInViewChecked: allRowsCheckedPages.includes(
            pagination.currentPageNo
          ),
          handleRowDelBtnClick,
          handleRowEditBtnClick,
          rowInEditModeData,
          onCellDataChange,
          onRowEditDone,
          selectedRows,
          onBlurCellInput,
          isAllRowsDeleted: !users.length,
        })}
        data={getPaginatedData(users)}
        selectedRows={selectedRows}
      />
      <div className="footerWrapper">
        {users.length ? (
          <>
            <button
              className="footerDelBtn"
              onClick={handleFooterDelBtnClick}
              disabled={!selectedRows.length}
            >
              Delete Selected
            </button>
            <Pagination
              pagination={pagination}
              handlePageChange={handlePageChange}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UsersView;

// TODO: check if any code is using spread, ans it requires a deep copy
// use lodash to do deep copy instead of spread operator.
