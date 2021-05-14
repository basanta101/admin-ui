import './CellInput.css';

const CellInput = ({ onChange = (f) => f, value='', pattern = '', type = 'text'}) => {
  return (
    <input
      className="cellInput"
      onChange={(e) => onChange(e.target.value)}
      value={value}
      autoFocus
      type={type}
      pattern={pattern}
    />
  );
};

export default CellInput;
