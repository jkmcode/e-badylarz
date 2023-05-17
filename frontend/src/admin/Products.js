import React, { useState, useEffect } from "react";
import RadioButtons from "./RadioButtons";
import TableComponent from "./TableComponent";
import DotsLoader from "../component/DotsLoader";
import InfoAlertComponent from "../component/InfoAlertComponent";
import SelectOption from "./SelectOption";
import SearchFilter from "./SearchFilter";
import language from "../language";
import useResponsive from "../component/useResponsive";
import noImage from "../images/noImage.png";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddDescription from "./AddDescription";
import InfoComponent from "../component/infoComponent";
import Divider from "./Divider";
import { Icon } from "@iconify/react";
import { getProductCat, getSubproductCat, selectedCat } from "../actions/productActions";
import { getListOfData, unOrActiveList } from "../actions/adminActions";
import {
  ONE,
  LIST_OF_PRODUCTS,
  EMPTY_LIST,
  UNACTIVE,
  ACTIVE,
} from "../constants/environmentConstans";
import {
  PRODUCTS,
  GET_LIST_OF_DATA_DELETE,
  SET_FLAG_ADD_FALSE,
  SET_FLAG_DESC_FALSE,
  SET_FLAG_DESC_TRUE,
  PRODUCT_DESCRIPTION,
  SET_FLAG_INFO_FALSE,
  SET_FLAG_INFO_TRUE
} from "../constants/adminConstans";
import {
  GET_PRODUCT_CAT_LIST_DELETE,
  GET_PRODUCT_SUBCAT_LIST_DELETE,
  SEARCH_SELECTED_DELETE
} from "../constants/productConstans"
import {
  tableCellNoBorderRight,
  productsStyleHeader,
  activeBadge,
  inactiveBadge,
  btnEdit,
  btnUnactive,
  btnActive,
  btnInfo,
  btnDescription
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
  const [testArr, setTestArr] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedLgn, setSelectedLng] = useState("0");
  const [switcher, setSwitcher] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState(0)
  const [selectedProductInfo, setSelectedProductInfo] = useState(0)
  const [selectedProductName, setSelectedProductName] = useState("")
  const [selectedProductCategory, setSelectedProductCategory] = useState(0)
  const [selectedProductCategoryList, setSelectedProductCategoryList] = useState([])
  const [selectedProductSubCategory, setSelectedProductSubCategory] = useState(0)
  const [selectedProductSubCategoryList, setSelectedProductSubCategoryList] = useState([])
  const [newProductList, setNewProductList] = useState([])
  const [emptyValueError, setEmptyValueError] = useState(false);

  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dflag = useSelector((state) => state.flag);
  const { descFlag, infoFlag } = dflag;

  const searchFlag = useSelector((state) => state.searchProduct);
  const { flagLng, flagCategory, flagSubcategory, selected2 } = searchFlag;

  // console.log("Wybory--->>", selected2)

  const productCatListRedux = useSelector((state) => state.productCatList);
  const {
    loading: loadingProductCat,
    productCatList,
    error: errorproductCatList,
    success: successproductCatList
  } = productCatListRedux;

  const subProductCatListRedux = useSelector((state) => state.subproductCatList);
  const {
    loading: subLoadingProductCat,
    subproductCatList,
    error: errorSubProductCatList,
    success: successSubProductCatList
  } = subProductCatListRedux;

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

  const clearHandler = () => {
    dispatch({ type: SEARCH_SELECTED_DELETE });
    setSelectedProductCategory(0)
    setSelectedProductCategoryList([])
    setSelectedProductSubCategoryList([])
    setNewProductList(result)
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
  const descriptionHandler = (i) => {
    setSelectedProductID(i.id)
    setSelectedProductName(i.name)
    dispatch({ type: SET_FLAG_DESC_TRUE });
  }
  const infoHandler = (i) => {
    setSelectedProductInfo(i)
    dispatch({ type: SET_FLAG_INFO_TRUE });
  }

  const closeInfoHandler = () => {
    dispatch({ type: SET_FLAG_INFO_FALSE });
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
  };

  const selectLngHandler = (option) => {

    dispatch(selectedCat({
      kind: "lang",
      lng: option,
      lng_name: language.filter((item) =>
        item.code === option)[0].name,
      category: 0,
      subcategory: 0
    }));
    setSelectedProductCategoryList([])
    setSelectedProductSubCategoryList([])
    setEmptyValueError(false);
  };

  const selectCategoryHandler = (option) => {

    dispatch(selectedCat({
      kind: "Category",
      lng: selected2.lng,
      lng_name: selected2.lng_name,
      category: option,
      category_name: selectedProductCategoryList.filter((item) =>
        Number(item.id) === Number(option))[0].name,
      subcategory: 0,
      category_list: selectedProductCategoryList,
    }));
    setSelectedProductSubCategoryList([])
    setEmptyValueError(false);
  };

  const selectSubCategoryHandler = (option) => {
    dispatch(selectedCat({
      kind: "Subcategory",
      lng: selected2.lng,
      lng_name: selected2.lng_name,
      category: selected2.category,
      category_name: selected2.category_name,
      subcategory: option,
      subcategory_name: flagSubcategory ? selected2.subcategory_list.filter((item) =>
        Number(item.id === Number(option)))[0].name
        : selectedProductSubCategoryList.filter((item) =>
          Number(item.id) === Number(option))[0].name,
      subcategory_list: selectedProductSubCategoryList,
    }));
    if (flagSubcategory) {
      setSelectedProductSubCategoryList(selected2.subcategory_list)
    }
    setEmptyValueError(false);
  };


  //Comment
  // fetching list of product from DB
  useEffect(() => {
    if (result.length === EMPTY_LIST) {
      const typeActivity = LIST_OF_PRODUCTS;
      dispatch(getListOfData(typeActivity));
    } else {
      setCurrentProductList(result);
      setNewProductList(result)
    }
  }, [result.length]);

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
  }, [dispatch, successUnOrActive]);

  //Comment
  // The dispatch function updates product list
  // gdy zostaną wybrane łacznie lib rozdzielnie język, kategoria i podkategoria
  useEffect(() => {
    if (flagSubcategory) {
      setNewProductList(
        result.filter((product) =>
          Number(product.id_product_subtype.id)
          === Number(selected2.subcategory)))
    } else if (flagCategory) {
      setNewProductList(
        result.filter((product) =>
          Number(product.id_product_subtype.id_product_type.id)
          === Number(selected2.category)))
    } else if (flagLng) {
      setNewProductList(
        result.filter((product) =>
          product.id_product_subtype.id_product_type.language === selected2.lng))
    }
  }, [selected2, flagLng, flagCategory, flagSubcategory]);


  useEffect(() => {
    if (success) {
      // console.log("GFajnie ->", result.filter((product) => product.is_active === true))
      if (flagSubcategory) {
        setNewProductList(
          result.filter((product) =>
            Number(product.id_product_subtype.id)
            === Number(selected2.subcategory)))
      } else if (flagCategory) {
        setNewProductList(
          result.filter((product) =>
            Number(product.id_product_subtype.id_product_type.id)
            === Number(selected2.category)))
      } else if (flagLng) {
        setNewProductList(
          result.filter((product) =>
            product.id_product_subtype.id_product_type.language === selected2.lng))
      }
    } else { setNewProductList(result) }
  }, [success]);

  //Comment
  // The dispatch function updates the state with the SET_FLAG_ADD_FALSE action type.
  // It unable to run UseEffect in ProductsActivity to navigate to this component.
  useEffect(() => {
    dispatch({ type: SET_FLAG_ADD_FALSE });
    dispatch({ type: SET_FLAG_DESC_FALSE });
    dispatch({ type: GET_PRODUCT_CAT_LIST_DELETE });
  }, []);

  useEffect(() => {
    // if (selectedLgn !== "0") {
    if (flagLng & !flagCategory & !flagSubcategory) {
      dispatch(getProductCat());
    }
  }, [dispatch, selected2]);

  // console.log("??????--->>>", selectedProductCategoryList)
  // console.log("selectedProductSubCategoryList ---->", selectedProductSubCategoryList)

  useEffect(() => {
    if (successproductCatList) {
      if (flagLng) {
        setSelectedProductCategoryList(
          productCatList.filter((cat) => cat.language === selected2.lng
            & cat.is_active === true)
        );
      } else {
        setSelectedProductCategoryList(
          productCatList.filter((cat) => cat.is_active === true)
        );
      }

      dispatch({ type: GET_PRODUCT_CAT_LIST_DELETE })
    }
  }, [dispatch, successproductCatList]);

  useEffect(() => {
    if (flagLng & flagCategory & !flagSubcategory) {
      dispatch(getSubproductCat(selected2.category));
    }
  }, [dispatch, selectedLgn, selected2]);

  useEffect(() => {
    if (successSubProductCatList) {
      setSelectedProductSubCategoryList(subproductCatList.filter((subCat) =>
        subCat.is_active === true))
      dispatch({ type: GET_PRODUCT_SUBCAT_LIST_DELETE })
    }
  }, [dispatch, successSubProductCatList]);

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
      key: "category",
      label: t("Products_categorySubcategory"),
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
    name: (
      <>
        {item.photo ? (
          <img
            style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
            src={item.photo}
          />
        ) : (
          <img
            style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
            src={noImage}
          />
        )}

        {item.name}
      </>
    ),
    category: (
      <>
        {item.id_product_subtype.id_product_type.name} - {item.id_product_subtype.name}
      </>
    ),
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
              style={{ ...btnInfo, marginRight: "1rem" }}
              onClick={() => infoHandler(item)}
            >
              {t("btn_info")}
            </button>
          )}
          {radioValue === ONE && (
            <button
              style={{ ...btnDescription, marginRight: "1rem" }}
              onClick={() => descriptionHandler(item)}
            >
              {t("btn_description")}
            </button>
          )}
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
    label: t("Product_lng_label"),
    optionsList: language,
    defaultValue: flagLng ?
      selected2.lng_name
      // language.filter((item) => item.code === selected2.lng).name
      : t("Select_opions"),
    disabled: false,
  };
  const inputCategory = {
    id: "1",
    name: "Category",
    label: t("Product_category_label"),
    optionsList: selectedProductCategoryList,
    defaultValue: flagCategory ? selected2.category_name
      : t("Select_opions"),
    disabled: false,
  };
  const inputSubCategory = {
    id: "1",
    name: "subCategory",
    label: t("Product_subcategory_label"),
    optionsList: flagSubcategory ? selected2.subcategory_list
      : selectedProductSubCategoryList,
    defaultValue: flagSubcategory ? selected2.subcategory_name
      : t("Select_opions"),
    disabled: false,
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
      {infoFlag ? (
        <InfoComponent
          title={t("InfoComponent_title_product")}
          obj={selectedProductInfo}
          typeObj={PRODUCT_DESCRIPTION}
          closeInfoHandler={closeInfoHandler}
        />
      ) : null}
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
        {radioValue === ONE ?
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
          : null}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: windowWidth > 430 ? "-1rem" : "1rem",
          }}
        >
          <SelectOption
            key={inputCategory.id}
            label={inputCategory.label}
            defaultValue={inputCategory.defaultValue}
            optionsList={inputCategory.optionsList}
            emptyValueError={emptyValueError}
            disabled={inputCategory.disabled}
            onChange={selectCategoryHandler}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: windowWidth > 430 ? "-1rem" : "1rem",
          }}
        >
          <SelectOption
            key={inputSubCategory.id}
            label={inputSubCategory.label}
            defaultValue={inputSubCategory.defaultValue}
            optionsList={inputSubCategory.optionsList}
            emptyValueError={emptyValueError}
            disabled={inputSubCategory.disabled}
            onChange={selectSubCategoryHandler}
          />
        </div>
        <button
          style={{ ...btnInfo, marginRight: "1rem" }}
          onClick={() => clearHandler()}
        >
          <Icon icon="mdi:close-thick" width="32" height="32" color="red" />
          {t("btn_clear")}
        </button>
      </div>

      <SearchFilter
        onChange={changeHandler}
        listOfData={newProductList}
        radioValue={radioValue}
      />
      {descFlag ? (
        <>
          <Divider backgroundColor="gray" />
          {t("Product_description_title")}{selectedProductName}
          <AddDescription objId={selectedProductID} descType={PRODUCT_DESCRIPTION} />
          <Divider backgroundColor="gray" />
        </>
      ) : null}
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
