import React, { useState, useEffect } from "react";
import Divider from "./Divider";
import { useTranslation } from "react-i18next";

function ErrorMesageRedux({ confirmYes, error }) {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  //styling
  const mainContainer = {
    position: "relative",
    backgroundColor: "whitesmoke",
    width: "80%",
    maxWidth: "600px",
    height: "50vh",
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
    color: "red",
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

  const bodyCode = {
    ...body,
    textAlign: "left",
    marginLeft: "4rem",
    fontWeight: "500",
    fontSize: "1rem",
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
  useEffect(() => {
    switch (error.detail) {
      case "OtherError":
        return setErrorMessage(t("Error_OtherError"));
      case "NetworkError":
        return setErrorMessage(t("Error_NetworkError"));
      case "LOADING":
        return setErrorMessage(t("Error_LOADING"));
      case "HEADERS_RECEIVED":
        return setErrorMessage(t("Error_HEADERS_RECEIVED"));
      case "OPENED":
        return setErrorMessage(t("Error_OPENED"));
      case "UNSENT":
        return setErrorMessage(t("Error_UNSENT"));
      case "Error404":
        return setErrorMessage(t("Error_404"));
      case "Forbidden":
        return setErrorMessage(t("Error_Forbidden"));
      case "Unauthorized":
        return setErrorMessage(t("Error_Unauthorized"));
      case "Bad request. Offer not added - aleady exists":
        return setErrorMessage(t("Offer_aleady_exists"));
      case "Bad request. Offer not added":
        return setErrorMessage(t("Offer_not_added"));
      default:
        return setErrorMessage(error.detail);
    }
  }, []);

  return (
    <div style={showModalOverlay}>
      <div style={mainContainer}>
        <div style={title}>
          {t("Confirmation_title_error")}
        </div>
        <Divider backgroundColor="gray" />
        <div style={body}> {errorMessage}</div>
        <Divider backgroundColor="gray" />
        <div style={bodyCode}>{t("Offer_error_code")}
          {error.code ? error.code : null}
        </div>
        <div style={bodyCode}>
          {t("Offer_error_log")} { }
          {error.log ? t("Offer_log_yes") : t("Offer_log_no")}
        </div>
        <Divider backgroundColor="gray" />
        <button style={yesBtn} onClick={(e) => confirmYes(e)}>
          {t("btn_ok")}
        </button>
      </div>
    </div>
  );
}

export default ErrorMesageRedux;
