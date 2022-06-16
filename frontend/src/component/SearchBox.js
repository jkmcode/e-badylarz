import React, { useState, Fragment } from "react";
import { ReactComponent as Home } from "../icons/Home.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";

function SearchBox(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = props.data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (!searchWord) {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const choosenItem = (e) => {
    // przekazanie stanu (wybranego itema z listy) do reduxa. --- DO ZROBIENIA
    // uruchomić reducera który zmieni stan globalny aplikacji
    setFilteredData([]);
    setWordEntered(e);
    console.log("działa choosenProduct", e);
  };

  return (
    <div className="centerContainer">
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={props.placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {!wordEntered ? (
              <Home />
            ) : (
              <ArrowIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 5).map((value, key) => {
              return (
                <div
                  className="dataItem"
                  key={value.title}
                  onClick={() => choosenItem(value.title)}
                >
                  {value.title}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
