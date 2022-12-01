import React from "react";

function ContentContainer({ children }) {
  const mainContener = {
    position: "relative",
    maxHeight: "100vh",
    height: "100%",
    marginLeft: "15rem",
    marginTop: "1rem",
    paddingLeft: "4rem",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
  };

  const cardContainer = {
    width: "95%",
  };
  return (
    <main style={mainContener}>
      <div style={cardContainer}>{children}</div>
    </main>
  );
}

export default ContentContainer;
