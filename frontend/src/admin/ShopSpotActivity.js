import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getFullDiscricts } from "../actions/discrictsActions";
import { getAllCities } from "../actions/adminActions";
import { FormLayout, changeBtn, addBtn } from "./AdminCSS";
import { TWO, THREE } from "../constants/environmentConstans";
import useResponsive from "../component/useResponsive";
import FormInput from "./FormInput";
import Divider from "./Divider";
import Loader from "../component/Loader";
import SelectOption from "./SelectOption";
import ErrorMessage from "../component/ErrorMessage";
import UploadImage from "../component/UploadImage";
import RadioButtons from "./RadioButtons";
import {
  addShopSpot,
  getShop,
  getSpot,
  updateShopSpot,
  InsertImage,
} from "../actions/adminActions";

import {
  DELETE_IMAGE_REDUX,
  SET_FLAG_IMAGE_TRUE,
  GET_SHOPS_LIST_DELETE,
  ADD_SHOP_SPOT_DELETE,
} from "../constants/adminConstans";

import {
  TIME_AUT_ERROR,
  TIME_AUT_SUCCESS,
} from "../constants/environmentConstans";

import { Icon } from "@iconify/react";

function AddShopsSpot() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { windowWidth } = useResponsive();

  const [uploading, setUploading] = useState(false);
  const [imageRender, setImageRender] = useState(false);
  const [currentTaxNo, setCurrentTaxNo] = useState("");
  const [showShop, setShowShop] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [values, setValues] = useState({
    spotName: "",
    range: "",
    cityList: "",
    street: "",
    number: "",
    postCode: "",
    post: "",
    latitude: "",
    longitude: "",
  });

  const SpotParam = params.add;
  const editShopParam = params.edit;
  const shopId = params.id;
  const spotId = params.idSpot;

  const radios = [
    { name: t("Radio_own_collection"), value: "1" },
    { name: t("Radio_delivery"), value: "0" },
  ];

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const shopListRedux = useSelector((state) => state.shopList);
  const {
    loading: loadingShopList,
    error: errorShopList,
    successAdd,
    shopList,
  } = shopListRedux;

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
  } = addSpotRedux;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  const insertImageRedux = useSelector((state) => state.insertImage);
  const { successInsertImage, loadingInsertImage } = insertImageRedux;

  const imageFlag = useSelector((state) => state.flag);
  const { shopImageFlag } = imageFlag;

  const updateShopRedux = useSelector((state) => state.updateShop);
  const { loading: loadingUpdateShop, success: successUpdateShop } =
    updateShopRedux;

  const getShopRedux = useSelector((state) => state.getShop);
  const {
    loading: loadingGetShop,
    shopDetails,
    success: successGetShop,
  } = getShopRedux;

  const discrictListRedux = useSelector((state) => state.districts);
  const {
    loading: loadingDisctrict,
    districtList,
    error: errorDisctrict,
    success: successDisctric,
  } = discrictListRedux;

  const shopSpotUpdateRedux = useSelector((state) => state.shopSpotUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = shopSpotUpdateRedux;

  const dataRedux = useSelector((state) => state.citesList);
  const {
    loading: loadingCity,
    cityList,
    success,
    error: errorCity,
  } = dataRedux;

  const dataReduxCitiesListAll = useSelector((state) => state.citesListAll);
  const {
    loading: loadingCityAllList,
    cityListAll,
    success: successGetAllCities,
    error: errorGetAllCities,
  } = dataReduxCitiesListAll;

  // Handlers

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const selectDistrictHandler = (option) => {
    setSelectedDistrict(Number(option));
    setEmptyValueError(false);
  };

  const selectCityHandler = (option) => {
    setSelectedCity(Number(option));
    setValues({ ...values, cityList: option });
    setEmptyValueError(false);
  };

  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
  };

  const handleSubmit = (event) => {
    //setCurrentTaxNo(data.nip);
    event.preventDefault();

    if (SpotParam === "add") {
      //dispatch({ type: SET_FLAG_IMAGE_TRUE });
      if (selectedDistrict !== 0 && selectedCity !== 0) {
        const insertData = {
          add: true,
          id_shops: shopId,
          name: values.spotName,
          city: values.cityList,
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
        };
        dispatch(addShopSpot(insertData));
      } else {
        setEmptyValueError(true);
      }
    } else {
      dispatch({ type: SET_FLAG_IMAGE_TRUE });
      dispatch({ type: GET_SHOPS_LIST_DELETE });
      if (radioValue === "1") {
        const insertData = {
          add: false,
          id_spot: spotId,
          id_shops: shopId,
          name: !values.spotName ? shopDetails.name : values.spotName,
          city: values.cityList, /// To jest źle
          street: !values.street ? spotDetails.street : values.street,
          no_building: !values.number ? spotDetails.no_building : values.number,
          postCode: !values.postCode ? spotDetails.post_code : values.postCode,
          post: !values.post ? spotDetails.post : values.post,
          latitude: !values.latitude ? spotDetails.latitude : values.latitude,
          longitude: !values.longitude
            ? spotDetails.longitude
            : values.longitude,
          creator: userInfo.id,
          is_active: "True",
          delivery: "False",
          range: "0",
        };
        dispatch(updateShopSpot(insertData));
      }
    }
  };

  ///USEEFFECT

  // uruchamiane na samym początku
  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getFullDiscricts("only active"));
    }

    if (cityListAll.length === 0) {
      dispatch(getAllCities());
    }
  }, [dispatch, districtList.length, cityListAll.length]);

  // *********************************************************

  // uruchamiany gdy jest wybrany powiat
  const [newListCities, setNewListCities] = useState([]);

  useEffect(() => {
    setNewListCities(
      cityListAll.filter((city) => selectedDistrict === city.id_district)
    );
  }, [dispatch, selectedDistrict]);

  // *********************************************************

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
    }
  }, []);

  // set current Tax Number
  useEffect(() => {
    if (successAdd) {
      shopList.map((value) => {
        if (value.nip === currentTaxNo) {
          if (isImage) {
            dispatch(
              InsertImage({ imageUpload: imageUpload, taxNo: currentTaxNo })
            );
          }
        }
      });
    }
  }, [successAdd]);

  // navigate to ShopAdmin
  useEffect(() => {
    if (successAddSpot) {
      dispatch({ type: ADD_SHOP_SPOT_DELETE });
      navigate(`/dashboard/shops/${shopId}/contact`);
    }
  }, [dispatch, successAddSpot]);

  //style
  const background = {
    backgroundImage:
      SpotParam === "edit"
        ? "linear-gradient(179deg, rgba(217, 195, 19, 1) 64%, rgba(188, 169, 34, 1) 100%"
        : "linear-gradient(179deg, rgba(255, 255, 255, 1) 64%, rgba(124, 178, 80, 1) 100%)",
    boxShadow: "-9px 8px 34px -13px rgba(66, 68, 90, 1)",
    borderRadius: ".25rem",
    padding: "2rem",
    width: windowWidth > 800 ? "80%" : "100%",
    margin: "auto",
  };

  //List of inputs
  const inputs = [
    {
      id: "1",
      name: "spotName",
      type: "text",
      placeholder: t("ShopsSpot_name_placeholder"),
      errorMessage: t("ShopsSpot_name_error_message"),
      label: t("ShopsSpot_label_name"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,20}$",
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.name,
      required: true,
    },
    {
      id: "2",
      name: "range",
      type: "text",
      placeholder: t("ShopsSpot_range_placeholder"),
      errorMessage: t("ShopsSpot_range_error_message"),
      label: t("ShopsSpot_label_range"),
      pattern: "^[0-9]$",
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.range,
      required: true,
    },
    {
      id: "3",
      name: "districtList",
      label: t("ShopsSpot_label_districtList"),
      optionsList: districtList,
      defaultValue:
        SpotParam === "add"
          ? "Select option"
          : successGetSpot &&
            SpotParam === "edit" &&
            spotDetails.city.id_district.name,
      disabled: SpotParam === "edit" ? true : false,
    },
    {
      id: "4",
      name: "cityList",
      label: t("ShopsSpot_label_city"),
      optionsList: newListCities,
      defaultValue:
        SpotParam === "add"
          ? "Select option"
          : successGetSpot && SpotParam === "edit" && spotDetails.city.name,
      disabled:
        SpotParam === "edit" ? true : newListCities.length === 0 ? true : false,
    },
    {
      id: "5",
      name: "street",
      type: "text",
      placeholder: t("ShopsSpot_street_placeholder"),
      errorMessage: t("ShopsSpot_street_error_message"),
      label: t("ShopsSpot_street_label"),
      pattern: "^[A-Za-ząćęłńóśźżs]{3,50}$",
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
      pattern: "^(?!/|-|,)[0-9A-Za-z/,-]+(?<!/|,|-)$",
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
      pattern: "^[0-9]{2}-[0-9]{3}$",
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
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,50}$",
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
      pattern: "^-?([1-8]\\d|90|[0-9])(\\.\\d+)?$",
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
      pattern: "^-?(180|1[0-7]\\d|[1-9]\\d|[1-9])(\\.\\d+)?$",
      defaultValue:
        SpotParam === "add"
          ? ""
          : successGetSpot && SpotParam === "edit" && spotDetails.longitude,
      required: true,
    },
  ];

  return (
    <>
      {loadingDisctrict ||
      loadingCity ||
      loadingShopList ||
      // nie sprawdzone
      loadingInsertImage ||
      loadingGetShop ||
      loadingUpdateShop ||
      spotLoading ||
      addSpotLoading ? (
        <Loader />
      ) : (
        <div style={background}>
          {errorShopList ? (
            <ErrorMessage msg={errorShopList} timeOut={TIME_AUT_ERROR} />
          ) : null}
          {errorDisctrict ? (
            <ErrorMessage msg={errorDisctrict} timeOut={TIME_AUT_ERROR} />
          ) : null}
          {errorCity ? (
            <ErrorMessage msg={errorCity} timeOut={TIME_AUT_ERROR} />
          ) : null}
          {spotError ? (
            <ErrorMessage msg={spotError} timeOut={TIME_AUT_ERROR} />
          ) : null}
          {addSpotError ? (
            <ErrorMessage msg={addSpotError} timeOut={TIME_AUT_ERROR} />
          ) : null}
          {errorUpdate ? (
            <ErrorMessage msg={errorUpdate} timeOut={TIME_AUT_ERROR} />
          ) : null}
          <Link
            to={{ pathname: `/dashboard/shops/${shopId}/contact` }}
            style={{ color: "black" }}
          >
            <Icon icon="ion:arrow-back" />
            {t("btn-return")}
          </Link>
          {SpotParam === "edit" && successGetSpot && successGetShop && (
            <div style={{ textAlign: "center" }}>
              {shopDetails.name}, {shopDetails.city}, {shopDetails.street}{" "}
              {shopDetails.no_building}
            </div>
          )}
          <div
            style={{ textAlign: "center", fontSize: "calc(1.5rem + 0.5vw)" }}
          >
            {SpotParam === "edit"
              ? t("ShopsSpot_Edit_title")
              : t("ShopsSpot_Add_title")}
          </div>
          <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
          <form onSubmit={handleSubmit}>
            <FormLayout col={TWO}>
              {inputs.map((input, index) => {
                if (index === 0) {
                  return (
                    <FormInput key={input.id} {...input} onChange={onChange} />
                  );
                }
              })}
              {inputs.map((input, index) => {
                if (index === 1 && radioValue === "0") {
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
            <FormLayout col={THREE}>
              {inputs.map((input, index) => {
                if (index === 2 || index === 3) {
                  return (
                    <SelectOption
                      key={input.id}
                      optionsList={districtList}
                      label={input.label}
                      defaultValue={input.defaultValue}
                      emptyValueError={emptyValueError}
                      onChange={
                        index === 2 ? selectDistrictHandler : selectCityHandler
                      }
                      {...input}
                    />
                  );
                }
                if (index === 4) {
                  return (
                    <FormInput key={input.id} {...input} onChange={onChange} />
                  );
                }
              })}
            </FormLayout>
            <FormLayout col={THREE}>
              {inputs.map((input, index) => {
                if (index === 5 || index === 6 || index === 7) {
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
                if (index === 8 || index === 9) {
                  return (
                    <FormInput key={input.id} {...input} onChange={onChange} />
                  );
                }
              })}
            </FormLayout>
            <div>
              <UploadImage nip={currentTaxNo} />
              {imageRender
                ? editShopParam === "edit" &&
                  shopDetails.photo !== null && <img src={shopDetails.photo} />
                : null}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {SpotParam === "edit" ? (
                <button type="submit" style={changeBtn}>
                  {t("btn-change")}
                </button>
              ) : (
                <button type="submit" style={addBtn}>
                  {t("btn-add")}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddShopsSpot;
