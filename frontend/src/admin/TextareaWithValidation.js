import React, { useState } from "react";
import { formInput, formLabel } from "./AdminCSS";

function TextareaWithValidation(props) {
  const { label, defaultValue, placeholder, errorMessage } = props;
  // Declare a state variable for the input value
  const [value, setValue] = useState(defaultValue || "");
  // Declare a state variable for the error message
  const [error, setError] = useState("");

  // Define the regular expression for validation
  const regex = /^.{0,10}$/;

  // Define a function to handle input changes
  const handleChange = (event) => {
    //Get the current input value
    const currentValue = event.target.value;
    //Validate the input using the regular expression
    const isValid = regex.test(currentValue);
    //Set the input value and error message in state
    if (isValid) {
      setValue(currentValue);
      setError("");
    } else {
      setValue(currentValue);
      setError(errorMessage);
    }
    console.log("działa handleChange");
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <label htmlFor={label} style={formLabel}>
        {label}
      </label>
      <textarea
        id={label}
        style={formInput}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && (
        <p
          style={{
            fontSize: "0.8rem",
            padding: "0.3rem",
            color: "red",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default TextareaWithValidation;
