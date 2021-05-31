import classNames from "classnames";
import "./CheckBox.css";

const CheckBox = ({
  checked = false,
  handleCheckCb = (f) => f,
  disabled = false,
}) => {
  const handleCheck = (ev) => {
    const { checked } = ev.target;
    handleCheckCb?.(checked);
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={handleCheck}
        checked={checked}
        disabled={disabled}
        className={classNames("checkBox", { ["disabled"]: disabled })}
      />
    </>
  );
};

export default CheckBox;
