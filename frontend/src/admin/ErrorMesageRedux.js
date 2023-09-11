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
    height: "65vh",
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
      case "NetworkError no internet":
        return setErrorMessage(t("Error_NetworkError1"));
      case "NetworkError no access to the server":
        return setErrorMessage(t("Error_NetworkError2"));
      case "LOADING":
        return setErrorMessage(t("Error_LOADING"));
      case "TIMEOUT":
        return setErrorMessage(t("Error_TIMEOUT"));
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
      case "Bad request. No my product":
        return setErrorMessage(t("No_my_product"));
      case "Bad request. No my offers":
        return setErrorMessage(t("No_my_offers"));
      case "Bad request. Change document not saved":
        return setErrorMessage(t("NoDelete_my_offers_doc"));
      case "Bad request. No delete my offers":
        return setErrorMessage(t("NoDelete_my_offers"));
      case "Bad request. No added quantity to my offer":
        return setErrorMessage(t("NoAddQuantity_my_offers"));
      case "Bad request. No data for the selected object in the table ShopsSpot":
        return setErrorMessage(t("No_ShopsSpot"));
      case "Bad request. No data for the selected object in the table AreasSpot":
        return setErrorMessage(t("No_AreasSpot"));
      case "Bad request. No objects in the table ShopsSpot for the selected shop":
        return setErrorMessage(t("No_ShopsSpot_List"));
      case "Bad request. Photo not updated":
        return setErrorMessage(t("No_photo_updated"));
      case "Bad request. No objects in the table Shops for the selected shop":
        return setErrorMessage(t("No_shop"));
      case "Bad request.No added new spot":
        return setErrorMessage(t("No_added_spot"));
      case "Bad request. No updata selected object in the table ShopsSpot":
        return setErrorMessage(t("No_updata_spot"));
      case "Bad request. No get new spot list":
        return setErrorMessage(t("No_updata_spot_getList"));
      case "Bad request. No update pick-up in Spot":
        return setErrorMessage(t("No_updata_spot_pickUp"));
      case "Bad request. No object in table MyProducts":
        return setErrorMessage(t("No_obj_MyProducts"));
      case "Bad request. No uploaded my image in table MyProductsPhotos":
        return setErrorMessage(t("No_uploaded_image"));
      case "Bad request. No my photo list":
        return setErrorMessage(t("No_get_image"));
      case "Bad request. My photo product not delete":
        return setErrorMessage(t("No_delete_my_image"));
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
