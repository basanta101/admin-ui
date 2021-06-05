import classNames from "classnames";
import "./TableOptions.css";

const CellInput = ({
  handleRowDelBtnClick = (f) => f,
  handleRowEditBtnClick = (f) => f,
  onDone = (f) => f,
  isRowInEditMode = false,
}) => {
  return (
    <>
      <button
        className={classNames("delBtn", "btn")}
        onClick={handleRowDelBtnClick}
        data-testid='delBtn'
      >
        X
      </button>
      <button
        className="btn"
        onClick={() => {
          isRowInEditMode ? onDone() : handleRowEditBtnClick();
        }}
        data-testid='done_edit_Btn'
      >
        {isRowInEditMode ? "DONE" : "EDIT"}
      </button>
    </>
  );
};

export default CellInput;
