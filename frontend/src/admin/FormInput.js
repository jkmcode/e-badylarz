import React, { useState } from "react";
import { formLabel, formInput } from "./AdminCSS";

function FormInput(props) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const { label, errorMessage, onChange, id, type, textArea, ...inputProps } =
    props;

  return (
    <div>
      <label htmlFor={label} style={formLabel}>
        {label}
      </label>
      <input
        id={label}
        style={formInput}
        className="formInput"
        type={type}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />

      <span className="errorMessage">{errorMessage}</span>
    </div>
  );
}

export default FormInput;
