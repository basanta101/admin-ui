import './CellInput.css';

const CellInput = ({ onChangeCb, value }) => {

    return (
        <input className='cellInput' onChange={(e) => onChangeCb(e.target.value)} value={value} autoFocus />
    )
}

export default CellInput;
