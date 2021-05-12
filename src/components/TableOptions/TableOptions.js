import classNames from "classnames";
import "./TableOptions.css";

const CellInput = ({ onDeleteCb, onEditCb, onDoneCb, isRowInEditMode }) => {
  return (
    <div>
      <button className={classNames("delBtn", "btn")} onClick={onDeleteCb}>
        X
      </button>
      <button
        className="btn"
        onClick={() => {
          isRowInEditMode ? onDoneCb() : onEditCb();
        }}
      >
        {isRowInEditMode ? "DONE" : "EDIT"}
      </button>
    </div>
  );
};

export default CellInput;
