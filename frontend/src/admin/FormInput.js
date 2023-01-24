import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formLabel, formInput } from "./AdminCSS";

function FormInput(props) {
  const {
    label,
    errorMessage,
    onChange,
    id,
    type,
    textArea,
    defaultValue,
    name,
    ...inputProps
  } = props;

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(defaultValue || "");

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (event) => {
    const currentValue = event.target.value;
    setValue(currentValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    onChange(name, value);
  }, [value]);

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
        value={value}
        {...inputProps}
        onChange={handleChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />

      <span className="errorMessage">{errorMessage}</span>
    </div>
  );
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
};

//This will set the default values for pattern, defaultValue, and required to an empty string, '',
//and false, respectively, if these props are not provide
FormInput.defaultProps = {
  pattern: "",
  defaultValue: "",
  required: false,
};

export default FormInput;