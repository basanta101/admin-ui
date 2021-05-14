import { TableBody, TableHeader } from "./components";
import "./Table.css";

const Table = ({ columns = [], data = [], selectedRows = [] }) => {
  return (
    <div className="tableWrapper">
      <TableHeader columns={columns} />
      <TableBody
        columns={columns}
        rows={data}
        keyId="id"
        selectedRows={selectedRows}
      />
    </div>
  );
};

export default Table;
