import React, { useEffect, useState } from "react";
import { formInput, formLabel } from "./AdminCSS";
function SelectOption({
  onChange,
  optionsList,
  defaultValue,
  label,
  emptyValueError,
  ...inputProps
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setError(null);
  };

  const handleBlur = () => {
    if (!selectedValue) {
      setError("Please select an option");
    }
  };

  useEffect(() => {
    if (selectedValue) {
      onChange(selectedValue);
    }
  }, [selectedValue]);

  return (
    <div>
      <label style={formLabel}>{label}</label>
      <div>
        <select
          className="selectFrom"
          style={
            emptyValueError
              ? { ...formInput, borderColor: "red" }
              : { ...formInput, borderColor: "rgb(206, 212, 218)" }
          }
          value={selectedValue}
          onChange={handleChange}
          onBlur={handleBlur}
          {...inputProps}
        >
          <option value={defaultValue} hidden>
            {defaultValue}
          </option>
          {optionsList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <span style={{ fontSize: "0.8rem", color: "red", padding: "3px" }}>
          {error}
        </span>
      </div>
    </div>
  );
}

export default SelectOption;
