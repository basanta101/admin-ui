import classNames from "classnames";
import "./TableBody.css";

const TableBody = ({
  rows = [],
  columns = [],
  keyId = "name",
  selectedRows = [],
}) => {
  return (
    <div className="tableBody">
      {rows.map((row) => {
        return (
          <div
            className={classNames("tableRow", {
              selectedRow: selectedRows.includes(row.id),
            })}
            key={row[keyId]}
          >
            {columns.map((colItem, index) => (
              <div
                className={classNames({ tableCell: index })}
                key={`${row[keyId]}_${colItem.colId}`}
              >
                {" "}
                {colItem.Cell?.({ data: row })}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default TableBody;
