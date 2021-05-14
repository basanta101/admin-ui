import { useState, useEffect } from "react";
import { columns, pageSize, SEARCH_INPUT_PLACEHOLDER } from "./UsersView.constants";
import {
  paginate,
  calculateTotalPages,
  validateRowFields,
} from "./UsersView.utils";
import "./UsersView.css";
import { Pagination, Table, SearchInput } from "../index";

const UsersView = () => {
  // replica of orignal data, kept for reference.
  const [orignalUserData, updateOriginalUserData] = useState([]);

  /* The array (users), which will be modifed, while performing table operations, 
    such as delete, edit
  */
  const [users, updateUsers] = useState([]);

  const [pagination, updatePagination] = useState({
    pageSize,
    currentPageNo: 1,
    totalPages: null,
  });
  const [searchText, updateSearchText] = useState("");
  const [rowInEditModeData, updateRowInEditModeData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
  });
  const [selectedRows, updateSelectedRows] = useState([]); // rows which are checked
  const [isAllRowsInViewChecked, updateCheckAllRowsInView] = useState(false); // if true check all rows in view

  useEffect(() => {
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
    const { pageSize } = pagination;
    const filteredUsers = orignalUserData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchVal) ||
        item.role.toLowerCase().includes(searchVal) ||
        item.email.toLowerCase().includes(searchVal)
    );
    updateUsers(filteredUsers);
    const newTotalPages = calculateTotalPages(filteredUsers, pageSize);
    updatePagination({
      ...pagination,
      currentPageNo: 1,
      totalPages: newTotalPages,
    });
    updateSearchText(event.target.value);
  };

  const handleCheckRow = (checkedRowData) => {
    const { checked, id } = checkedRowData;

    if (checked && !selectedRows.includes(id)) {
      updateSelectedRows(selectedRows.concat(id));
    } else {
      updateSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  const handleCheckAllRow = (checkedColData) => {
    const { colId: checkHappenedOnColumnHeader, checked } = checkedColData;
    if (checkHappenedOnColumnHeader) {
      let selectedIds = [];
      if (checked) {
        const { pageSize, currentPageNo } = pagination;
        const checkedUsers = paginate(users, pageSize, currentPageNo);
        selectedIds = checkedUsers.map((item) => item.id);
      }
      updateSelectedRows(selectedIds);
    }
    updateCheckAllRowsInView(checked);
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
    if (!selectedRows.length) return;
    const { pageSize, currentPageNo } = pagination;
    let filteredUsers = users.filter((item) => !selectedRows.includes(item.id));
    const newTotalPages = calculateTotalPages(filteredUsers, pageSize);
    updateUsers(filteredUsers);
    updateCheckAllRowsInView(false);
    updatePagination({
      ...pagination,
      currentPageNo: Math.max(1, currentPageNo - 1),
      totalPages: Math.max(1, newTotalPages),
    });
  };

  const getPaginatedData = (users) => {
    if (!users.length) return;
    const { currentPageNo, pageSize: currentPageSize } = pagination;
    return paginate(users, currentPageSize, currentPageNo);
  };

  return (
    <div className="wrapper">
      <SearchInput
        placeholder={SEARCH_INPUT_PLACEHOLDER}
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <Table
        columns={columns({
          handleCheckRow,
          handleCheckAllRow,
          isAllRowsInViewChecked,
          handleRowDelBtnClick,
          handleRowEditBtnClick,
          rowInEditModeData,
          onCellDataChange,
          onRowEditDone,
          selectedRows,
        })}
        data={getPaginatedData(users)}
        selectedRows={selectedRows}
      />
      <div className="footerWrapper">
        <button className="footerDelBtn" onClick={handleFooterDelBtnClick}>
          Delete Selected
        </button>
        {users.length ? (
          <Pagination
            pagination={pagination}
            handlePageChange={handlePageChange}
          />
        ) : null}
      </div>
    </div>
  );
};

export default UsersView;
