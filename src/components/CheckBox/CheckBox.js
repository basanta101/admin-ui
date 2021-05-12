import { useState } from 'react';


const CheckBox = ({ checked = false, handleCheckCB = (f) => f }) => {
    const [ checkValue, updateCheckValue] = useState(checked);

    const handleCheck = (ev) => {
       console.log('ppp', ev.target.checked);
       const { checked } = ev.target;
       updateCheckValue(checked);
       handleCheckCB?.(checked);
    }

   return (
       <>
         <input type="checkbox" onChange={handleCheck} defaultChecked={checkValue}/>
       </>
   )
};

export default CheckBox;