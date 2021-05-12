import { CheckBox, TableOptions, CellInput } from '../index'

export const columns = ({ handleCheckCB, onDeleteCb, onEditCb, rowInEditModeData, onCellDataChangeCb, onRowEditDoneCb }) =>{

    return [
        {
            header: null,
            accessor: null,
            useCellForColHeader: true,
            colId: 'checkBoxCol',
            Cell : ({data}) => {
                return <CheckBox handleCheckCB={(checked) => handleCheckCB({ ...data, checked})}/>
            },
        },
        {
            header: 'Name',
            accessor: 'name',
            colId: 'nameCol',
            Cell : ({data}) => {
                const { id, name } = rowInEditModeData;
                return (
                    <>{
                        id === data.id ? <CellInput value={name} onChangeCb={(val) => onCellDataChangeCb({ type: 'name', val})} /> : <span>{data.name||'--'}</span>
                    }</>
                )
            },
        },
        {
            header: 'Email',
            accessor: 'email',
            colId: 'emailCol',
            Cell : ({data}) => {
                const { id, email } = rowInEditModeData;
                return (
                    <>{
                        id === data.id ? <CellInput value={email}  onChangeCb={(val) => onCellDataChangeCb({ type: 'email', val})} /> : <span>{data.email || '--'}</span>
                    }</>
                )
            },
        },
        {
            header: 'Role',
            accessor: 'role',
            colId: 'roleCol',
            Cell : ({data}) => {
                const { id, role } = rowInEditModeData;
                return (
                    <>{
                        id === data.id ? <CellInput value={role} onChangeCb={(val) => onCellDataChangeCb({ type: 'role', val})} /> : <span>{data.role || '--'}</span>
                    }</>
                )
            },
        },
        {
            header: 'Actions',
            accessor: null,
            colId: 'actionsCol',
            useCellForColHeader: false,
            Cell: ({data}) => {
                return <TableOptions
                 onDeleteCb={() => onDeleteCb(data)}
                  onEditCb={() => onEditCb(data)}
                  onDoneCb={() => onRowEditDoneCb()}
                  isRowInEditMode={data.id === rowInEditModeData.id}
                  // edit text
                   />
            }
        }
    ];
}
