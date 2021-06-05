import { CheckBox, TableOptions, CellInput } from "../index";
import "./UsersView.css";

export const columns = ({
  handleCheckRow = (f) => f,
  handleCheckAllRow = (f) => f,
  isAllRowsInViewChecked = false,
  handleRowDelBtnClick = (f) => f,
  handleRowEditBtnClick = (f) => f,
  rowInEditModeData = {},
  onCellDataChange = (f) => f,
  onRowEditDone = (f) => f,
  selectedRows = [],
  onBlurCellInput = (f) => f,
  isAllRowsDeleted = false,
}) => {
  return [
    {
      Header: ({ data }) => {
        return (
          <CheckBox
            handleCheckCb={(checked) => handleCheckAllRow({ ...data, checked })}
            checked={isAllRowsInViewChecked}
            disabled={isAllRowsDeleted}
          />
        );
      },
      colId: "checkBoxCol",
      Cell: ({ data }) => {
        return (
          <CheckBox
            handleCheckCb={(checked) => handleCheckRow({ ...data, checked })}
            checked={selectedRows.includes(data.id)}
          />
        );
      },
    },
    {
      Header: () => <span className="colLabel">Name</span>,
      colId: "nameCol",
      Cell: ({ data }) => {
        const { id, name } = rowInEditModeData;
        const nameValue = data.name || "--";
        return (
          <>
            {id === data.id ? (
              <CellInput
                value={name}
                onChange={(val) => onCellDataChange({ type: "name", val })}
                pattern="[a-zA-Z]"
                onBlur={onBlurCellInput}
              />
            ) : (
              <span className="cellText" title={nameValue}>{nameValue}</span>
            )}
          </>
        );
      },
    },
    {
      Header: () => <span className="colLabel">Email</span>,
      colId: "emailCol",
      Cell: ({ data }) => {
        const { id, email } = rowInEditModeData;
        const emailValue = data.email || "--";
        return (
          <>
            {id === data.id ? (
              <CellInput
                value={email}
                onChange={(val) => onCellDataChange({ type: "email", val })}
                type="email"
                onBlur={onBlurCellInput}
              />
            ) : (
              <span className="cellText" title={emailValue}>
                {emailValue}
              </span>
            )}
          </>
        );
      },
    },
    {
      Header: () => <span className="colLabel">Role</span>,
      colId: "roleCol",
      Cell: ({ data }) => {
        const { id, role } = rowInEditModeData;
        const roleValue = data.role || "--";
        return (
          <>
            {id === data.id ? (
              <CellInput
                value={role}
                onChange={(val) => onCellDataChange({ type: "role", val })}
                onBlur={onBlurCellInput}
                autofocus
              />
            ) : (
              <span className="cellText" title={roleValue}>
                {roleValue}
              </span>
            )}
          </>
        );
      },
    },
    {
      Header: () => <span className="colLabel">Actions</span>,
      colId: "actionsCol",
      Cell: ({ data }) => {
        return (
          <TableOptions
            handleRowDelBtnClick={() => handleRowDelBtnClick(data)}
            handleRowEditBtnClick={() => handleRowEditBtnClick(data)}
            onDone={onRowEditDone}
            isRowInEditMode={data.id === rowInEditModeData.id}
          />
        );
      },
    },
  ];
};

export const pageSize = 10;

export const SEARCH_INPUT_PLACEHOLDER = "Search by name, email or role";
