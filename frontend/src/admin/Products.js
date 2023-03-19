import React, { useState, useEffect } from "react";
import RadioButtons from "./RadioButtons";
import TableComponent from "./TableComponent";
import DotsLoader from "../component/DotsLoader";
import InfoAlertComponent from "../component/InfoAlertComponent";
import SelectOption from "./SelectOption";
import SearchFilter from "./SearchFilter";
import language from "../language";
import useResponsive from "../component/useResponsive";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getListOfData, unOrActiveList } from "../actions/adminActions";
import {
  ONE,
  LIST_OF_PRODUCTS,
  EMPTY_LIST,
  UNACTIVE,
  ACTIVE,
} from "../constants/environmentConstans";
import { PRODUCTS, GET_LIST_OF_DATA_DELETE } from "../constants/adminConstans";
import {
  tableCellNoBorderRight,
  productsStyleHeader,
  activeBadge,
  inactiveBadge,
  btnEdit,
  btnUnactive,
  btnActive,
} from "./AdminCSS";

function Products() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { windowWidth } = useResponsive();

  //variables
  const [radioValue, setRadioValue] = useState(ONE);
  const [catObj, setCatObj] = useState({});
  const [updateStatus, setUpdateStatus] = useState("");
  const [currentProductList, setCurrentProductList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedLgn, setSelectedLng] = useState(0);
  const [switcher, setSwitcher] = useState(false);
  const [emptyValueError, setEmptyValueError] = useState(false);

  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productListRedux = useSelector((state) => state.getListOfData);
  const {
    loading: loadingGetListOfData,
    error,
    success,
    result,
  } = productListRedux;

  const unOrActive = useSelector((state) => state.unOrActiveDescription);
  const {
    loading: loadingUnOrActive,
    success: successUnOrActive,
    error: errorUnOrActive,
  } = unOrActive;

  //RadioButtons functions
  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
  };

  const unActiveHandler = (id) => {
    setCatObj(id);
    setShowAlert(true);
    setUpdateStatus(UNACTIVE);
  };

  const activeHandler = (id) => {
    setCatObj(id);
    setShowAlert(true);
    setUpdateStatus(ACTIVE);
  };

  const editHandler = (id) => {
    navigate(`${id}/edit`);
  };

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
  };

  const changeHandler = (str) => {
    setCurrentProductList(str);
    console.log("str", str);
  };

  // useEffect(() => {
  //   if (result.length !== 0) {
  //     console.log("spełniam warunek");

  //   }
  // }, [result.length]);

  //Comment
  // fetching list of product from DB
  useEffect(() => {
    if (result.length === EMPTY_LIST) {
      const typeActivity = LIST_OF_PRODUCTS;
      dispatch(getListOfData(typeActivity));
    } else {
      setCurrentProductList(result);
    }
  }, [result.length]);

  // Comment
  // This useEffect hook updates the current product list based on the selected radio button value.
  // If the result array is not empty, the hook filters and sets the list to display
  // either active or inactive products based on the selected radio button value. If the result array is empty,
  // the hook sets the current product list to the empty currentProductList array.
  // This helps to avoid errors and ensures that the products list is properly displayed to the user.
  // The hook is triggered by changes to both the radioValue and subproductCatList state variables.
  useEffect(() => {
    if (result.length !== EMPTY_LIST) {
      if (radioValue === ONE) {
        setCurrentProductList(
          result.filter((subcat) => subcat.is_active === true)
        );
      } else {
        setCurrentProductList(
          result.filter((subcat) => subcat.is_active === false)
        );
      }
    } else {
      setCurrentProductList(result);
    }
  }, [radioValue, result.length]);

  //Comment
  // dispatch function for active and unactive product
  useEffect(() => {
    if (confirm && updateStatus === UNACTIVE) {
      dispatch(
        unOrActiveList({
          Id: catObj,
          active: false,
          userId: userInfo.id,
          objType: PRODUCTS,
          kind: "",
        })
      );
    }

    if (confirm && updateStatus === ACTIVE) {
      dispatch(
        unOrActiveList({
          Id: catObj,
          active: true,
          userId: userInfo.id,
          objType: PRODUCTS,
          kind: "",
        })
      );
    }
    setConfirm(false);
  }, [dispatch, confirm, updateStatus]);

  //Comment
  //When the successUnOrActive value is truthy,
  //the component will dispatch an action of type GET_LIST_OF_DATA_DELETE (clean a list of products - result)
  //it triggers other useEffect which fetch the newest result (the newest list of products).
  useEffect(() => {
    if (successUnOrActive) {
      dispatch({ type: GET_LIST_OF_DATA_DELETE });
    }
  }, [successUnOrActive]);

  const mainTableContainer = {
    overflowY: "auto",
    maxHeight: "50vh",
    marginTop: "1rem",
  };

  const tableStyle = {
    width: "100%",
    marginTop: "1rem",
  };

  const tableSubcatProductStyle = {
    ...tableStyle,
    color: "black",
    backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(227, 227, 232, 1) 100%)`,
  };

  const tableConatctcolumns = [
    {
      key: "name",
      label: t("Products_name"),
      styleTableCell: tableCellNoBorderRight,
      styleHeader: productsStyleHeader,
    },
    {
      key: "status",
      label: t("Products_status"),
      styleTableCell: tableCellNoBorderRight,
      styleHeader: productsStyleHeader,
    },
  ];

  const dataSubcategoryTable = currentProductList.map((item) => ({
    id: item.id,
    name: item.name,
    status: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <>
          {radioValue === ONE ? (
            <span style={{ ...activeBadge, color: "black" }}>
              {t("status_active")}
            </span>
          ) : (
            <span style={inactiveBadge}>{t("status_inactive")}</span>
          )}
        </>

        <div>
          {radioValue === ONE && (
            <button
              style={{ ...btnEdit, marginRight: "1rem" }}
              onClick={() => editHandler(item.id)}
            >
              {t("btn_edit")}
            </button>
          )}
          {radioValue === ONE ? (
            <button
              style={{ ...btnUnactive }}
              onClick={() => unActiveHandler(item.id)}
            >
              {t("btn_unactive")}
            </button>
          ) : (
            <button style={btnActive} onClick={() => activeHandler(item.id)}>
              {t("btn_active")}
            </button>
          )}
        </div>
      </div>
    ),
  }));

  // input
  const input = {
    id: "1",
    name: "language",
    label: "language",
    optionsList: language,
    defaultValue: "Select an option",
    disabled: false,
  };

  const selectLngHandler = (option) => {
    setSwitcher(true);
    setSelectedLng(option);
    setEmptyValueError(false);
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
      {showAlert && updateStatus === UNACTIVE && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("Confirmation_alert_unactive_product")}
        />
      )}
      {showAlert && updateStatus === ACTIVE && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("Confirmation_alert_active_product")}
        />
      )}
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
        <Link
          to="add"
          style={{
            display: "flex",
            alignItems: "center",
            border: "none",
            borderRadius: "0.2rem",
            backgroundColor: "#26A65B",
            padding: "0.5rem 1.5rem",
            color: "white",
          }}
        >
          {t("Products_add_product_btn")}
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <div>
          <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: windowWidth > 430 ? "-1rem" : "1rem",
          }}
        >
          <SelectOption
            key={input.id}
            label={input.label}
            defaultValue={input.defaultValue}
            optionsList={input.optionsList}
            emptyValueError={emptyValueError}
            disabled={input.disabled}
            onChange={selectLngHandler}
          />
        </div>
      </div>
      <SearchFilter
        onChange={changeHandler}
        listOfData={result}
        radioValue={radioValue}
      />
      {loadingGetListOfData ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DotsLoader />
        </div>
      ) : (
        <TableComponent
          data={dataSubcategoryTable}
          columns={tableConatctcolumns}
          tableStyle={tableSubcatProductStyle}
          mainTableContainer={mainTableContainer}
        />
      )}
    </div>
  );
}

export default Products;
