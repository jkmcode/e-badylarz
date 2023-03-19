import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

function SearchFilter({ onChange, listOfData, radioValue }) {
  const [items, setItems] = useState();
  const [filterItems, setFilterItems] = useState([]);

  const handleChange = (event) => {
    setItems(event.target.value);
  };

  useEffect(() => {
    if (items) {
      const lowerCaseStr = items.toLowerCase();
      setFilterItems(
        listOfData.filter((item) =>
          item.name.toLowerCase().includes(lowerCaseStr)
        )
      );
    } else {
      setFilterItems(listOfData);
    }
    onChange(filterItems);
  }, [items, filterItems.length]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#E8E8E8",
        marginTop: "1.5rem",
        padding: "0.5rem",
        color: "#888888",
      }}
    >
      <Icon
        icon="carbon:search"
        color="#888888"
        width="24"
        height="24"
        style={{ marginRight: "1rem" }}
      />
      <input
        onChange={handleChange}
        type="search"
        style={{ width: "100%" }}
        placeholder="Search a product"
      />
    </div>
  );
}

export default SearchFilter;
