import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import useResponsive from "./useResponsive";

function SearchBar() {
  const { windowWidth } = useResponsive();

  const searchBackground = {
    backgroundColor: "#c6ebd7",
    paddingBottom: "0.5rem",
    width: "100%",
    height: "8vh",
  };

  const search = {
    position: "absolute",
    zIndex: "999",
    left: "45%",
    transform: "translate(-45%, 0%)",
  };

  return (
    <>
      {windowWidth < 800 ? (
        <div style={searchBackground}>
          <div style={search}>
            <SearchBox />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SearchBar;
