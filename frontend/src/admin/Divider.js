import React from "react";

function Divider({ backgroundColor }) {
  const divider = {
    width: "80%",
    margin: "auto",
    height: "1px",
    backgroundColor: backgroundColor,
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  };

  return <div style={divider}></div>;
}

export default Divider;
