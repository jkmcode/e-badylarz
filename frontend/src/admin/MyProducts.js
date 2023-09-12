import React, { useState, useEffect } from "react";
import ErrorMesageRedux from "./ErrorMesageRedux"
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
import { Link, useNavigate, useParams } from "react-router-dom";
import AddDescription from "./AddDescription";
import InfoComponent from "../component/infoComponent";
import Divider from "./Divider";
import { Icon } from "@iconify/react";
import {
  getProductCat,
  getSubproductCat,
  selectedCat,
  addMyproduct,
  getMyproduct
} from "../actions/productActions";
import { getListOfData } from "../actions/adminActions";
import {
  ONE,
  LIST_OF_MY_PRODUCTS,
} from "../constants/environmentConstans";
import {
  SET_FLAG_ADD_FALSE,
  SET_FLAG_DESC_FALSE,

  PRODUCT_DESCRIPTION,
  SET_FLAG_INFO_FALSE,
  SET_FLAG_INFO_TRUE,
  GET_LIST_OF_DATA_DELETE
} from "../constants/adminConstans";
import {
  GET_PRODUCT_CAT_LIST_DELETE,
  GET_PRODUCT_SUBCAT_LIST_DELETE,
  SEARCH_SELECTED_DELETE,
  ADD_MYPRODUCT_DELETE,
  GET_MYPRODUCT_LIST_DELETE
} from "../constants/productConstans"
import {
  tableCellNoBorderRight,
  productsStyleHeader,
  activeBadge,
  inactiveBadge,
  btnEdit,
  btnInfo,
  btnDescription
} from "./AdminCSS";

function MyProducts() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const { windowWidth } = useResponsive();

  const shopId = params.idShop;
  const spotId = params.idSpot;

  //variables
  const [radioValue, setRadioValue] = useState(ONE);
  const [currentProductList, setCurrentProductList] = useState([]);
  const [selectedLgn, setSelectedLgn] = useState(null);
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

  const [elements, setElements] = useState([]);

  const [showErrorAddMyProduct, setShowErrorAddMyProduct] = useState(false);
  const [showErrorGetMyProduct, setShowErrorGetMyProduct] = useState(false);
  const [showErrorProductList, setShowErrorProductList] = useState(false);

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
    pages,
    current_page
  } = productListRedux;

  const myproductsRedux = useSelector((state) => state.getMyProducts);
  const {
    result: myProductsList,
    success: successMyProductList,
    loading: myProductListLoading,
    error: myProductListError,
  } = myproductsRedux;

  const addMyproductsRedux = useSelector((state) => state.addMyProduct);
  const {
    success: successAddMyProduct,
    loading: addMyProductLoading,
    error: addMyProductError,
  } = addMyproductsRedux;


  // Hendlers

  const closeError = () => {
    if (showErrorAddMyProduct) {
      dispatch({ type: ADD_MYPRODUCT_DELETE });
      setShowErrorAddMyProduct(false)
    }
    else if (showErrorGetMyProduct) {
      dispatch({ type: GET_MYPRODUCT_LIST_DELETE });
      setShowErrorGetMyProduct(false)
    }
    else if (showErrorProductList) {
      dispatch({ type: GET_LIST_OF_DATA_DELETE });
      setShowErrorProductList(false)
    }
    // else if (showErrorDeleteMyImage) {
    //   dispatch({ type: DELETE_MY_IMAGE_DELETE });
    //   setShowErrorDeleteMyImage(false)
    // }
  }

  const clearHandler = () => {
    dispatch({ type: SEARCH_SELECTED_DELETE });
    setSelectedLgn(null)
    setSelectedProductCategory(0)
    setSelectedProductCategoryList([])
    setSelectedProductSubCategoryList([])
    setNewProductList(result)
  };

  const addHandler = (i) => {

    dispatch(addMyproduct({
      idProduct: i.id,
      idSpot: spotId,
      idUser: userInfo.id
    }))
  }

  const pagesHendler = (i) => {
    if (Number(i) !== Number(current_page)) {
      setElements([])
      const searchData = {
        typeActivity: LIST_OF_MY_PRODUCTS,
        page: i,
        lng: flagLng ? selected2.lng : '0',
        cat: flagCategory ? selected2.category : '0',
        subcat: flagSubcategory ? selected2.subcategory : '0'
      }
      dispatch(getListOfData(searchData));
    }
  }

  const searchHandler = () => {
    setElements([])
    const searchData = {
      typeActivity: LIST_OF_MY_PRODUCTS,
      page: '1',
      lng: flagLng ? selected2.lng : '0',
      cat: flagCategory ? selected2.category : '0',
      subcat: flagSubcategory ? selected2.subcategory : '0'
    }
    dispatch(getListOfData(searchData));
  }

  const infoHandler = (i) => {
    setSelectedProductInfo(i)
    dispatch({ type: SET_FLAG_INFO_TRUE });
  }

  const closeInfoHandler = () => {
    dispatch({ type: SET_FLAG_INFO_FALSE });
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
    setSelectedLgn(option)
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
  // fetching first list of product from DB 
  useEffect(() => {
    // if (result.length === EMPTY_LIST) {
    const searchData = {
      typeActivity: LIST_OF_MY_PRODUCTS,
      page: "1",
      lng: "0",
      cat: "0",
      subcat: "0"
    }
    dispatch(getListOfData(searchData));
    // }
    dispatch({ type: SEARCH_SELECTED_DELETE })

  }, [])

  // ustawienie flagi błędu
  useEffect(() => {
    if (addMyProductError) {
      setShowErrorAddMyProduct(true)
    }
    if (myProductListError) {
      setShowErrorGetMyProduct(true)
    }
    // if (errorGetMyImage) {
    //   setShowErrorGetMyImage(true)
    // }
    // if (errorDeleteMyImage) {
    //   setShowErrorGetMyImage(true)
    // }
  }, [addMyProductError, myProductListError]);

  useEffect(() => {
    if (successMyProductList) {
    } else { dispatch(getMyproduct(spotId)) }
  }, [dispatch, myProductsList])

  useEffect(() => {
    if (successAddMyProduct) {
      dispatch({ type: ADD_MYPRODUCT_DELETE })
      dispatch({ type: GET_MYPRODUCT_LIST_DELETE })
    }

  }, [dispatch, successAddMyProduct])

  useEffect(() => {
    if (pages) {
      setElements([])
      for (let i = 1; i <= Number(pages); i++) {
        setElements(prevElementy => [...prevElementy, i]);
      }
    }
    // wybór wszystkich obiektów z tablicy result, których nie ma w myProductsList
    if (successMyProductList) {
      setCurrentProductList(result.filter((el1) => !myProductsList.some((el2) => el1.id === el2.id_product.id)));
      setNewProductList(result.filter((el1) => !myProductsList.some((el2) => el1.id === el2.id_product.id)))
    }

  }, [pages, successMyProductList, success]);

  //Comment
  // The dispatch function updates product list
  // gdy zostaną wybrane łacznie lub rozdzielnie język, kategoria i podkategoria

  useEffect(() => {
    if (flagSubcategory) {
      setNewProductList(
        newProductList.filter((product) =>
          Number(product.id_product_subtype.id)
          === Number(selected2.subcategory)))
    } else if (flagCategory) {
      setNewProductList(
        newProductList.filter((product) =>
          Number(product.id_product_subtype.id_product_type.id)
          === Number(selected2.category)))
    } else if (flagLng) {
      setNewProductList(
        newProductList.filter((product) =>
          product.id_product_subtype.id_product_type.language === selected2.lng))
    }
  }, [selected2, flagLng, flagCategory, flagSubcategory]);


  useEffect(() => {
    if (success) {
      if (flagSubcategory) {
        setNewProductList(
          newProductList.filter((product) =>
            Number(product.id_product_subtype.id)
            === Number(selected2.subcategory)))
      } else if (flagCategory) {
        setNewProductList(
          newProductList.filter((product) =>
            Number(product.id_product_subtype.id_product_type.id)
            === Number(selected2.category)))
      } else if (flagLng) {
        setNewProductList(
          newProductList.filter((product) =>
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
    if (flagLng & !flagCategory & !flagSubcategory) {
      dispatch(getProductCat());
    }
  }, [dispatch, selected2]);

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
  }, [dispatch, selected2]);

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

  const dataMyProductsTable = currentProductList.map((item) => ({
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
              onClick={() => addHandler(item)}
            >
              {t("btn-add")}
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
      {infoFlag ? (
        <InfoComponent
          title={t("InfoComponent_title_product")}
          obj={selectedProductInfo}
          typeObj={PRODUCT_DESCRIPTION}
          closeInfoHandler={closeInfoHandler}
        />
      ) : null}
      {showErrorAddMyProduct ?
        <ErrorMesageRedux
          confirmYes={closeError}
          error={addMyProductError}
        />
        : showErrorGetMyProduct ?
          <ErrorMesageRedux
            confirmYes={closeError}
            error={myProductListError}
          />
          :
          null}
      <Link
        to={{ pathname: `/dashboard/shops/spot/${shopId}/edit/${spotId}` }}
        style={{ color: "black" }}
      >
        <Icon icon="ion:arrow-back" />
        {t("btn-return")}
      </Link>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            fontSize: "calc(1.1rem + 0.3vw)",
            fontWeight: "500",
            margin: "0.4rem",
          }}
        >
          {t("MyProducts_title")}
        </div>

      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
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
            marginTop: windowWidth > 430 ? "-1rem" : "2rem",
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
          style={{
            ...btnEdit,
            color: "black",
            textTransform: "uppercase",
            marginRight: "1rem"
          }}
          onClick={() => searchHandler()}
        >
          <Icon icon="bi:search" width="32" height="32" color="black" />
        </button>
        <button
          style={{
            ...btnEdit,
            color: "black",
            textTransform: "uppercase",
            marginRight: "1rem"
          }}
          onClick={() => clearHandler()}
        >
          <Icon icon="mdi:close-thick" width="32" height="32" color="red" />
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
      {loadingGetListOfData || myProductListLoading || addMyProductLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DotsLoader />
        </div>
      ) : (
        <>
          <div
            style={{
              fontSize: "calc(0.55rem + 0.3vw)",
              fontWeight: "500",
              textTransform: "uppercase",
              margin: "0.4rem",
            }}>
            {t("My_product_pages")} :{" "}
            {pages && elements.length > 0 ? (

              elements.map((el) => (
                < button
                  style={{
                    ...btnEdit,
                    color: Number(current_page) == Number(el) ? "red" : "black",
                    textTransform: "uppercase",
                    marginRight: "0.35rem"
                  }}
                  onClick={() => pagesHendler(el)}
                >
                  {el}
                </button>
              ))
            ) : null}
          </div>
          <TableComponent
            data={dataMyProductsTable}
            columns={tableConatctcolumns}
            tableStyle={tableSubcatProductStyle}
            mainTableContainer={mainTableContainer}
          />
        </>
      )
      }
    </div >
  );
}

export default MyProducts;
