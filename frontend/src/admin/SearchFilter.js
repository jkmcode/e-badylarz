import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { ONE, ZERO } from "../constants/environmentConstans";
import { useTranslation } from "react-i18next";

function SearchFilter({ onChange, listOfData, radioValue }) {

  const { t } = useTranslation();
  const [items, setItems] = useState();
  const [filterItems, setFilterItems] = useState([]);

  // console.log("radioValue", radioValue);

  const handleChange = (event) => {
    setItems(event.target.value);
  };

  useEffect(() => {
    if (radioValue === ONE) {
      if (items) {
        const lowerCaseStr = items.toLowerCase();
        setFilterItems(
          listOfData.filter(
            (item) =>
              item.name.toLowerCase().includes(lowerCaseStr) &&
              item.is_active === true
          )
        );
      } else {
        setFilterItems(listOfData.filter((item) => item.is_active === true));
      }
      onChange(filterItems);
    }

    if (radioValue === ZERO) {
      if (items) {
        const lowerCaseStr = items.toLowerCase();
        setFilterItems(
          listOfData.filter(
            (item) =>
              item.name.toLowerCase().includes(lowerCaseStr) &&
              item.is_active === false
          )
        );
      } else {
        setFilterItems(listOfData.filter((item) => item.is_active === false));
      }
      onChange(filterItems);
    }
  }, [items, filterItems.length, radioValue, listOfData.length]);

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
        placeholder={t("SerachFilter_placeholder")}
      />
    </div>
  );
}

export default SearchFilter;
