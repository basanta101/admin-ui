import { useState, useEffect } from "react";
import { columns } from "./UsersView.constants";
import { filterUsers, splitIntoPages } from "./UsersView.utils";
import "./UsersView.css";
import { Pagination, Table, SearchInput } from "../index";

const UsersView = () => {
  const [orignalUserData, updateOriginalUserData] = useState([]);
  const [users, updateUsers] = useState({});
  const [pagination, updatePagination] = useState({
    pageSize: 10, // todo: store in constant
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

  const [selectedRows, updateSelectedRows] = useState([]);

  useEffect(() => {
    fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    )
      .then((response) => response.json())
      .then((data) => {
        updateOriginalUserData(data);
        const { pages, totalPages } = splitIntoPages(
          [...data],
          pagination.pageSize
        );
        updateUsers(pages);
        updatePagination({ ...pagination, totalPages });
      });
  }, []);

  const handlePageChangeCb = (pageNo) => {
    const { totalPages } = pagination;
    let newPageNo = pageNo;
    if (pageNo === 0 || pageNo > totalPages) return;
    updatePagination({ ...pagination, currentPageNo: newPageNo });
  };

  const handleSearchTextChange = (event) => {
    const { value } = event.target;
    const { pages, totalPages } = filterUsers([...orignalUserData], value);
    updateUsers(pages);
    updatePagination({ ...pagination, totalPages });
    updateSearchText(event.target.value);
  };

  const handleCheckCB = (data) => {
    const { colId: checkHappenedOnColumnHeader, checked, id } = data;
    if (checkHappenedOnColumnHeader) {
      let selectedIds = [];
      if (checked) {
        selectedIds = users[pagination.currentPageNo].map((item) => item.id);
      }
      updateSelectedRows(selectedIds);
      return;
    }
    
    if (checked && !selectedRows.includes(id)) {
      updateSelectedRows(selectedRows.concat(id));
    } else {
      updateSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  const onDeleteCb = (data) => {
    const temp = Object.values(users).reduce((acc, cv) => acc.concat(cv), []);
    const newUsers = temp.filter((item) => item.id !== data.id);
    const { pages } = splitIntoPages(newUsers, pagination.pageSize);
    updateUsers(pages);
  };

  const onEditCb = (data) => {
    updateRowInEditModeData({ ...data });
  };

  const onCellDataChangeCb = ({ type, val }) => {
    updateRowInEditModeData({ ...rowInEditModeData, [type]: val });
  };

  const onRowEditDoneCb = () => {
    const { currentPageNo } = pagination;
    const editedUsers = {
      ...users,
      [currentPageNo]: users[currentPageNo].map((item) =>
        item.id === rowInEditModeData.id ? { ...rowInEditModeData } : item
      ),
    };

    updateUsers(editedUsers);
    updateRowInEditModeData({
      id: null,
      name: "",
      email: "",
      role: "",
    });
  };

  const handleFooterDelBtnClick = () => {
    if (!selectedRows.length) return;
    const temp = Object.values(users).reduce((acc, cv) => acc.concat(cv), []);
    const newUsers = temp.filter((item) => !selectedRows.includes(item.id));
    const { pages, totalPages } = splitIntoPages(newUsers, pagination.pageSize);
    updateUsers(pages);
    updatePagination({ ...pagination, totalPages });
  };

  return (
    <div className="wrapper">
      <SearchInput
        placeholder="Search by name, email or role"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <Table
        columns={columns({
          handleCheckCB,
          onDeleteCb,
          onEditCb,
          rowInEditModeData,
          onCellDataChangeCb,
          onRowEditDoneCb,
        })}
        data={users[pagination.currentPageNo]}
        selectedRows={selectedRows}
      />
      <div className="footerWrapper">
        <button className="footerDelBtn" onClick={handleFooterDelBtnClick}>
          Delete Selected
        </button>
        <Pagination
          pagination={pagination}
          handlePageChangeCb={handlePageChangeCb}
        />
      </div>
    </div>
  );
};

export default UsersView;
