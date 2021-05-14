import classNames from "classnames";
import "./TableHeader.css";

const TableHeader = ({ columns = [] }) => {
  return (
    <div className="columnWrapper">
      {columns.map((col, index) => {
        return (
          <div className={classNames({ headerCol: index })} key={col.colId}>
            {col.Header({ data: col })}
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
