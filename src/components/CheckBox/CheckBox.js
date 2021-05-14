const CheckBox = ({ checked = false, handleCheckCb = (f) => f }) => {
  const handleCheck = (ev) => {
    const { checked } = ev.target;
    handleCheckCb?.(checked);
  };

  return (
    <>
      <input type="checkbox" onChange={handleCheck} checked={checked} />
    </>
  );
};

export default CheckBox;
