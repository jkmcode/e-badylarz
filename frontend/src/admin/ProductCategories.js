import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { title, FormLayout, submitBtn } from "./AdminCSS";
import { dataProductCategories } from "../Data/dataProductCategories";
import { ONE } from "../constants/adminConstans";
import RadioButtons from "./RadioButtons";

function ProductCategories() {
  const { t } = useTranslation();

  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

  //variables
  const [radioValue, setRadioValue] = useState(ONE);

  //RadioButtons functions
  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        marginTop: "1rem",
        padding: "2rem",
        borderRadius: "0.5rem",
      }}
    >
      <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
      <div style={title}>{t("ProductCategories_title")}</div>
      <div
        style={{
          padding: "1rem",
          borderRadius: "1rem",
          border: "3px solid rgb(66, 66, 74)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {dataProductCategories.map((category) => {
            if (category.isActive && radioValue === "1") {
              return (
                <button
                  style={{
                    backgroundImage:
                      "linear-gradient(195deg, rgb(66, 66, 74) 0%, rgb(25, 25, 25) 100%)",
                    color: "white",
                    minWidth: "200px",
                    minHeight: "200px",
                    fontSize: "2rem",
                    borderRadius: "1rem",
                    margin: "auto",
                    marginBottom: "1rem",
                  }}
                >
                  {category.name}
                  <div>{category.icon}</div>
                </button>
              );
            }
            if (!category.isActive && radioValue === "0") {
              return (
                <button
                  style={{
                    backgroundImage:
                      "linear-gradient(195deg, rgb(66, 66, 74) 0%, rgb(25, 25, 25) 100%)",
                    color: "white",
                    minWidth: "200px",
                    minHeight: "200px",
                    fontSize: "2rem",
                    borderRadius: "1rem",
                    margin: "auto",
                    marginBottom: "1rem",
                  }}
                >
                  {category.name}
                  <div>{category.icon}</div>
                </button>
              );
            }
          })}
        </div>
      </div>
      {radioValue === ONE && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button style={submitBtn}>Add Category</button>
        </div>
      )}
    </div>
  );
}

export default ProductCategories;
