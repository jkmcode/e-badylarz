import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formLabel, formInput } from "./AdminCSS";

function FormInputIBAN(props) {
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

  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 39)
        .toUpperCase() || ""
    );
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (event) => {
    const currentValue = event.target.value;
    setValue(normalizeCardNumber(currentValue));
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

FormInputIBAN.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["tel"]).isRequired,
  placeholder: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
};

//This will set the default values for pattern, defaultValue, and required to an empty string, '',
//and false, respectively, if these props are not provide
FormInputIBAN.defaultProps = {
  pattern: "",
  defaultValue: "",
  required: false,
};

export default FormInputIBAN;
