import React from "react";
import "../css/BindedInput.css";

function BindedInput({ name, bindedVar, setVarFunc, onKeyDownHandler }) {
  const onChangeHandler = (e, setFunc) => setFunc(e.target.value);

  return (
    <input
      className={name}
      name={name}
      type="text"
      onChange={(e) => onChangeHandler(e, setVarFunc)}
      onKeyDown={onKeyDownHandler}
      value={bindedVar}
      placeholder={`Enter ${name} here`}
    />
  );
}

export default BindedInput;
