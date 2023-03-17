import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import useResponsive from "../component/useResponsive";

function RadioButtons({ handleBtnValue, radios }) {
  const { t } = useTranslation();
  const { windowWidth } = useResponsive();

  //styling

  const btnMinWidth = 70;

  const btnDistrict = {
    fontSize: "0.8rem",
    border: "none",
    borderRadius: "0.25rem",
    padding: "0.4rem",
    color: "white",
    fontWeight: "500",
    minWidth: windowWidth < 800 ? null : `${btnMinWidth}px`,
  };

  const btnOulineSuccess = {
    ...btnDistrict,
    color: "green",
    border: "1px solid green ",
    fontSize: "1rem",
    margin: "0.4rem",
    textTransform: "uppercase",
  };

  const btnOutlineDanger = {
    ...btnDistrict,
    color: "red",
    border: "1px solid red ",
    fontSize: "1rem",
    margin: "0.4rem",
    textTransform: "uppercase",
  };

  return radios.map((radio) => {
    const { id, name, value } = radio;
    return (
      <button
        className={value === "1" ? "btnSuccessFocus" : "btnDangerFocus"}
        key={id}
        value={value}
        style={value === "1" ? btnOulineSuccess : btnOutlineDanger}
        onClick={(e) => handleBtnValue(e)}
      >
        {name}
      </button>
    );
  });
}

export default RadioButtons;

RadioButtons.propTypes = {
  handleBtnValue: PropTypes.func.isRequired,
  radios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};
