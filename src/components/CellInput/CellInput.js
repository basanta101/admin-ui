import { useEffect, useRef } from 'react'
import "./CellInput.css";

const CellInput = ({
  onChange = (f) => f,
  value = "",
  pattern = "",
  type = "text",
  onBlur = (f) => f,
  autofocus = false,
}) => {

  const inputRef = useRef();

  useEffect(() => {
   if(autofocus) {
     inputRef.current.focus();
   }
  }, []);

  return (
    <input
      aria-label="cell-input"
      ref={node => inputRef.current = node }
      className="cellInput"
      onChange={(e) => onChange(e.target.value)}
      value={value}
      type={type}
      pattern={pattern}
      onBlur={onBlur}
    />
  );
};

export default CellInput;
