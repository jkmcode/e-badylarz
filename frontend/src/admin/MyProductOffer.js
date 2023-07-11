import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import TableComponent from "./TableComponent";
import DotsLoader from "../component/DotsLoader";
import InfoAlertComponentOkButton from "../component/InfoAlertComponentOkButton";
import InfoBigAlertComponent from "../component/InfoBigAlertComponent"
import noImage from "../images/noImage.png";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { THREE } from "../constants/environmentConstans";
import { Icon } from "@iconify/react";
import Divider from "./Divider";
import SelectOption from "./SelectOption";
import InfoComponent from "../component/infoComponent";
import UploadImage from "../component/UploadImage";
import { getMyproduct } from "../actions/productActions"
import {
  useBarrelBulk,
  useDateFrom,
  useDateTo,
  useKg,
  useArt,
  useLiter,
  useCurrency,
  useCountry
} from "../Data/OfferSearchList";
import {
  addOffer
} from "../actions/productActions";

import {
  SET_FLAG_INFO_TRUE,
  SET_FLAG_INFO_FALSE,
} from "../constants/adminConstans";
import {
  ADD_IMAGE_MY_DELETE,
  UPDATE_IMAGE_MY_DELETE,
  DELETE_MY_IMAGE_DELETE,
  GET_MY_IMAGE_DELETE
} from "../constants/productConstans"
import {
  tableCellNoBorderRight,
  productsStyleHeader,
  FormLayout,
  btnInfo,
  addBtn
} from "./AdminCSS";
import {
  FLOAT_NUMBER,
  NUMBERS_AND_NATIONAL_LETTERS,
  NUMBERS_AND_NATIONAL_LETTERS_50
} from "../constants/formValueConstans";

function MyProductPhotos() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();

  const shopId = params.idShop;
  const spotId = params.idSpot;
  const nameProduct = params.productName
  const IdMyProduct = params.idMyProd


  const barrelBulk = useBarrelBulk();
  const dateFromList = useDateFrom()
  const dateToList = useDateTo()
  const kgList = useKg()
  const artList = useArt()
  const literList = useLiter()
  const currencyList = useCurrency()
  const counrtyList = useCountry()

  //variables

  const [contextOffer, setContextOffer] = useState("");
  const [showErrorValue, setShowErrorValue] = useState(false);
  const [errorValueText, setErrorValueText] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dateFlag, setdateFlag] = useState(false);
  const [goFlag, setGoFlag] = useState(false);
  const [incompleteOffer, setIncompleteOffer] = useState(false);
  const [packingList, setPackingList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [emptyDateFromValueError, setEmptyDateFromValueError] = useState(false);
  const [emptyDateToValueError, setEmptyDateToValueError] = useState(false);
  const [emptyKgValueError, setEmptyKgValueError] = useState(false);
  const [emptyCurrencyValueError, setEmptyCurrencyValueError] = useState(false);
  const [emptyKgValueError2, setEmptyKgValueError2] = useState(false);
  const [emptyCurrencyValueError2, setEmptyCurrencyValueError2] = useState(false);
  const [emptyKgValueError3, setEmptyKgValueError3] = useState(false);
  const [emptyCurrencyValueError3, setEmptyCurrencyValueError3] = useState(false);
  const [emptyCountryValueError, setEmptyCountryValueError] = useState(false);

  const [values, setValues] = useState({
    barrelBulk: "",
    quantity: "",
    dateFrom: "",
    dateTo: "",
    country: "",
    packing_1: "",
    currency_1: "",
    packing_2: "",
    currency_2: "",
    packing_3: "",
    currency_3: "",
    price_1: "0",
    price_2: "0",
    price_3: "0"
  });

  const [dateDelta, setDateDelta] = useState({
    from: 0,
    to: 0,
  });

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const infoFlag12 = useSelector((state) => state.flag);
  const { infoFlag } = infoFlag12;

  const myproductsRedux = useSelector((state) => state.getMyProducts);
  const {
    result: myProductsList,
    success: successMyProductList,
    loading: myProductListLoading,
    error: myProductListError,
  } = myproductsRedux;


  // Hendlers

  const handleSubmit = (event) => {
    event.preventDefault();
    let bb_value = 0
    const quant = parseFloat(values.quantity)

    if (values.barrelBulk === "1" && values.packing_1 !== "") {
      if (kgList.filter((i) => i.id === values.packing_1)[0].value > bb_value) {
        bb_value = kgList.filter((i) => i.id === values.packing_1)[0].value
      }
    }
    if (values.barrelBulk === "1" && values.packing_2 !== "") {
      if (kgList.filter((i) => i.id === values.packing_2)[0].value > bb_value) {
        bb_value = kgList.filter((i) => i.id === values.packing_2)[0].value
      }
    }
    if (values.barrelBulk === "1" && values.packing_3 !== "") {
      if (kgList.filter((i) => i.id === values.packing_3)[0].value > bb_value) {
        bb_value = kgList.filter((i) => i.id === values.packing_3)[0].value
      }
    }

    if (values.barrelBulk === "2" && values.packing_1 !== "") {
      if (artList.filter((i) => i.id === values.packing_1)[0].value > bb_value) {
        bb_value = artList.filter((i) => i.id === values.packing_1)[0].value
      }
    }
    if (values.barrelBulk === "2" && values.packing_2 !== "") {
      if (artList.filter((i) => i.id === values.packing_2)[0].value > bb_value) {
        bb_value = artList.filter((i) => i.id === values.packing_2)[0].value
      }
    }
    if (values.barrelBulk === "2" && values.packing_3 !== "") {
      if (artList.filter((i) => i.id === values.packing_3)[0].value > bb_value) {
        bb_value = artList.filter((i) => i.id === values.packing_3)[0].value
      }
    }

    if (values.barrelBulk === "3" && values.packing_1 !== "") {
      if (literList.filter((i) => i.id === values.packing_1)[0].value > bb_value) {
        bb_value = literList.filter((i) => i.id === values.packing_1)[0].value
      }
    }
    if (values.barrelBulk === "3" && values.packing_2 !== "") {
      if (literList.filter((i) => i.id === values.packing_2)[0].value > bb_value) {
        bb_value = literList.filter((i) => i.id === values.packing_2)[0].value
      }
    }
    if (values.barrelBulk === "3" && values.packing_3 !== "") {
      if (literList.filter((i) => i.id === values.packing_3)[0].value > bb_value) {
        bb_value = literList.filter((i) => i.id === values.packing_3)[0].value
      }
    }

    if (values.barrelBulk === "") {
      setEmptyValueError(true)
      setIncompleteOffer(true)
    }
    else if (values.dateFrom === "") {
      setEmptyDateFromValueError(true)
      setIncompleteOffer(true)
    }
    else if (values.dateTo === "") {
      setEmptyDateToValueError(true)
      setIncompleteOffer(true)
    }
    else if (values.country === "") {
      setEmptyCountryValueError(true)
      setIncompleteOffer(true)
    }
    else if (values.packing_1 === "") {
      setEmptyKgValueError(true)
      setIncompleteOffer(true)
    }
    else if (values.currency_1 === "") {
      setEmptyCurrencyValueError(true)
      setIncompleteOffer(true)
    }
    else if (values.packing_2 === "" && values.price_2 !== "0") {
      setEmptyKgValueError2(true)
      setIncompleteOffer(true)
    }
    else if (values.currency_2 === "" && values.price_2 !== "0") {
      setEmptyCurrencyValueError2(true)
      setIncompleteOffer(true)
    }
    else if (values.packing_3 === "" && values.price_3 !== "0") {
      setEmptyKgValueError3(true)
      setIncompleteOffer(true)
    }
    else if (values.currency_3 === "" && values.price_3 !== "0") {
      setEmptyCurrencyValueError3(true)
      setIncompleteOffer(true)
    }
    else if (parseFloat(values.quantity) < bb_value) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_amount"))
    }
    else if (values.barrelBulk === "2" && quant - Math.floor(quant) > 0) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_amount_art"))
    }
    else if (values.priceSale_1
      && parseFloat(values.price_1) < parseFloat(values.priceSale_1)) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_salePrice_1"))
    }
    else if (values.priceSale_1 && !values.price30Day_1) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_Price30Day_1"))
    }
    else if (values.priceSale_2 && values.price_2
      && parseFloat(values.price_2) < parseFloat(values.priceSale_2)) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_salePrice_2"))
    }
    else if (values.priceSale_2 && values.price_2 && !values.price30Day_2) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_Price30Day_2"))
    }
    else if (values.priceSale_3 && values.price_3
      && parseFloat(values.price_3) < parseFloat(values.priceSale_3)) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_salePrice_3"))
    }
    else if (values.priceSale_3 && values.price_3 && !values.price30Day_3) {
      setShowErrorValue(true)
      setErrorValueText(t("Confirmation_alert_wrong_Price30Day_3"))
    }
    else {
      setGoFlag(true)
      setShowAlert(true);
    }
  }

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const closeInfoHandler = () => {
    setIncompleteOffer(false)
  };

  const closeErrorHandler = () => {
    setShowErrorValue(false)
    setErrorValueText("")
  };

  const selectBarrelBulkHandler = (option) => {
    setValues({ ...values, barrelBulk: option });
    setEmptyValueError(false);
    if (option === "1") { setPackingList(kgList) }
    if (option === "2") { setPackingList(artList) }
    if (option === "3") { setPackingList(literList) }
  };

  const selectKgHandler = (option) => {
    setValues({ ...values, packing_1: option });
    setEmptyKgValueError(false);
  };

  const selectKgHandler2 = (option) => {
    setValues({ ...values, packing_2: option });
    setEmptyKgValueError2(false);
  };

  const selectKgHandler3 = (option) => {
    setValues({ ...values, packing_3: option });
    setEmptyKgValueError3(false);
  };

  const selectCurrencyHandler = (option) => {
    setValues({ ...values, currency_1: option });
    setEmptyCurrencyValueError(false);
  }

  const selectCurrencyHandler2 = (option) => {
    setValues({ ...values, currency_2: option });
    setEmptyCurrencyValueError2(false);
  }

  const selectCurrencyHandler3 = (option) => {
    setValues({ ...values, currency_3: option });
    setEmptyCurrencyValueError3(false);
  }

  const selectDateToHandler = (option) => {
    setValues({ ...values, dateTo: option });
    setDateDelta({
      ...dateDelta,
      to: dateToList.filter((i) => i.id === option)[0].delta
    })
    setEmptyDateToValueError(false);
    setdateFlag(!dateFlag)
  };

  const selectCountryHandler = (option) => {
    setValues({ ...values, country: option });

    setEmptyCountryValueError(false);
    // setdateFlag(!dateFlag)
  };

  const selectDateFromHandler = (option) => {
    setDateDelta({
      ...dateDelta,
      from: dateFromList.filter((i) => i.id === option)[0].delta
    })
    setValues({ ...values, dateFrom: option });
    setEmptyDateFromValueError(false);
    setdateFlag(!dateFlag)
  };

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
  };


  //Comment
  useEffect(() => {
    // dispatch(
    //   getImageMyProduct(IdMyProduct)
    // );
  }, []);

  // 1.Przygotowanie potwierdzenia
  // 2. Wprowadzanie do bazy oferty
  useEffect(() => {
    if (goFlag) {
      setGoFlag(false)
      const text1 = t("confirmOffer_1") + " " + String(values.quantity) + " ["
        + String(barrelBulk.filter((i) => i.id === values.barrelBulk)[0].short) + "] "
        + t("confirmOffer_2") + nameProduct + ", "
      let text2 = ""
      if (values.price_3 !== "0") {
        text2 = t("confirmOffer_3")
      }
      else if (values.price_2 !== "0") {
        text2 = t("confirmOffer_4")
      }
      else {
        text2 = t("confirmOffer_5")
      }
      const text3 = ", " + t("confirmOffer_6") + " " + startDate
        + " " + t("confirmOffer_8") + " " + t("confirmOffer_7") + " "
        + endDate + " " + t("confirmOffer_8")
      const text = text1 + " " + text2 + text3
      setContextOffer(text)
    }

    if (confirm) {
      setConfirm(false)
      const insertData = {
        user: userInfo.id,
        myproduct: IdMyProduct,
        bb: barrelBulk.filter((i) => i.id === values.barrelBulk)[0].bb,
        bb_short: barrelBulk.filter((i) => i.id === values.barrelBulk)[0].short,
        bb_long: barrelBulk.filter((i) => i.id === values.barrelBulk)[0].name,
        quantity: values.quantity,
        deltaDateFrom: String(dateDelta.from),
        deltaDateTo: String(dateDelta.to),
        termOfValidity: values.termOfValidity ? values.termOfValidity : "",
        country: counrtyList.filter((i) => i.id === values.country)[0].code,

        packing_1: String(values.barrelBulk === "1"
          ? kgList.filter((i) => i.id === values.packing_1)[0].value
          : values.barrelBulk === "2"
            ? artList.filter((i) => i.id === values.packing_1)[0].value
            : literList.filter((i) => i.id === values.packing_1)[0].value),
        price_1: values.price_1,
        priceSale_1: values.priceSale_1 ? values.priceSale_1 : "0",
        price30Day_1: values.price30Day_1 ? values.price30Day_1 : "0",
        currency_1: currencyList.filter((i) => i.id === values.currency_1)[0].name,

        packing_2: values.price_2 !== "0" ? String(values.barrelBulk === "1"
          ? kgList.filter((i) => i.id === values.packing_2)[0].value
          : values.barrelBulk === "2"
            ? artList.filter((i) => i.id === values.packing_2)[0].value
            : literList.filter((i) => i.id === values.packing_2)[0].value)
          : "0",
        price_2: values.price_2 ? values.price_2 : "0",
        priceSale_2: values.priceSale_2 ? values.priceSale_2 : "0",
        price30Day_2: values.price30Day_2 ? values.price30Day_2 : "0",
        currency_2: values.price_2 !== "0"
          ? currencyList.filter((i) => i.id === values.currency_2)[0].name : "",

        packing_3: values.price_3 !== "0" ? String(values.barrelBulk === "1"
          ? kgList.filter((i) => i.id === values.packing_3)[0].value
          : values.barrelBulk === "2"
            ? artList.filter((i) => i.id === values.packing_3)[0].value
            : literList.filter((i) => i.id === values.packing_3)[0].value)
          : "0",
        price_3: values.price_3 ? values.price_3 : "0",
        priceSale_3: values.priceSale_3 ? values.priceSale_3 : "0",
        price30Day_3: values.price30Day_3 ? values.price30Day_3 : "0",
        currency_3: values.price_3 !== "0"
          ? currencyList.filter((i) => i.id === values.currency_3)[0].name : ""
      }
      // console.log("handleSubmit-->", values)
      // console.log("insertData-->", insertData)
      dispatch(addOffer(insertData))
    }
  }, [goFlag, confirm]);

  // 1.jeśli nie ma listy moich produktów to ją pobierz
  useEffect(() => {
    if (!successMyProductList) {
      dispatch(getMyproduct(spotId))
    }
  }, [successMyProductList]);

  // A. wylicza datę poczatku i końca oferty
  useEffect(() => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + (dateDelta.to + dateDelta.from));
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const endDateString = `${day}.${month}.${year}`;
    setEndDate(endDateString)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() + (dateDelta.from));
    const startDay = String(startDate.getDate()).padStart(2, '0');
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
    const startYear = startDate.getFullYear();
    const startDateString = `${startDay}.${startMonth}.${startYear}`;
    setStartDate(startDateString)

  }, [dateFlag]);


  //List of inputs
  const inputs = [
    // podstawa
    {
      id: "1",
      name: "BarrelBulk",
      label: t("Offer_label_BarrelBulk"),
      optionsList: barrelBulk,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
    {
      id: "2",
      name: "quantity",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_quantity_label"),
      pattern: FLOAT_NUMBER,
      required: true,
    },
    {
      id: "3",
      name: "dateFrom",
      label: t("Offer_label_Date_from"),
      optionsList: dateFromList,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
    {
      id: "4",
      name: "dateTo",
      label: t("Offer_label_Date_to"),
      optionsList: dateToList,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
    {
      id: "5",
      name: "termOfValidity",
      type: "text",
      placeholder: t("Offer_termOfValidity_placeholder"),
      errorMessage: t("Offer_termOfValidity_error_message"),
      label: t("Offer_termOfValidity_label"),
      pattern: NUMBERS_AND_NATIONAL_LETTERS_50,
      required: false,
    },
    // Pierwsza cenówka
    {
      id: "6",
      name: "Packaging_1",
      label: t("Offer_label_Packing"),
      optionsList: packingList,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
    {
      id: "7",
      name: "price_1",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_price_label"),
      pattern: FLOAT_NUMBER,
      required: true,
    },
    {
      id: "8",
      name: "priceSale_1",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_salePrice_label"),
      pattern: FLOAT_NUMBER,
      required: false,
    },
    {
      id: "9",
      name: "price30Day_1",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_price30Day_label"),
      pattern: FLOAT_NUMBER,
      required: false,
    },
    {
      id: "10",
      name: "Currency_1",
      label: t("Offer_label_Currency"),
      optionsList: currencyList,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
    // Druga cenówka
    {
      id: "11",
      name: "Packaging_2",
      label: t("Offer_label_Packing"),
      optionsList: packingList,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
    {
      id: "12",
      name: "price_2",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_price_label"),
      pattern: FLOAT_NUMBER,
      required: false,
    },
    {
      id: "13",
      name: "priceSale_2",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_salePrice_label"),
      pattern: FLOAT_NUMBER,
      required: false,
    },
    {
      id: "14",
      name: "price30Day_2",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_price30Day_label"),
      pattern: FLOAT_NUMBER,
      required: false,
    },
    {
      id: "15",
      name: "Currency_2",
      label: t("Offer_label_Currency"),
      optionsList: currencyList,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
    // Trzecia cenówka 
    {
      id: "16",
      name: "Packaging_3",
      label: t("Offer_label_Packing"),
      optionsList: packingList,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
    {
      id: "17",
      name: "price_3",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_price_label"),
      pattern: FLOAT_NUMBER,
      required: false,
    },
    {
      id: "18",
      name: "priceSale_3",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_salePrice_label"),
      pattern: FLOAT_NUMBER,
      required: false,
    },
    {
      id: "19",
      name: "price30Day_3",
      type: "text",
      placeholder: t("Offer_quantity_placeholder"),
      errorMessage: t("Offer_quantity_error_message"),
      label: t("Offer_price30Day_label"),
      pattern: FLOAT_NUMBER,
      required: false,
    },
    {
      id: "20",
      name: "Currency_3",
      label: t("Offer_label_Currency"),
      optionsList: currencyList,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
    // dodatkowo dane podstawowe - kraj pochodzenia
    {
      id: "21",
      name: "country",
      label: t("Offer_label_country"),
      optionsList: counrtyList,
      defaultValue: t("ShopsSpot_select_placeholder"),
      disabled: false,
    },
  ];


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
      <Link
        to={{ pathname: `/dashboard/shops/spot/${shopId}/edit/${spotId}` }}
        style={{ color: "black" }}
      >
        <Icon icon="ion:arrow-back" />
        {t("btn-return")}
      </Link>
      {showErrorValue ?
        <InfoAlertComponentOkButton
          confirmYes={closeErrorHandler}
          context={errorValueText}
        /> : null}
      {incompleteOffer ?
        <InfoAlertComponentOkButton
          confirmYes={closeInfoHandler}
          context={t("Confirmation_alert_blank_form")}
        /> : null}
      {showAlert ?
        <InfoBigAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={contextOffer}
        /> : null}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            fontSize: "calc(1.1rem + 0.3vw)",
            fontWeight: "500",
            margin: "0.4rem",
          }}
        >
          {t("MyProductOffer_title")}

          {successMyProductList ? (
            <img
              style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
              src={myProductsList.filter((i) => IdMyProduct == i.id)[0].id_product.photo}
            />
          ) : (
            <img
              style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
              src={noImage}
            />
          )}
          {nameProduct}
        </div>
        {t("MyProduct_end_Offe")}  {endDate}
      </div>
      <Divider backgroundColor="gray" />
      < form onSubmit={handleSubmit}>

        <FormLayout col={6}>
          {inputs.map((input, index) => {
            if (index === 0) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyValueError}
                  onChange={selectBarrelBulkHandler}
                  {...input}
                />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index === 1) {
              return (
                <FormInput key={input.id} pattern={input.pattern} {...input} onChange={onChange} />
              );
            }
          })}

          {inputs.map((input, index) => {
            if (index === 2) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyDateFromValueError}
                  onChange={selectDateFromHandler}
                  {...input}
                />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index === 3) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyDateToValueError}
                  onChange={selectDateToHandler}
                  {...input}
                />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index === 4) {
              return (
                <FormInput key={input.id} {...input} onChange={onChange} />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index === 20) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyCountryValueError}
                  onChange={selectCountryHandler}
                  {...input}
                />
              );
            }
          })}
        </FormLayout>
        <Divider backgroundColor="grey" />

        {/* Pierwsza cenówka */}
        <FormLayout col={6}>
          <div style={{ fontWeight: 500 }}>
            {t("Offer_title_packaging_1")}
          </div>
          {inputs.map((input, index) => {
            if (index === 5) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyKgValueError}
                  onChange={selectKgHandler}
                  {...input}
                />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index > 5 && index < 9) {
              return (
                <FormInput key={input.id} {...input} onChange={onChange} />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index === 9) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyCurrencyValueError}
                  onChange={selectCurrencyHandler}
                  {...input}
                />
              );
            }
          })}
        </FormLayout>

        {/* Druga cenówka */}
        <FormLayout col={6}>
          <div style={{ fontWeight: 500 }}>
            {t("Offer_title_packaging_2")}
          </div>
          {inputs.map((input, index) => {
            if (index === 10) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyKgValueError2}
                  onChange={selectKgHandler2}
                  {...input}
                />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index > 10 && index < 14) {
              return (
                <FormInput key={input.id} {...input} onChange={onChange} />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index === 14) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyCurrencyValueError2}
                  onChange={selectCurrencyHandler2}
                  {...input}
                />
              );
            }
          })}
        </FormLayout>

        {/* Trzecia cenówka */}
        <FormLayout col={6}>
          <div style={{ fontWeight: 500 }}>
            {t("Offer_title_packaging_3")}
          </div>
          {inputs.map((input, index) => {
            if (index === 15) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyKgValueError3}
                  onChange={selectKgHandler3}
                  {...input}
                />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index > 15 && index < 19) {
              return (
                <FormInput key={input.id} {...input} onChange={onChange} />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index === 19) {
              return (
                <SelectOption
                  key={input.optionsList.id}
                  optionsList={input.optionsList.name}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyCurrencyValueError3}
                  onChange={selectCurrencyHandler3}
                  {...input}
                />
              );
            }
          })}
        </FormLayout>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" style={{ ...addBtn, marginTop: "1rem" }}>
            {t("btn-add")}
          </button>

        </div>
      </form>
    </div>
  );
}

export default MyProductPhotos;