import React from "react";
import useResponsive from "./useResponsive";

function ContentContainer({ children }) {
  const { windowWidth } = useResponsive();

  const mainContener = {
    display: "flex",
    justifyContent: "center",

    position: "relative",
    maxHeight: "100vh",
    height: "100%",
    marginLeft: windowWidth < 1200 ? "0rem" : "15rem",
    marginTop: "1rem",
    paddingLeft: windowWidth < 1200 ? "0rem" : "4rem",
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
