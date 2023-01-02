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
        title="Please enter your name"
        style={formInput}
        className="formInput"
        type={type}
        {...inputProps}
        autocomplete="off"
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />

      <span className="errorMessage">{errorMessage}</span>
    </div>
  );
}

export default FormInput;
