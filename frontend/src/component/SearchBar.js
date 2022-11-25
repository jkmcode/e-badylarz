import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";

function SearchBar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const detectSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowWidth]);

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
