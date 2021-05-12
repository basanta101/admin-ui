import classNames from 'classnames';
import './TableHeader.css';

const TableHeader = ({
    columns,
}) => {
    return (
        <div className='columnWrapper'>
            {columns.map((col, index) => {
                return <div 
                className={classNames({'headerCol': index})}
                key={col.colId}
                >{ col.useCellForColHeader ? col.Cell({ data: col }) : col.header}</div>
            })}
        </div>
    );
};

export default TableHeader;