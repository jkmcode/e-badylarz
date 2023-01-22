import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import useResponsive from "../component/useResponsive";
import Divider from "./Divider";
import ImageDisplayer from "./ImageDisplayer";
import { FormLayout, changeBtn, addBtn, returnBtn } from "./AdminCSS";
import { Icon } from "@iconify/react";
import {
  addShop,
  getShop,
  updateShop,
  InsertImage,
} from "../actions/adminActions";
import UploadImage from "../component/UploadImage";
import useBackToLogin from "../component/useBackToLogin";
import FormInput from "./FormInput";
import FormInputIBAN from "./FormInputIBAN";
import {
  DELETE_IMAGE_REDUX,
  SET_FLAG_IMAGE_TRUE,
  GET_SHOPS_LIST_DELETE,
  TWO,
  THREE,
  ADD_SHOP_DELETE_SUCCESS,
  EDIT_SHOP_DELETE,
} from "../constants/adminConstans";

import {
  TIME_AUT_ERROR,
  TIME_AUT_SUCCESS,
  EDIT,
} from "../constants/environmentConstans";

function AddShops() {
  const { windowWidth } = useResponsive();
  useBackToLogin();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [imageRender, setImageRender] = useState(false);
  const [currentTaxNo, setCurrentTaxNo] = useState("");
  const [values, setValues] = useState({
    shopName: "",
    nip: "",
    city: "",
    street: "",
    number: "",
    postCode: "",
    post: "",
    latitude: "",
    longitude: "",
    bankAccount: "",
  });

  const editShopParam = params.edit;
  const addShopParam = params.add;

  const shopId = params.id;

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const shopListRedux = useSelector((state) => state.shopList);
  const { loading, error, successAdd, shopList } = shopListRedux;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  const insertImageRedux = useSelector((state) => state.insertImage);
  const { successInsertImage, loadingInsertImage } = insertImageRedux;

  const updateShopRedux = useSelector((state) => state.updateShop);
  const {
    loading: loadingUpdateShop,
    success: successUpdateShop,
    error: errorUpdateShop,
  } = updateShopRedux;

  const getShopRedux = useSelector((state) => state.getShop);
  const {
    loading: loadingGetShop,
    shopDetails,
    success: successGetShop,
    error: errorGetShop,
  } = getShopRedux;

  // Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentTaxNo(shopDetails.nip);
    if (addShopParam) {
      dispatch({ type: SET_FLAG_IMAGE_TRUE });
      dispatch(
        addShop({
          city: values.city,
          latitude: values.latitude,
          longitude: values.longitude,
          name: values.shopName,
          nip: values.nip,
          number: values.number,
          post: values.post,
          postCode: values.postCode,
          street: values.street,
          creator: userInfo.id,
          bankAccount: values.bankAccount,
        })
      );
    } else {
      dispatch({ type: SET_FLAG_IMAGE_TRUE });
      dispatch({ type: GET_SHOPS_LIST_DELETE });
      dispatch(
        updateShop({
          id: shopId,
          city: !values.city ? shopDetails.city : values.city,
          latitude: !values.latitude ? shopDetails.latitude : values.latitude,
          longitude: !values.longitude
            ? shopDetails.longitude
            : values.longitude,
          name: !values.shopName ? shopDetails.name : values.shopName,
          nip: !values.nip ? shopDetails.nip : values.nip,
          number: !values.number ? shopDetails.no_building : values.number,
          post: !values.post ? shopDetails.post : values.post,
          postCode: !values.postCode ? shopDetails.post_code : values.postCode,
          street: !values.street ? shopDetails.street : values.street,
          creator: userInfo.id,
          bankAccount: !values.bankAccount
            ? shopDetails.bank_account
            : values.bankAccount,
          typeOfChnage: "Edit date",
        })
      );
    }
  };
  const onChangeIBANHandler = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  // fetch data from DB -- shop to edit
  // remove old image
  useEffect(() => {
    dispatch({ type: DELETE_IMAGE_REDUX });
    if (shopId) {
      dispatch(
        getShop({
          Id: shopId,
        })
      );
      setImageRender(true);
    }
  }, []);

  // add/edit photo
  useEffect(() => {
    if (successAdd || successUpdateShop) {
      if (isImage) {
        dispatch(
          InsertImage({ imageUpload: imageUpload, taxNo: currentTaxNo })
        );
      }
    }
  }, [successAdd, isImage, successUpdateShop, imageUpload]);

  // navigate to ShopAdmin
  useEffect(() => {
    if (successAdd || successUpdateShop) {
      dispatch({ type: ADD_SHOP_DELETE_SUCCESS });
      dispatch({ type: EDIT_SHOP_DELETE });
      dispatch({ type: GET_SHOPS_LIST_DELETE });
      navigate("/dashboard/shops");
    }
  }, [successAdd, successUpdateShop]);

  //style

  const mainContainer = {
    backgroundImage:
      "linear-gradient(160deg, rgba(209, 207, 207, 1) 38%, rgba(144, 146, 151, 1) 100%)",
    boxShadow: "-9px 8px 34px -13px rgba(66, 68, 90, 1)",
    borderRadius: ".25rem",
    padding: "2rem",
    width: windowWidth > 800 ? "80%" : "100%",
    margin: "auto",
  };

  const title = {
    display: "flex",
    justifyContent: "center",
    fontSize: "2.5rem",
    fontWeight: 300,
    lineHeight: 1.2,
  };

  //Form data
  const inputs = [
    {
      id: "1",
      name: "shopName",
      type: "text",
      placeholder: t("AddShops_name_placeholder"),
      errorMessage: t("AddShops_shop_name_error_message"),
      label: t("AddShops_label_name"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{3,16}$",
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.name,
      required: true,
    },
    {
      id: "2",
      name: "nip",
      type: "text",
      placeholder: t("AddShops_nip_placeholder"),
      errorMessage: t("AddShops_nip_error_message"),
      label: t("AddShops_label_nip"),
      pattern: "^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$",
      //pattern: t("Pattern_nip"),
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.nip,
      disabled: editShopParam === "edit" ? true : false,
      required: true,
    },
    {
      id: "3",
      name: "city",
      type: "text",
      placeholder: t("AddShops_city_placeholder"),
      errorMessage: t("AddShops_city_error_message"),
      label: t("AddShops_label_city"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,16}$",
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.city,
      required: true,
    },
    {
      id: "4",
      name: "street",
      type: "text",
      placeholder: t("AddShops_street_placeholder"),
      errorMessage: t("AddShops_street_error_message"),
      label: t("AddShops_label_street"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,50}$",
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.street,
      required: true,
    },
    {
      id: "5",
      name: "number",
      type: "text",
      placeholder: t("AddShops_number_placeholder"),
      errorMessage: t("AddShops_number_error_message"),
      label: t("AddShops_label_number"),
      pattern: "^[0-9A-Z]+(-[0-9]+)?(/[0-9]+(-[0-9]+)?)*$",
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.no_building,
      required: true,
    },
    {
      id: "6",
      name: "postCode",
      type: "text",
      placeholder: t("AddShops_postCode_placeholder"),
      errorMessage: t("AddShops_postCode_error_message"),
      label: t("AddShops_label_postCode"),
      pattern: "^[0-9]{2}-[0-9]{3}$",
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.post_code,
      required: true,
    },
    {
      id: "7",
      name: "post",
      type: "text",
      placeholder: t("AddShops_post_placeholder"),
      errorMessage: t("AddShops_post_error_message"),
      label: t("AddShops_label_post"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,50}$",
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.post,
      required: true,
    },
    {
      id: "8",
      name: "bankAccount",
      type: "tel",
      placeholder: t("AddShops_bankAccound_placeholder"),
      errorMessage: t("AddShops_bankAccound_error_message"),
      label: t("AddShops_label_bankAccound"),
      pattern:
        "^PL[0-9]{2} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$",
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.bank_account,
      required: true,
    },
    {
      id: "9",
      name: "latitude",
      type: "text",
      placeholder: t("AddShops_latitude_placeholder"),
      errorMessage: t("AddDistrict_latitude_error_message"),
      label: t("AddDistrict_label_latitude"),
      pattern: "^-?([1-8]\\d|90|[0-9])(\\.\\d+)?$",
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.latitude,
      required: true,
    },
    {
      id: "10",
      name: "longitude",
      type: "text",
      placeholder: t("AddShops_longitude_placeholder"),
      errorMessage: t("AddDistrict_longitude_error_message"),
      label: t("AddDistrict_label_longitude"),
      pattern: "^-?(180|1[0-7]\\d|[1-9]\\d|[1-9])(\\.\\d+)?$",
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.longitude,
      required: true,
    },
  ];

  return (
    <>
      {loading || loadingInsertImage || loadingGetShop || loadingUpdateShop ? (
        <Loader />
      ) : (
        <div style={mainContainer}>
          {error ? <ErrorMessage msg={error} timeOut={TIME_AUT_ERROR} /> : null}
          {errorUpdateShop ? (
            <ErrorMessage msg={errorUpdateShop} timeOut={TIME_AUT_ERROR} />
          ) : null}
          {errorGetShop ? (
            <ErrorMessage msg={errorGetShop} timeOut={TIME_AUT_ERROR} />
          ) : null}

          {successAdd ? (
            <ErrorMessage
              msg={t("AddShops_success")}
              timeOut={TIME_AUT_SUCCESS}
              variant="success"
              success={true}
            />
          ) : null}
          {successUpdateShop ? (
            <ErrorMessage
              msg={t("EditShops_success")}
              timeOut={TIME_AUT_SUCCESS}
              variant="success"
              success={true}
            />
          ) : null}

          <Link to="/dashboard/shops" style={returnBtn}>
            <Icon icon="ion:arrow-back" />
            {t("btn-return")}
          </Link>

          <div style={title}>
            {editShopParam === EDIT
              ? t("EditShops_title")
              : t("AddShops_title")}
          </div>
          <form onSubmit={handleSubmit}>
            <FormLayout col={TWO}>
              {inputs.map((input, index) => {
                if (index <= 1) {
                  return (
                    <FormInput key={input.id} {...input} onChange={onChange} />
                  );
                }
              })}
            </FormLayout>
            <Divider backgroundColor="grey" />
            <div style={{ color: "#404040", fontWeight: "500" }}>
              {t("AddShops_title_address")}
            </div>
            <FormLayout col={TWO}>
              {inputs.map((input, index) => {
                if (index === 2 || index === 3) {
                  return (
                    <FormInput key={input.id} {...input} onChange={onChange} />
                  );
                }
              })}
            </FormLayout>

            <FormLayout col={THREE}>
              {inputs.map((input, index) => {
                if (index === 4 || index === 5 || index === 6) {
                  return (
                    <FormInput key={input.id} {...input} onChange={onChange} />
                  );
                }
              })}
            </FormLayout>
            <Divider backgroundColor="grey" />
            {inputs.map((input, index) => {
              if (index === 7) {
                return (
                  <FormInputIBAN
                    key={input.id}
                    {...input}
                    onChange={onChangeIBANHandler}
                  />
                );
              }
            })}
            <Divider backgroundColor="grey" />
            <div style={{ color: "#404040", fontWeight: "500" }}>
              {t("AddShops_title_geolocation")}
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
            <UploadImage />
            {imageRender &&
              editShopParam === "edit" &&
              shopDetails.photo !== null && (
                <ImageDisplayer imageSrc={shopDetails.photo} />
              )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {editShopParam === "edit" ? (
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

export default AddShops;
