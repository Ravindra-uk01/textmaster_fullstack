import React from "react";
import "../../styles/switch.css";

const Switch = ({ value, onChange }) => {
  return (
    <label className='toggle-switch'>
        <input type='checkbox' checked={value} onChange={onChange} />
        <span className='switch'></span>
    </label>
  );
};

export default Switch;
