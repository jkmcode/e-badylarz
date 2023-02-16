import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RadioButtons from "./RadioButtons";
import { Icon } from "@iconify/react";
import { ONE } from "../constants/environmentConstans";

function Products() {
  const { t } = useTranslation();

  //variables
  const [radioValue, setRadioValue] = useState(ONE);

  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

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
        minHeight: "50vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            fontSize: "calc(1.1rem + 0.3vw)",
            fontWeight: "500",
            margin: "0.4rem",
          }}
        >
          {t("Products_title")}
        </div>
        <button
          style={{
            border: "none",
            borderRadius: "0.2rem",
            backgroundColor: "#26A65B",
            padding: "0.5rem 1.5rem",
            color: "white",
          }}
        >
          {t("Products_add_product_btn")}
        </button>
      </div>
      <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
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
        <input style={{ width: "100%" }} placeholder="Search a product" />
      </div>
    </div>
  );
}

export default Products;
