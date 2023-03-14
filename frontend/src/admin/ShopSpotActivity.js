import React, { useState, useEffect } from "react";
import useResponsive from "../component/useResponsive";
import FormInput from "./FormInput";
import Divider from "./Divider";
import Loader from "../component/Loader";
import SelectOption from "./SelectOption";
import ErrorMessage from "../component/ErrorMessage";
import UploadImage from "../component/UploadImage";
import ImageDisplayer from "../component/ImageDisplayerComponent";
import RadioButtons from "./RadioButtons";
import AddDescription from "./AddDescription";
import InfoComponent from "../component/infoComponent";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FormLayout, changeBtn, addBtn } from "./AdminCSS";
import { TWO, THREE, FOUR } from "../constants/environmentConstans";
import { Icon } from "@iconify/react";
import { useKindShopSpots } from "../Data/KindShop";
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
  ADD_IMAGE_DELETE,
  EDIT_SHOP_SPOT_DELETE,
  SET_CITY_FLAG_DESC_TRUE,
  SPOT_DESCRIPTION,
  SET_FLAG_INFO_TRUE,
  SET_FLAG_INFO_FALSE,
} from "../constants/adminConstans";

import {
  TIME_AUT_ERROR,
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

function AddShopsSpot() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { windowWidth } = useResponsive();

  const [helper, setHelper] = useState(false);
  const [objId, setObjId] = useState("");
  const [objInfo, setObjInfo] = useState({});

  const [imageRender, setImageRender] = useState(false);
  const [currentSpotName, setCurrentSpotName] = useState("");
  const [selectedKindSpot, setSelectedKindSpot] = useState(0);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
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
  const { shopDetails, success: successGetShop, loading } = getShopRedux;

  const shopSpotUpdateRedux = useSelector((state) => state.shopSpotUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = shopSpotUpdateRedux;

  // Handlers

  const infoHandler = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
  };

  const closeInfoHandler = () => {
    dispatch({ type: SET_FLAG_INFO_FALSE });
  };

  const descriptionHandler = (i) => {
    dispatch({ type: SET_CITY_FLAG_DESC_TRUE });
    setHelper(true);
    setObjId(i.id);
    console.log("JESTEM w opisie --->>>", i);
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
    }
  }, []);

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

  //List of kind Spots
  // const kindSpots = [
  //   {
  //     id: "1",
  //     name: t("ShopsSpot_kind_shop"),
  //   },
  //   {
  //     id: "2",
  //     name: t("ShopsSpot_kind_farmer"),
  //   },
  //   {
  //     id: "3",
  //     name: t("ShopsSpot_kind_manufacturer"),
  //   },
  //   {
  //     id: "4",
  //     name: t("ShopsSpot_kind_wholesaler"),
  //   },
  //   {
  //     id: "5",
  //     name: t("ShopsSpot_kind_agent"),
  //   },
  // ];
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

  return (
    <>
      {loading ||
      spotLoading ||
      addSpotLoading ||
      loadingInsertImage ||
      loadingUpdate ? (
        <Loader />
      ) : (
        <div style={background}>
          {infoFlag ? (
            <InfoComponent
              title={t("InfoComponent_title_spot")}
              obj={objInfo}
              typeObj={SPOT_DESCRIPTION}
              closeInfoHandler={closeInfoHandler}
            />
          ) : null}
          {errorInsertImage ? (
            <ErrorMessage msg={errorInsertImage} timeOut={TIME_AUT_ERROR} />
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
          {successGetSpot && successGetShop && (
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
          {SpotParam === "edit" && (
            <>
              <Divider backgroundColor="grey" />
              <FormLayout col={TWO}>
                <button
                  style={btnDescription}
                  onClick={() => descriptionHandler(spotDetails)}
                >
                  {t("btn_description")}
                </button>
                <button
                  style={btnEdit}
                  onClick={() => infoHandler(spotDetails)}
                >
                  {t("btn_info")}
                </button>
              </FormLayout>
            </>
          )}

          <Divider backgroundColor="grey" />
          <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
          <form onSubmit={handleSubmit}>
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
            <div>
              {imageRender
                ? SpotParam === "edit" &&
                  spotDetails.photo !== null && (
                    <ImageDisplayer imageSrc={spotDetails.photo} />
                  )
                : null}
              <UploadImage />
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
