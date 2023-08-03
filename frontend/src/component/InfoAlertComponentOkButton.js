import React from "react";
import Divider from "../admin/Divider";
import { useTranslation } from "react-i18next";

function InfoAlertComponentOkButton({ confirmYes, context,
  errorHTTP = false, succes = false }) {
  const { t } = useTranslation();
  //styling
  const mainContainer = {
    position: "relative",
    backgroundColor: "whitesmoke",
    width: "80%",
    maxWidth: "600px",
    height: "40vh",
    textAlign: "center",
  };

  const modalOverlay = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "grid",
    placeItems: "center",
    transition: `all 0.3s linear`,
    visibility: "hidden",
    zIndex: "-1",
  };

  const showModalOverlay = {
    ...modalOverlay,
    visibility: "visible",
    zIndex: "10",
  };

  const title = {
    color: "black",
    fontSize: "1.5rem",
    fontWeight: "500",
    marginTop: "1rem",
  };

  const body = {
    textAlign: "center",
    marginLeft: "3rem",
    marginRight: "3rem",
    fontWeight: "600",
    fontSize: "1.3rem",
    whiteSpace: "pre-line"
  };

  const btn = {
    position: "absolute",
    border: "none",
    padding: "0.5rem",
    minWidth: "100px",
    borderRadius: "1rem",
    color: "white",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: "0.9rem",
  };

  const yesBtn = {
    ...btn,
    backgroundImage: `linear-gradient(171deg, rgba(29, 223, 77, 1) 45%, rgba(60, 128, 46, 1) 89%)`,
    bottom: "5%",
    right: "42%",
  };


  return (
    <div style={showModalOverlay}>
      <div style={mainContainer}>
        <div style={title}>
          {succes ? t("Confirmation_title_success")
            : errorHTTP ? t("Confirmation_title_error")
              : t("Confirmation_title_form")}
        </div>
        <Divider backgroundColor="gray" />
        <div style={body}> {context}</div>
        <button style={yesBtn} onClick={(e) => confirmYes(e)}>
          {t("btn_ok")}
        </button>
      </div>
    </div>
  );
}

export default InfoAlertComponentOkButton;
