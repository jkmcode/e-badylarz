import React, { useState, useEffect } from "react";
import useResponsive from "../component/useResponsive";
import FormInput from "./FormInput";
import Divider from "./Divider";
import Loader from "../component/Loader";
import SelectOption from "./SelectOption";
import UploadImage from "../component/UploadImage";
import ImageDisplayer from "../component/ImageDisplayerComponent";
import RadioButtons from "./RadioButtons";
import AddDescription from "./AddDescription";
import InfoComponent from "../component/infoComponent";
import InfoAlertComponent from "../component/InfoAlertComponent";
import AddQuantityOffer from "./AddQuantityOffer"
import InfoOffer from "./InfoOffer";
import DateComponent from "../component/DateComponent"
import ErrorMesageRedux from "./ErrorMesageRedux"
import TableComponent from "./TableComponent";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TWO, THREE, FOUR } from "../constants/environmentConstans";
import { Icon } from "@iconify/react";
import noImage from "../images/noImage.png";
import { useKindShopSpots } from "../Data/KindShop";
import {
  getMyproduct,
  deleteMyProduct,
  getMyOffers,
  deleteMyOffers,
  updateSpotPickUp
} from "../actions/productActions"
import {
  addShopSpot,
  getShop,
  getSpot,
  updateShopSpot,
  InsertImage,
} from "../actions/adminActions";

import {
  GET_MYPRODUCT_LIST_DELETE,
  GET_MYOFFERS_LIST_DELETE,
  ADD_QUANTITY_OFFER_DELETE,
  DELETE_MY_PRODUCT_DELETE,
  DELETE_MYOFFERS_DELETE,
  UPDATE_SPOT_PICK_UP_DELETE
} from "../constants/productConstans"

import {
  DELETE_IMAGE_REDUX,
  SET_FLAG_IMAGE_TRUE,
  GET_SHOPS_LIST_DELETE,
  ADD_SHOP_SPOT_DELETE,
  ADD_IMAGE_DELETE,
  EDIT_SHOP_SPOT_DELETE,
  SET_CITY_FLAG_DESC_TRUE,
  SPOT_DESCRIPTION,
  PRODUCT_DESCRIPTION,
  MY_PRODUCT_DESCRIPTION,
  SET_FLAG_INFO_TRUE,
  SET_FLAG_INFO_FALSE,
  GET_SPOT_DELETE,
  GET_SOPTS_LIST_DELETE,
  GET_SHOP_DELETE
} from "../constants/adminConstans";

import {
  TIME_AUT_ERROR,
  EMPTY_LIST,
  TIME_AUT_SUCCESS,
} from "../constants/environmentConstans";

import {
  NAME_PATTERN,
  LONG_NAME_PATTERN,
  POST_NAME_PATTERN,
  LONGITUDE_PATTERN,
  LATITUDE_PATTERN,
  NO_BUILDING_PATTERN,
  POST_FORMAT,
  ONLY_NUMBER,
} from "../constants/formValueConstans";

import {
  FormLayout,
  tableCell,
  tableCellNoBorderRight,
  styleHeader,
  changeBtn,
  addBtn,
  btnInfo
} from "./AdminCSS";


function AddShopsSpot() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { windowWidth } = useResponsive();

  const [helper, setHelper] = useState(false);
  const [helperDesc, setHelperDesc] = useState(false);
  const [objId, setObjId] = useState("");
  const [objInfo, setObjInfo] = useState({});

  const [imageRender, setImageRender] = useState(false);
  const [currentSpotName, setCurrentSpotName] = useState("");
  const [selectedKindSpot, setSelectedKindSpot] = useState(0);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [valuePickUp, setValuePickUp] = useState(false);
  const [showDescription, setShowDescription] = useState(false)
  const [showPickUP, setShowPickUP] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showMyProduct, setShowMyProduct] = useState(false)
  const [showOffers, setShowOffers] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertDeleteOffer, setShowAlertDeleteOffer] = useState(false)
  const [confirm, setConfirm] = useState(false);
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [confirmAddInfo, setConfirmAddInfo] = useState(false);
  const [confirmAddData, setConfirmAddData] = useState({});
  const [confirmDeleteOffer, setConfirmDeleteOffer] = useState(false);
  const [infoKind, setInfoKind] = useState("")
  const [myProductId, setMyProductId] = useState(0)
  const [myOfferId, setMyOfferId] = useState(0)
  const [myProductCurrentList, setMyProductCurrentList] = useState([])
  const [myOffersCurrentList, setMyOffersCurrentList] = useState([])
  const [values, setValues] = useState({
    spotName: "",
    range: "",
    kindSpot: "",
    street: "",
    number: "",
    postCode: "",
    post: "",
    latitude: "",
    longitude: "",
    cityName: "",
  });

  const [showErrorMyProductList, setShowErrorMyProductList] = useState(false);
  const [showErrorDeleteMyProduct, setShowErrorDeleteMyProduct] = useState(false);
  const [showErrorGetSpot, setShowErrorGetSpot] = useState(false);
  const [showErrorGetSpotsList, setShowErrorGetSpotsList] = useState(false);
  const [showErrorInsertImage, setShowErrorInsertImage] = useState(false);
  const [showErrorGetShop, setShowErrorGetShop] = useState(false);
  const [showErrorUpdateSpot, setShowErrorUpdateSpot] = useState(false);
  const [showErrorMyOfferList, setShowErrorMyOfferList] = useState(false);
  const [showErrorMyOfferDelete, setShowErrorMyOfferDelete] = useState(false);
  const [showErrorMyOfferAdd, setShowErrorMyOfferAdd] = useState(false);
  const [showErrorUpdateSpotPickUp, setShowErrorUpdateSpotPickUp] = useState(false);

  const SpotParam = params.add;
  const shopId = params.id;
  const spotId = params.idSpot;

  const radios = [
    { name: t("Radio_own_collection"), value: "1" },
    { name: t("Radio_delivery"), value: "0" },
  ];


  // data from redux 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const infoFlagRedux = useSelector((state) => state.flag);
  const { cityDescFlag } = infoFlagRedux;

  const infoFlag12 = useSelector((state) => state.flag);
  const { infoFlag } = infoFlag12;

  const myproductsRedux = useSelector((state) => state.getMyProducts);
  const {
    result: myProductsList,
    success: successMyProductList,
    loading: myProductListLoading,
    error: myProductListError,
  } = myproductsRedux;

  const deleteMyproductsRedux = useSelector((state) => state.deleteMyProduct);
  const {
    result: deleteMyProductsList,
    success: successDeleteMyProductList,
    loading: deleteMyProductListLoading,
    error: deleteMyProductListError,
  } = deleteMyproductsRedux;

  const spotRedux = useSelector((state) => state.getSpot);
  const {
    spotDetails,
    success: successGetSpot,
    loading: spotLoading,
    error: spotError,
  } = spotRedux;

  const addSpotRedux = useSelector((state) => state.shopSpotsList);
  const {
    successAdd: successAddSpot,
    loading: addSpotLoading,
    error: addSpotError,
    shopSpotList,
  } = addSpotRedux;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  const insertImageRedux = useSelector((state) => state.insertImage);
  const {
    successInsertImage,
    loadingInsertImage,
    error: errorInsertImage,
  } = insertImageRedux;

  const getShopRedux = useSelector((state) => state.getShop);
  const {
    shopDetails,
    success: successGetShop,
    loading,
    error: errorGetShop
  } = getShopRedux;

  const shopSpotUpdateRedux = useSelector((state) => state.shopSpotUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = shopSpotUpdateRedux;

  const myOfferRedux = useSelector((state) => state.getMyOffers);
  const {
    result: myOfferList,
    loading: loadingMyOfferList,
    error: errorMyOfferList,
    success: successMyOfferList,
  } = myOfferRedux;

  const deleteMyOfferRedux = useSelector((state) => state.deleteMyOffers);
  const {
    result: myOfferDelete,
    loading: loadingMyOfferDelete,
    error: errorMyOfferDelete,
    success: successMyOfferDelete,
  } = deleteMyOfferRedux;

  const addSuccess = useSelector((state) => state.addQuantityMyOffers);
  const {
    result: myOfferAdd,
    success: successmyOfferAdd,
    error: errormyOfferAdd,
    loading: loadingmyOfferAdd
  } = addSuccess;

  const updateSpot = useSelector((state) => state.updateSpotPickUp);
  const {
    success: successUdatePickUp,
    error: errorUdatePickUp,
    loading: loadingUdatePickUp
  } = updateSpot;

  // Handlers

  const closeError = () => {
    if (showErrorMyProductList) {
      dispatch({ type: GET_MYPRODUCT_LIST_DELETE });
      setShowErrorMyProductList(false)
    }
    else if (showErrorDeleteMyProduct) {
      dispatch({ type: DELETE_MY_PRODUCT_DELETE });
      setShowErrorDeleteMyProduct(false)
    }
    else if (showErrorGetSpot) {
      dispatch({ type: GET_SPOT_DELETE });
      setShowErrorGetSpot(false)
    }
    else if (showErrorGetSpotsList) {
      dispatch({ type: GET_SOPTS_LIST_DELETE });
      setShowErrorGetSpotsList(false)
    }
    else if (showErrorInsertImage) {
      dispatch({ type: ADD_IMAGE_DELETE });
      setShowErrorInsertImage(false)
    }
    else if (showErrorGetShop) {
      dispatch({ type: GET_SHOP_DELETE });
      setShowErrorGetShop(false)
    }
    else if (showErrorUpdateSpot) {
      dispatch({ type: EDIT_SHOP_SPOT_DELETE });
      setShowErrorUpdateSpot(false)
    }
    else if (showErrorMyOfferList) {
      dispatch({ type: GET_MYOFFERS_LIST_DELETE });
      setShowErrorMyOfferList(false)
    }
    else if (showErrorMyOfferDelete) {
      dispatch({ type: DELETE_MYOFFERS_DELETE });
      setShowErrorMyOfferDelete(false)
    }
    else if (showErrorMyOfferAdd) {
      dispatch({ type: ADD_QUANTITY_OFFER_DELETE });
      setShowErrorMyOfferAdd(false)
    }
    else if (showErrorUpdateSpotPickUp) {
      dispatch({ type: UPDATE_SPOT_PICK_UP_DELETE });
      setShowErrorUpdateSpotPickUp(false)
    }
  };

  const clearHendler = () => {
    setShowDescription(false)
    setShowPickUP(false)
    setShowEdit(false)
    setShowMyProduct(false)
    setShowOffers(false)
    setHelper(false);
    setHelperDesc(false)
  }

  const addMyProduct = () => {
    dispatch({ type: GET_MYPRODUCT_LIST_DELETE });
    navigate(`/dashboard/shops/${shopId}/add-my-products/${spotId}`);
  }

  const infoHandlerProduct = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
    setInfoKind(PRODUCT_DESCRIPTION)
  };

  const infoHandlerMyProduct = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
    setInfoKind(MY_PRODUCT_DESCRIPTION)
  };

  const infoHandler = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
    setInfoKind(SPOT_DESCRIPTION)
  };

  const closeInfoHandler = () => {
    dispatch({ type: SET_FLAG_INFO_FALSE });
  };

  const descriptionHandler = (i) => {
    dispatch({ type: SET_CITY_FLAG_DESC_TRUE });
    setHelper(true);
    setHelperDesc(false)
    setObjId(i.id);
  };

  const infoHandlerMyDesc = (i) => {
    dispatch({ type: SET_CITY_FLAG_DESC_TRUE });
    setHelper(false);
    setHelperDesc(true)
    setObjId(i.id);
  };

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
    setMyProductId(0)
  };

  const confirmYesAdd = () => {
    setConfirmAdd(false);
    if (myOfferAdd == "OK") {
      dispatch(getMyOffers(spotId))
    }
    else {
      setMyOffersCurrentList(myOfferAdd)
    }
    dispatch({ type: ADD_QUANTITY_OFFER_DELETE });
  };

  const confirmNoAdd = () => {
    setConfirmAdd(false);

  };

  const confirmInfo = () => {
    setConfirmAddInfo(false)
  }

  const confirmYesDeleteOffer = () => {
    dispatch({ type: GET_MYOFFERS_LIST_DELETE });
    setShowAlertDeleteOffer(false);
    setConfirmDeleteOffer(true);
  };

  const confirmNoDeleteOffer = () => {
    setShowAlertDeleteOffer(false);
    setConfirmDeleteOffer(false);
    setMyOfferId(0)
  };

  const offerHendler = (i) => {
    navigate(`/dashboard/shops/${shopId}/my-products-offer/${spotId}/${i.id_product.name}/${i.id}`);
  }

  const infoHandlerMyDelete = (i) => {
    setShowAlert(true);
    setMyProductId(i.id)
  };

  const infoHandlerMyOfferAddQuantity = (i) => {
    setConfirmAdd(true)
    setConfirmAddData(i)
  }
  const infoHandlerAddQuantity = (i) => {
    setConfirmAddInfo(true)
    setConfirmAddData(i)
  }
  const infoHandlerMyOfferDelete = (i) => {
    setShowAlertDeleteOffer(true)
    setMyOfferId(i.id)
  }

  const infoHandlerMyPhoto = (i) => {
    navigate(`/dashboard/shops/${shopId}/my-products-photo/${spotId}/${i.id_product.name}/${i.id}`);
  };

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const selectKindHandler = (option) => {
    setSelectedKindSpot(Number(option));
    setValues({ ...values, kindSpot: option });
    setEmptyValueError(false);
  };

  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
  };

  const handleBtnValuePickUP = (e) => {
    const insertData = {
      user: userInfo.id,
      Id: spotId,
      id_shops: shopId,
      pickUp: !valuePickUp
    }
    dispatch(updateSpotPickUp(insertData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (SpotParam === "add") {
      if (selectedKindSpot !== 0) {
        setCurrentSpotName(values.spotName);
        const insertData = {
          add: true,
          id_shops: shopId,
          name: values.spotName,
          city: values.cityName,
          street: values.street,
          no_building: values.number,
          postCode: values.postCode,
          post: values.post,
          latitude: values.latitude,
          longitude: values.longitude,
          creator: userInfo.id,
          is_active: "True",
          delivery: radioValue === "1" ? "False" : "True",
          range: radioValue === "1" ? "0" : values.range,
          kind: values.kindSpot,
          pick_up: valuePickUp,
        };
        dispatch(addShopSpot(insertData));
      } else {
        setEmptyValueError(true);
      }
    } else {
      dispatch({ type: SET_FLAG_IMAGE_TRUE });
      dispatch({ type: GET_SHOPS_LIST_DELETE });
      //
      const insertData = {
        add: false,
        id_spot: spotId,
        id_shops: shopId,
        name: !values.spotName ? spotDetails.name : values.spotName,
        city: !values.cityName ? spotDetails.city : values.cityName,
        street: !values.street ? spotDetails.street : values.street,
        no_building: !values.number ? spotDetails.no_building : values.number,
        postCode: !values.postCode ? spotDetails.post_code : values.postCode,
        post: !values.post ? spotDetails.post : values.post,
        latitude: !values.latitude ? spotDetails.latitude : values.latitude,
        longitude: !values.longitude ? spotDetails.longitude : values.longitude,
        creator: userInfo.id,
        is_active: "True",
        delivery: radioValue === "1" ? "False" : "True",
        range:
          radioValue === "1"
            ? "0"
            : !values.range
              ? spotDetails.range
              : values.range,
        kind: !values.kindSpot ? spotDetails.kind : values.kindSpot,
        pick_up: valuePickUp,
      };
      dispatch(updateShopSpot(insertData));
    }
  };

  ///USEEFFECT

  // fetch data from DB -- shop & spot to edit
  // remove old image
  useEffect(() => {
    dispatch({ type: DELETE_IMAGE_REDUX });
    if (shopId) {
      dispatch(getShop({ Id: shopId }));
      setImageRender(true);
    }
    if (spotId) {
      dispatch(getSpot({ Id: spotId, type: "shop" }));
      dispatch(getMyOffers(spotId));
    }
  }, []);

  useEffect(() => {
    if (myProductListError) { }
    else {
      if (SpotParam === "add") { }
      else {
        if (!successMyProductList & !myProductListLoading) {
          dispatch(getMyproduct(spotId))
        }
      }
    }
  }, [myProductListError, successMyProductList]);

  useEffect(() => {
    if (successDeleteMyProductList) {
      setMyProductCurrentList(deleteMyProductsList)
    }
    else {
      if (successMyProductList) {
        setMyProductCurrentList(myProductsList)
      }
    }
  }, [successDeleteMyProductList, successMyProductList]);

  // ustawienie aktualnej listy ofert
  useEffect(() => {
    if (successMyOfferList) {
      setMyOffersCurrentList(myOfferList)
    }
  }, [successMyOfferList]);

  // pobranie nowych danych o punkie po aktualizacji punktu odbioru
  useEffect(() => {
    if (successUdatePickUp) {
      dispatch(getSpot({ Id: spotId, type: "shop" }));
    }
  }, [successUdatePickUp]);

  // ustawienie aktualnej listy ofert po kasowaniu
  useEffect(() => {
    if (successMyOfferDelete) {
      if (myOfferDelete != "OK") {
        setMyOffersCurrentList(myOfferDelete)
      } else { dispatch(getMyOffers(spotId)) }
    }

  }, [successMyOfferDelete]);

  // add photo
  useEffect(() => {
    if (successAddSpot) {
      shopSpotList.map((value) => {
        if (value.name === currentSpotName) {
          if (isImage) {
            dispatch(
              InsertImage({
                imageUpload: imageUpload,
                Id: value.id,
                objType: "Spot",
              })
            );
          } else {
            dispatch({ type: ADD_SHOP_SPOT_DELETE });
            dispatch({ type: EDIT_SHOP_SPOT_DELETE });
            navigate(`/dashboard/shops/${shopId}/contact`);
          }
        }
      });
    }
  }, [dispatch, successAddSpot, isImage]);

  // edit photo
  useEffect(() => {
    if (successUpdate) {
      if (isImage) {
        dispatch(
          InsertImage({ imageUpload: imageUpload, Id: spotId, objType: "Spot" })
        );
      } else {
        dispatch({ type: ADD_SHOP_SPOT_DELETE });
        dispatch({ type: EDIT_SHOP_SPOT_DELETE });
        navigate(`/dashboard/shops/${shopId}/contact`);
      }
    }
  }, [dispatch, successUpdate, isImage]);

  // navigate to ShopAdmin when image is seved
  useEffect(() => {
    if (successInsertImage) {
      dispatch({ type: ADD_SHOP_SPOT_DELETE });
      dispatch({ type: EDIT_SHOP_SPOT_DELETE });
      dispatch({ type: DELETE_IMAGE_REDUX });
      dispatch({ type: ADD_IMAGE_DELETE });
      navigate(`/dashboard/shops/${shopId}/contact`);
    }
  }, [dispatch, successInsertImage]);

  // is or not pick-up spot
  useEffect(() => {
    if (successGetSpot) {
      if (SpotParam === "edit") {
        setValuePickUp(spotDetails.pick_up_point);
      }
    }
  }, [dispatch, successGetSpot]);

  // delete my product 
  useEffect(() => {
    if (confirm) {
      dispatch({ type: GET_MYPRODUCT_LIST_DELETE });
      // to trzeba sprawdzić czy się nie dubluja żądania do bazy
      // skasowanie listy moze uruchomić jej pobieranie, a równocześnie funkcja deleteMyProduct zwraca te liste
      setConfirm(false)
      dispatch(deleteMyProduct({
        Id: myProductId,
        user: userInfo.id,
        IdSpot: spotId,
      }))
    }
  }, [dispatch, confirm]);

  // delete my offer 
  useEffect(() => {
    if (confirmDeleteOffer) {
      setConfirmDeleteOffer(false)
      dispatch(deleteMyOffers({
        offerId: myOfferId,
        user: userInfo.id,
        spotId: spotId
      }));
    }
  }, [dispatch, confirmDeleteOffer]);

  // set error flags
  useEffect(() => {
    if (myProductListError) {
      setShowErrorMyProductList(true)
    }
    else if (deleteMyProductListError) {
      setShowErrorDeleteMyProduct(true)
    }
    else if (spotError) {
      setShowErrorGetSpot(true)
    }
    else if (addSpotError) {
      setShowErrorGetSpotsList(true)
    }
    else if (errorInsertImage) {
      setShowErrorInsertImage(true)
    }
    else if (errorGetShop) {
      setShowErrorGetShop(true)
    }
    else if (errorUpdate) {
      setShowErrorUpdateSpot(true)
    }
    else if (errorMyOfferList) {
      setShowErrorMyOfferList(true)
    }
    else if (errorMyOfferDelete) {
      setShowErrorMyOfferDelete(true)
    }
    else if (errormyOfferAdd) {
      setShowErrorMyOfferAdd(true)
    }
    else if (errorUdatePickUp) {
      setShowErrorUpdateSpotPickUp(true)
    }
  }, [
    myProductListError,
    deleteMyProductListError,
    addSpotError,
    errorInsertImage,
    spotError,
    errorGetShop,
    errorUpdate,
    errorMyOfferList,
    errorMyOfferDelete,
    errormyOfferAdd,
    errorUdatePickUp
  ]);

  //style
  const background = {
    backgroundImage:
      SpotParam === "edit"
        ? "linear-gradient(179deg, rgba(217, 195, 19, 1) 64%, rgba(188, 169, 34, 1) 100%"
        : "linear-gradient(179deg, rgba(255, 255, 255, 1) 64%, rgba(124, 178, 80, 1) 100%)",
    boxShadow: "-9px 8px 34px -13px rgba(66, 68, 90, 1)",
    borderRadius: ".25rem",
    padding: "2rem",
    width: windowWidth > 800 ? "90%" : "100%",
    margin: "auto",
  };
  const btnTable = {
    backgroundColor: "white",
    border: "none",
    fontWeight: 600,
    borderRadius: "0.25rem",
    fontSize: "0.85rem",
  };
  const btnEdit = {
    ...btnTable,
    color: "#dec314",
  };
  const shopsBtn = {
    fontSize: "0.7rem",
    fontWeight: "700",
    background: "transparent",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    padding: "0.4rem",
    //minWidth: windowWidth < 800 ? null : `${btnMinWidth}px`,
    minWidth: "100px",
  };
  const btnDescription = {
    ...shopsBtn,
    backgroundImage: `linear-gradient(90deg, rgba(203, 197, 48, 1) 0%, rgba(151, 142, 12, 1) 100%)`,
  };

  const kindSpots = useKindShopSpots();

  //List of inputs
  const inputs = [
    {
      id: "1",
      name: "spotName",
      type: "text",
      placeholder: t("ShopsSpot_name_placeholder"),
      errorMessage: t("ShopsSpot_name_error_message"),
      label: t("ShopsSpot_label_name"),
      pattern: NAME_PATTERN,
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.name,
      required: true,
    },
    {
      id: "2",
      name: "kindSpot",
      label: t("ShopsSpot_label_kindSpot"),
      optionsList: kindSpots,
      defaultValue:
        SpotParam === "add"
          ? t("ShopsSpot_select_placeholder")
          : successGetSpot &&
          kindSpots.filter((i) => spotDetails.kind == i.id)[0].name,
      disabled: SpotParam === "edit" ? false : false,
    },
    {
      id: "3",
      name: "range",
      type: "text",
      placeholder: t("ShopsSpot_range_placeholder"),
      errorMessage: t("ShopsSpot_range_error_message"),
      label: t("ShopsSpot_label_range"),
      pattern: "^\\d+$",
      defaultValue:
        SpotParam === "add"
          ? "0"
          : successGetSpot && SpotParam === "edit" && spotDetails.range,
      required: true,
    },
    {
      id: "4",
      name: "cityName",
      type: "text",
      placeholder: t("ShopsSpot_city_name_placeholder"),
      errorMessage: t("ShopsSpot_city_name_error_message"),
      label: t("ShopsSpot_label_city_name"),
      pattern: NAME_PATTERN,
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.city,
      required: true,
    },
    {
      id: "5",
      name: "street",
      type: "text",
      placeholder: t("ShopsSpot_street_placeholder"),
      errorMessage: t("ShopsSpot_street_error_message"),
      label: t("ShopsSpot_street_label"),
      pattern: LONG_NAME_PATTERN,
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.street,
      required: true,
    },
    {
      id: "6",
      name: "number",
      type: "text",
      placeholder: t("ShopsSpot_number_placeholder"),
      errorMessage: t("ShopsSpot_number_error_message"),
      label: t("ShopsSpot_number_label"),
      pattern: NO_BUILDING_PATTERN,
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.no_building,
      required: true,
    },
    {
      id: "7",
      name: "postCode",
      type: "text",
      placeholder: t("ShopsSpot_postCode_placeholder"),
      errorMessage: t("ShopsSpot_postCode_error_message"),
      label: t("ShopsSpot_postCode_label"),
      pattern: POST_FORMAT,
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.post_code,
      required: true,
    },
    {
      id: "8",
      name: "post",
      type: "text",
      placeholder: t("ShopsSpot_post_placeholder"),
      errorMessage: t("ShopsSpot_post_error_message"),
      label: t("ShopsSpot_post_label"),
      pattern: POST_NAME_PATTERN,
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.post,
      required: true,
    },
    {
      id: "9",
      name: "latitude",
      type: "text",
      placeholder: t("latitude_placeholder"),
      errorMessage: t("latitude_error_message"),
      label: t("label_latitude"),
      pattern: LATITUDE_PATTERN,
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.latitude,
      required: true,
    },
    {
      id: "10",
      name: "longitude",
      type: "text",
      placeholder: t("longitude_placeholder"),
      errorMessage: t("longitude_error_message"),
      label: t("label_longitude"),
      pattern: LONGITUDE_PATTERN,
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.longitude,
      required: true,
    },
  ];

  // table style
  const mainTableContainer = {
    overflowY: "auto",
    height: "200px",
    marginTop: "1rem",
  };

  const tableStyle = {
    width: "100%",
    color: "white",
    backgroundImage: `linear-gradient(178deg, rgba(89, 131, 252, 1) 35%, rgba(41, 53, 86, 1) 100%)`,
    marginTop: "1rem",
  };

  // table of myoffer

  const tableMyOfferStyle = {
    ...tableStyle,
    color: "black",
    backgroundImage: `linear-gradient(183deg, rgb(236, 181, 26) 0%, rgb(217, 196, 33) 100%)`,
  };

  const tableMyOffercolumns = [
    {
      key: "name",
      label: t("MyOffer_name"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "offerEnd",
      label: t("MyOffer_end"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "quantity",
      label: t("MyOffer_quantity"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "btnDescription",
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
  ];
  let dataMyOfferTable = [];
  if (successMyOfferList || successMyOfferDelete) {
    dataMyOfferTable = myOffersCurrentList.map((item) => ({

      id: item.id,
      name: (
        <>
          {item.id_my_product.id_product.photo ? (
            <img
              style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
              src={item.id_my_product.id_product.photo}
            />
          ) : (
            <img
              style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
              src={noImage}
            />
          )}

          {item.id_my_product.id_product.name}
        </>
      ),
      offerEnd: (
        <>
          <DateComponent
            dateFromBackend={item.offer_from}
          />
          <DateComponent
            dateFromBackend={item.offer_to}
          />
        </>
      ),
      quantity: (
        <>
          {item.current_quantity}[{item.barrel_bulk_short}]
        </>
      ),
      btnDescription: (
        <>
          <button
            style={{ ...btnInfo, marginRight: "1rem", color: "green" }}
            onClick={() => infoHandlerAddQuantity(item)}
          >
            <Icon
              icon="teenyicons:info-circle-outline"
              width="24"
              height="24"
            />
          </button>
          <button
            style={{ ...btnInfo, marginRight: "1rem", color: "green" }}
            onClick={() => infoHandlerMyOfferAddQuantity(item)}
          >
            <Icon
              icon="ion:bag-add"
              width="24"
              height="24"
            />
          </button>
          <button
            style={{ ...btnInfo, marginRight: "1rem", color: "red" }}
            onClick={() => infoHandlerMyOfferDelete(item)}
          >
            <Icon
              icon="teenyicons:x-circle-outline"
              width="24"
              height="24"
            />
          </button>
        </>
      ),
    }));
  }

  // table of myproduct

  const tableMyproductStyle = {
    ...tableStyle,
    color: "black",
    backgroundImage: `linear-gradient(183deg, rgb(236, 181, 26) 0%, rgb(217, 196, 33) 100%)`,
  };

  const tableMyproductcolumns = [
    {
      key: "name",
      label: t("Myproduct_name"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "category",
      label: t("Products_categorySubcategory"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "btnOffered",
      label: t("Products_offer"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "btnDescription",
      label: t("My_descriptions"),
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
  ];

  let dataMyproductTable = [];
  if (successMyProductList || successDeleteMyProductList) {
    dataMyproductTable = myProductCurrentList.map((item) => ({
      id: item.id,
      name: (
        <>
          {item.id_product.photo ? (
            <img
              style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
              src={item.id_product.photo}
            />
          ) : (
            <img
              style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
              src={noImage}
            />
          )}

          {item.id_product.name}
          <button
            style={{ ...btnInfo, marginLeft: "1rem", marginRight: "1rem" }}
            onClick={() => infoHandlerProduct(item.id_product)}
          >
            {t("btn_info")}
          </button>
        </>
      ),
      category: (
        <>
          {item.id_product.id_product_subtype.id_product_type.name} - {item.id_product.id_product_subtype.name}
        </>
      ),
      btnOffered: (
        <>
          <button
            style={{ ...btnInfo, marginRight: "1rem", color: "green" }}
            onClick={() => offerHendler(item)}
          >
            <Icon
              icon="guidance:currency-exchange"
              width="24"
              height="24"
            />
          </button>
        </>
      ),
      btnDescription: (
        <>
          <button
            style={{ ...btnInfo, marginLeft: "1rem", marginRight: "1rem", color: "green" }}
            onClick={() => infoHandlerMyProduct(item)}
          >
            <Icon
              icon="teenyicons:info-circle-outline"
              width="24"
              height="24"
            />

          </button>
          <button
            style={{ ...btnInfo, marginRight: "1rem", color: "green" }}
            onClick={() => infoHandlerMyDesc(item)}
          >
            <Icon
              icon="teenyicons:text-document-outline"
              width="24"
              height="24"
            />
          </button>

          <button
            style={{ ...btnInfo, marginRight: "1rem", color: "green" }}
            onClick={() => infoHandlerMyPhoto(item)}
          >
            <Icon
              icon="teenyicons:image-outline"
              width="24"
              height="24"
            />
          </button>
          <button
            style={{ ...btnInfo, marginRight: "1rem", color: "red" }}
            onClick={() => infoHandlerMyDelete(item)}
          >
            <Icon
              icon="teenyicons:x-circle-outline"
              width="24"
              height="24"
            />
          </button>
        </>
      ),
    }));
  }


  return (
    <>
      {loading ||
        spotLoading ||
        addSpotLoading ||
        loadingInsertImage ||
        myProductListLoading ||
        loadingMyOfferList ||
        loadingMyOfferDelete ||
        deleteMyProductListLoading ||
        loadingUdatePickUp ||
        loadingmyOfferAdd ||
        loadingUpdate ? (
        <Loader />
      ) : (
        <div style={background}>
          {infoFlag ? (
            <InfoComponent
              title={
                infoKind === PRODUCT_DESCRIPTION ?
                  t("InfoComponent_title_product")
                  :
                  infoKind === MY_PRODUCT_DESCRIPTION ?
                    t("InfoComponent_title_my_product")
                    :
                    t("InfoComponent_title_spot")}
              obj={objInfo}
              typeObj={infoKind}
              closeInfoHandler={closeInfoHandler}
            />
          ) : null}
          {showAlert ?
            <InfoAlertComponent
              confirmYes={confirmYes}
              confirmNo={confirmNo}
              context={t("Confirmation_alert_delete_my_product")}
            /> : null}
          {showAlertDeleteOffer ?
            <InfoAlertComponent
              confirmYes={confirmYesDeleteOffer}
              confirmNo={confirmNoDeleteOffer}
              context={t("Confirmation_alert_delete_my_offer")}
            /> : null}
          {confirmAdd ?
            <AddQuantityOffer
              confirmYes1={confirmYesAdd}
              confirmNo={confirmNoAdd}
              context={confirmAddData}
              spot={spotId}
            /> : null}
          {confirmAddInfo ?
            <InfoOffer
              confirm={confirmInfo}
              context={confirmAddData}
            /> : null}
          {showErrorMyProductList ?
            <ErrorMesageRedux
              confirmYes={closeError}
              error={myProductListError}
            />
            : showErrorDeleteMyProduct ?
              <ErrorMesageRedux
                confirmYes={closeError}
                error={deleteMyProductListError}
              />
              : showErrorGetSpot ?
                <ErrorMesageRedux
                  confirmYes={closeError}
                  error={spotError}
                />
                : showErrorGetSpotsList ?
                  <ErrorMesageRedux
                    confirmYes={closeError}
                    error={addSpotError}
                  />
                  : showErrorInsertImage ?
                    <ErrorMesageRedux
                      confirmYes={closeError}
                      error={errorInsertImage}
                    />
                    : showErrorGetShop ?
                      <ErrorMesageRedux
                        confirmYes={closeError}
                        error={errorGetShop}
                      />
                      : showErrorUpdateSpot ?
                        <ErrorMesageRedux
                          confirmYes={closeError}
                          error={errorUpdate}
                        />
                        : showErrorMyOfferList ?
                          <ErrorMesageRedux
                            confirmYes={closeError}
                            error={errorMyOfferList}
                          />
                          : showErrorMyOfferDelete ?
                            <ErrorMesageRedux
                              confirmYes={closeError}
                              error={errorMyOfferDelete}
                            />
                            : showErrorMyOfferAdd ?
                              <ErrorMesageRedux
                                confirmYes={closeError}
                                error={errormyOfferAdd}
                              />
                              : showErrorUpdateSpotPickUp ?
                                <ErrorMesageRedux
                                  confirmYes={closeError}
                                  error={errorUdatePickUp}
                                />
                                : null}
          {/* {errorInsertImage ? (
            <ErrorMessage msg={errorInsertImage} timeOut={TIME_AUT_ERROR} />
          ) : null} */}
          {/* {spotError ? (
            <ErrorMessage msg={spotError} timeOut={TIME_AUT_ERROR} />
          ) : null} */}
          {/* {addSpotError ? (
            <ErrorMessage msg={addSpotError} timeOut={TIME_AUT_ERROR} />
          ) : null} */}
          {/* {errorUpdate ? (
            <ErrorMessage msg={errorUpdate} timeOut={TIME_AUT_ERROR} />
          ) : null} */}
          <Link
            to={{ pathname: `/dashboard/shops/${shopId}/contact` }}
            style={{ color: "black" }}
          >
            <Icon icon="ion:arrow-back" />
            {t("btn-return")}
          </Link>
          {successGetSpot && successGetShop && (
            <div style={{ textAlign: "center" }}>
              {t("ShopsSpot_Edit_subtitle")} -{" "}
              {shopDetails.name}, {shopDetails.city}, {shopDetails.street}{" "}
              {shopDetails.no_building}
            </div>
          )}
          <div
            style={{ textAlign: "center", fontSize: "calc(1.5rem + 0.5vw)" }}
          >
            {SpotParam === "edit" && successGetShop
              ? <>{t("ShopsSpot_Edit_title")} - {spotDetails.name}</>
              : t("ShopsSpot_Add_title")}
          </div>
          <Divider backgroundColor="grey" />
          {
            SpotParam === "edit" && (
              <button
                style={{
                  ...btnEdit,
                  color: "black",
                  textTransform: "uppercase",
                  marginRight: "1rem"
                }}
                onClick={() => clearHendler()}
              >
                <Icon
                  icon="mdi:close-thick"
                  width="24"
                  height="24"
                />
                {t("btn_clear")}
              </button>
            )
          }
          {helperDesc && cityDescFlag && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#4d4d4d",
                  padding: "0.4rem",
                  width: "80%",
                  margin: "0.4rem",
                }}
              >
                <AddDescription
                  objId={objId}
                  descType={MY_PRODUCT_DESCRIPTION}
                  return={true}
                />
              </div>
            </div>
          )}
          {SpotParam === "edit" && (
            showMyProduct ?
              <>
                <button
                  style={{
                    ...btnEdit,
                    color: "red",
                    textTransform: "uppercase",
                    marginRight: "1rem"
                  }}
                  onClick={() => setShowMyProduct(!showMyProduct)}
                >
                  <Icon
                    icon="ic:outline-keyboard-arrow-up"
                    width="24"
                    height="24"
                  />
                  {t("btn_myproduct")}
                </button>
                <p>
                  <button
                    style={{ ...addBtn, marginTop: "1rem" }}
                    onClick={() => addMyProduct()}
                  >
                    {t("btn-add")}
                  </button>
                  {successMyProductList ?
                    <TableComponent
                      data={dataMyproductTable}
                      columns={tableMyproductcolumns}
                      tableStyle={tableMyproductStyle}
                      mainTableContainer={mainTableContainer}
                    />
                    : null
                  }

                </p>
              </>
              :
              <button
                style={{
                  ...btnEdit,
                  color: "red",
                  textTransform: "uppercase",
                  marginRight: "1rem"
                }}
                onClick={() => setShowMyProduct(!showMyProduct)}
              >
                <Icon
                  icon="ic:outline-keyboard-arrow-down"
                  width="24"
                  height="24"
                />
                {t("btn_myproduct")}
              </button>
          )}

          {SpotParam === "edit" && (
            showOffers ?
              <>
                <button
                  style={{
                    ...btnEdit,
                    color: "red",
                    textTransform: "uppercase",
                    marginRight: "1rem",
                  }}
                  onClick={() => setShowOffers(!showOffers)}
                >
                  <Icon
                    icon="ic:outline-keyboard-arrow-up"
                    width="24"
                    height="24"
                  />
                  {t("btn_offers")}
                </button>
                <p>
                  {dataMyOfferTable.length > 0 ?
                    <>
                      <TableComponent
                        data={dataMyOfferTable}
                        columns={tableMyOffercolumns}
                        tableStyle={tableMyOfferStyle}
                        mainTableContainer={mainTableContainer}
                      />
                    </>
                    : <>
                      {t("no_offers")}
                    </>
                  }

                </p>
              </>
              :
              <button
                style={{
                  ...btnEdit,
                  color: "red",
                  textTransform: "uppercase",
                  marginRight: "1rem"
                }}
                onClick={() => setShowOffers(!showOffers)}
              >
                <Icon
                  icon="ic:outline-keyboard-arrow-down"
                  width="24"
                  height="24"
                />
                {t("btn_offers")}
              </button>
          )}

          {SpotParam === "edit" && (

            <>{
              showDescription ?
                <>
                  <button
                    style={{
                      ...btnEdit,
                      color: "red",
                      textTransform: "uppercase",
                    }}
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    <Icon
                      icon="ic:outline-keyboard-arrow-up"
                      width="24"
                      height="24"
                    />
                    {t("btn_description")}
                  </button>
                  <Divider backgroundColor="grey" />
                  <FormLayout col={TWO}>
                    <button
                      style={{ ...btnDescription, marginTop: "1rem" }}
                      onClick={() => descriptionHandler(spotDetails)}
                    >
                      {t("btn_description")}
                    </button>
                    <button
                      style={{ ...btnEdit, marginTop: "1rem" }}
                      onClick={() => infoHandler(spotDetails)}
                    >
                      {t("btn_info")}
                    </button>
                  </FormLayout>
                  <Divider backgroundColor="grey" />
                </>
                :
                <button
                  style={{ ...btnEdit, color: "red", textTransform: "uppercase" }}
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <Icon
                    icon="ic:baseline-keyboard-arrow-down"
                    width="24"
                    height="24"
                  />
                  {t("btn_description")}
                </button>

            }
            </>
          )}
          {helper && cityDescFlag && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#4d4d4d",
                  padding: "0.4rem",
                  width: "80%",
                  margin: "0.4rem",
                }}
              >
                <AddDescription
                  objId={objId}
                  descType={SPOT_DESCRIPTION}
                  return={true}
                />
              </div>
            </div>
          )}
          {SpotParam === "edit" && showPickUP ?
            <>
              <button
                style={{
                  ...btnEdit,
                  color: "red",
                  textTransform: "uppercase",
                  marginRight: "1rem",
                  marginLeft: "1rem"
                }}
                onClick={() => setShowPickUP(!showPickUP)}
              >
                <Icon
                  icon="ic:baseline-keyboard-arrow-up"
                  width="24"
                  height="24"
                />
                {t("btn_pick_up")}
              </button>
              <Divider backgroundColor="grey" />
              <div style={{ display: "flex", justifyContent: "center" }}>
                {valuePickUp ? t("Pick_up") : t("No_pick_up")}
                <button
                  style={{ ...btnEdit, marginLeft: "1rem" }}
                  onClick={() => handleBtnValuePickUP()}
                >
                  {t("btn-change")}
                </button>
              </div>
              <Divider backgroundColor="grey" />
            </>
            :
            <>
              <button
                style={{
                  ...btnEdit,
                  color: "red",
                  textTransform: "uppercase",
                  marginRight: "1rem",
                  marginLeft: "1rem"
                }}
                onClick={() => setShowPickUP(!showPickUP)}
              >
                <Icon
                  icon="ic:baseline-keyboard-arrow-down"
                  width="24"
                  height="24"
                />
                {t("btn_pick_up")}
              </button>
            </>
          }
          {SpotParam === "edit" ?
            showEdit ?
              <>
                <button
                  style={{
                    ...btnEdit,
                    color: "red",
                    textTransform: "uppercase",
                    marginRight: "1rem",
                  }}
                  onClick={() => setShowEdit(!showEdit)}
                >
                  <Icon
                    icon="ic:baseline-keyboard-arrow-up"
                    width="24"
                    height="24"
                  />
                  {t("btn_edit")}
                </button>
                <Divider backgroundColor="grey" />
                <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
                < form onSubmit={handleSubmit}>

                  <FormLayout col={THREE}>
                    {inputs.map((input, index) => {
                      if (index === 0) {
                        return (
                          <FormInput key={input.id} {...input} onChange={onChange} />
                        );
                      }
                    })}
                    {inputs.map((input, index) => {
                      if (index === 1) {
                        return (
                          <SelectOption
                            key={kindSpots.id}
                            optionsList={kindSpots}
                            label={input.label}
                            defaultValue={input.defaultValue}
                            emptyValueError={emptyValueError}
                            onChange={selectKindHandler}
                            {...input}
                          />
                        );
                      }
                    })}
                    {inputs.map((input, index) => {
                      if (index === 2 && radioValue === "0") {
                        return (
                          <FormInput key={input.id} {...input} onChange={onChange} />
                        );
                      }
                    })}
                  </FormLayout>
                  <Divider backgroundColor="grey" />

                  <div style={{ fontWeight: 500 }}>
                    {t("ShopsSpot_title_address")}
                  </div>
                  <FormLayout col={TWO}>
                    {inputs.map((input, index) => {
                      if (index === 4 || index === 3) {
                        return (
                          <FormInput key={input.id} {...input} onChange={onChange} />
                        );
                      }
                    })}
                  </FormLayout>
                  <FormLayout col={THREE}>
                    {inputs.map((input, index) => {
                      if (index === 7 || index === 5 || index === 6) {
                        return (
                          <FormInput key={input.id} {...input} onChange={onChange} />
                        );
                      }
                    })}
                  </FormLayout>
                  <Divider backgroundColor="grey" />
                  <div style={{ fontWeight: 500 }}>
                    {t("ShopsSpot_title_geolocation")}
                  </div>

                  <FormLayout col={TWO}>
                    {inputs.map((input, index) => {
                      if (index === 9 || index === 8) {
                        return (
                          <FormInput key={input.id} {...input} onChange={onChange} />
                        );
                      }
                    })}
                  </FormLayout>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {SpotParam === "edit" ? (
                      <button type="submit" style={{ ...addBtn, marginTop: "1rem" }}>
                        {t("btn-change")}
                      </button>
                    ) : (
                      <button type="submit" style={{ ...addBtn, marginTop: "1rem" }}>
                        {t("btn-add")}
                      </button>
                    )}
                  </div>
                  <div>
                    {imageRender
                      ? SpotParam === "edit" &&
                      spotDetails.photo !== null && (
                        <ImageDisplayer imageSrc={spotDetails.photo} />
                      )
                      : null}
                    <UploadImage />
                  </div>


                </form>
              </>
              :
              <>
                <button
                  style={{
                    ...btnEdit,
                    color: "red",
                    textTransform: "uppercase",
                    marginRight: "1rem",
                  }}
                  onClick={() => setShowEdit(!showEdit)}
                >
                  <Icon
                    icon="ic:baseline-keyboard-arrow-down"
                    width="24"
                    height="24"
                  />
                  {t("btn_edit")}
                </button>
              </>
            :
            <>
              <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
              < form onSubmit={handleSubmit}>
                <FormLayout col={THREE}>
                  {inputs.map((input, index) => {
                    if (index === 0) {
                      return (
                        <FormInput key={input.id} {...input} onChange={onChange} />
                      );
                    }
                  })}
                  {inputs.map((input, index) => {
                    if (index === 1) {
                      return (
                        <SelectOption
                          key={kindSpots.id}
                          optionsList={kindSpots}
                          label={input.label}
                          defaultValue={input.defaultValue}
                          emptyValueError={emptyValueError}
                          onChange={selectKindHandler}
                          {...input}
                        />
                      );
                    }
                  })}
                  {inputs.map((input, index) => {
                    if (index === 2 && radioValue === "0") {
                      return (
                        <FormInput key={input.id} {...input} onChange={onChange} />
                      );
                    }
                  })}
                </FormLayout>
                <Divider backgroundColor="grey" />

                <div style={{ fontWeight: 500 }}>
                  {t("ShopsSpot_title_address")}
                </div>
                <FormLayout col={TWO}>
                  {inputs.map((input, index) => {
                    if (index === 4 || index === 3) {
                      return (
                        <FormInput key={input.id} {...input} onChange={onChange} />
                      );
                    }
                  })}
                </FormLayout>
                <FormLayout col={THREE}>
                  {inputs.map((input, index) => {
                    if (index === 7 || index === 5 || index === 6) {
                      return (
                        <FormInput key={input.id} {...input} onChange={onChange} />
                      );
                    }
                  })}
                </FormLayout>
                <Divider backgroundColor="grey" />
                <div style={{ fontWeight: 500 }}>
                  {t("ShopsSpot_title_geolocation")}
                </div>

                <FormLayout col={TWO}>
                  {inputs.map((input, index) => {
                    if (index === 9 || index === 8) {
                      return (
                        <FormInput key={input.id} {...input} onChange={onChange} />
                      );
                    }
                  })}
                </FormLayout>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {SpotParam === "edit" ? (
                    <button type="submit" style={changeBtn}>
                      {t("btn-change")}
                    </button>
                  ) : (
                    <button type="submit" style={{ ...addBtn, marginTop: "1rem" }}>
                      {t("btn-add")}
                    </button>
                  )}
                </div>
                <div>
                  {imageRender
                    ? SpotParam === "edit" &&
                    spotDetails.photo !== null && (
                      <ImageDisplayer imageSrc={spotDetails.photo} />
                    )
                    : null}
                  <UploadImage />
                </div>


              </form>
            </>
          }
        </div >
      )
      }
    </>
  );
}

export default AddShopsSpot;
