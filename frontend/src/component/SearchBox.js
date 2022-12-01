import React, { useState, Fragment } from "react";
import { ReactComponent as Home } from "../icons/Home.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { ReactComponent as Clear } from "../icons/clear.svg";
import { ReactComponent as Search } from "../icons/search.svg";

import data from "../Data/data.json";

function SearchBox(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [menuHeight, setMenuHeight] = useState(null);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
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
    <div>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Enter data ...."
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {!wordEntered ? (
              <Search tabIndex="0" />
            ) : (
              <Clear onClick={clearInput} tabIndex="0" />
            )}
          </div>
        </div>

        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 5).map((value, key) => {
              return (
                <div
                  tabindex="0"
                  className="dataItem"
                  key={value.title}
                  onClick={() => choosenItem(value.title)}
                  onKeyPress={() => choosenItem(value.title)}
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
