import React, { useState, useEffect } from "react";
import Divider from "./Divider";
import { useTranslation } from "react-i18next";
import noImage from "../images/noImage.png";
import DateComponentRange from "../component/DateComponentRange"
import { FLOAT_NUMBER } from "../constants/formValueConstans";
import FormInput from "./FormInput";
import ErrorMesageRedux from "./ErrorMesageRedux"
import InfoAlertComponentOkButton from "../component/InfoAlertComponentOkButton";
import InfoBigAlertComponent from "../component/InfoBigAlertComponent";
import { useDispatch, useSelector } from "react-redux";
import DotsLoader from "../component/DotsLoader";
import {
  addQuantityOffer
} from "../actions/productActions";
import {
  FormLayout
} from "./AdminCSS";

function AddQuantityOffer({ confirmYes1, confirmNo, context, spot }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [valuesAddQuntity, setValuesAddQuntity] = useState(0)
  const [showErrorValue, setShowErrorValue] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorValueText, setErrorValueText] = useState("");
  const [goFlag, setGoFlag] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [contextOffer, setContextOffer] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [showError, setShowError] = useState(false);

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addSuccess = useSelector((state) => state.addQuantityMyOffers);
  const { success, error, loading } = addSuccess;

  //handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isNaN(valuesAddQuntity)) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_number"))
    }
    else if (context.barrel_bulk === "szt" && valuesAddQuntity - Math.floor(valuesAddQuntity) > 0) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_amount_art"))
    }
    else {
      setGoFlag(true)
      setShowAlert(true);
    }
  }
  const onChange = (name, value) => {
    setValuesAddQuntity(value)

  };

  const closeErrorHandler = () => {
    setShowErrorValue(false)
    setErrorValueText("")
  };
  const confirmYesAdd = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNoAdd = () => {
    setShowAlert(false);
    setConfirm(false);
  };

  const closeError = () => {
    setShowError(false)
  };

  // 1.Przygotowanie potwierdzenia
  // 2. Wprowadzanie do bazy oferty
  useEffect(() => {
    if (goFlag) {
      setGoFlag(false)
      const text = t("confirmOfferAddQuantity_1") + " " + String(valuesAddQuntity) + " ["
        + String(context.barrel_bulk_short) + "] "
        + t("confirmOfferAddQuantity_2")
      setContextOffer(text)
    }

    if (confirm) {
      setConfirm(false)
      const insertData = {
        user: userInfo.id,
        offerId: context.id,
        addQuantity: valuesAddQuntity,
        spotId: spot
      }
      dispatch(addQuantityOffer(insertData))
    }
  }, [goFlag, confirm]);

  // Ustawienie flagi gdy sukces lub error
  useEffect(() => {
    if (success) {
      setShowSuccess(true)
    }
    if (error) {
      setShowError(true)
    }
  }, [success, error]);

  //List of inputs
  const inputs = [
    {
      id: "1",
      name: "quantity",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_add_quantity_label"),
      pattern: FLOAT_NUMBER,
      required: true,
    },]
  //styling
  const mainContainer = {
    position: "relative",
    backgroundColor: "whitesmoke",
    width: "80%",
    maxWidth: "650px",
    height: "450px",
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
    textAlign: "left",
    marginLeft: "3rem",
    marginRight: "1rem",
    fontWeight: "500",
    fontSize: "1.0rem",
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
    right: "5%",
  };

  const yesNo = {
    ...btn,
    backgroundImage: `linear-gradient(171deg, rgba(234, 17, 59, 1) 45%, rgba(202, 71, 130, 1) 89%)`,
    bottom: "5%",
    left: "5%",
  };
  return (
    <div style={showModalOverlay}>
      <div style={mainContainer}>
        {showErrorValue ?
          <InfoAlertComponentOkButton
            confirmYes={closeErrorHandler}
            context={errorValueText}
          /> : null}
        {showSuccess ?
          <InfoAlertComponentOkButton
            confirmYes={confirmYes1}
            context={t("Confirmation_alert_succes_addQuantity")}
            succes={true}
          /> : null}
        {showAlert ?
          <InfoBigAlertComponent
            confirmYes={confirmYesAdd}
            confirmNo={confirmNoAdd}
            context={contextOffer}
          /> : null}
        {showError ?
          <ErrorMesageRedux
            confirmYes={closeError}
            error={error}
          /> : null}
        <div style={title}>{t("AddQuantityOffer_title")}</div>
        <Divider backgroundColor="gray" />
        <div style={body}>
          {t("Myproduct_name")} :{ }
          {context.id_my_product.id_product.photo ? (
            <img
              style={{ width: "50px", marginRight: "1rem", marginLeft: "1rem", borderRadius: "10%" }}
              src={context.id_my_product.id_product.photo}
            />
          ) : (
            <img
              style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
              src={noImage}
            />
          )}
          {context.id_my_product.id_product.name}
          {t("Product_country")}
          {context.country_of_origin}
        </div>
        <div style={body}>
          <DateComponentRange
            dateFrom={context.offer_from}
            dateTo={context.offer_to}
          />
        </div>
        <div style={body}>
          {t("Quantity_curent")}
          {context.current_quantity}[{context.barrel_bulk_short}]
          {t("Quantity_start")}
          {context.quantity}[{context.barrel_bulk_short}]
        </div>
        <div style={body}>
          {t("Expiration_date")}{context.term_of_validity}
        </div>
        <Divider backgroundColor="gray" />
        {loading ?
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DotsLoader />
          </div>
          :
          < form onSubmit={handleSubmit}>
            <div style={{ marginLeft: "0rem" }}>
              <FormLayout col={3}>
                .
                {inputs.map((input, index) => {
                  if (index === 0) {
                    return (
                      <FormInput key={input.id} pattern={input.pattern} {...input} onChange={onChange} />
                    );
                  }
                })}
                .
              </FormLayout>
            </div>
            <Divider backgroundColor="gray" />
            <button type="submit" style={yesBtn} >
              {t("btn-add")}
            </button>
            <button style={yesNo} onClick={(e) => confirmNo(e)}>
              {t("btn_close")}
            </button>
          </form>
        }
      </div>
    </div>
  );
}

export default AddQuantityOffer;




