import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import useResponsive from "../component/useResponsive";
import Divider from "./Divider";
import { FormLayout } from "./AdminCSS";
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
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [imageRender, setImageRender] = useState(false);
  const [currentTaxNo, setCurrentTaxNo] = useState("");

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

  const imageFlag = useSelector((state) => state.flag);
  const { shopImageFlag } = imageFlag;

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

  // normalize function
  const [bankAccount, setBankAccount] = useState("");

  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 39)
        .toUpperCase() || ""
    );
  };

  // Handlers
  const onSubmit = () => {
    //setCurrentTaxNo(data.nip);
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
          //photo: values.photo,
          post: values.post,
          postCode: values.postCode,
          street: values.street,
          creator: userInfo.id,
          bankAccount: !bankAccount ? shopDetails.bank_account : bankAccount,
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
          //photo: values.photo,
          post: !values.post ? shopDetails.post : values.post,
          postCode: !values.postCode ? shopDetails.post_code : values.postCode,
          street: !values.street ? shopDetails.street : values.street,
          creator: userInfo.id,
          bankAccount: !bankAccount ? shopDetails.bank_account : bankAccount,
          typeOfChnage: "Edit date",
        })
      );
      // if (isImage) {
      //   dispatch(
      //     InsertImage({ imageUpload: imageUpload, taxNo: currentTaxNo })
      //   );
      // }
    }
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

  //Reset Default data
  useEffect(() => {
    if (successGetShop) {
      reset({
        name: shopDetails.name,
        nip: shopDetails.nip,
        city: shopDetails.city,
        street: shopDetails.street,
        number: shopDetails.no_building,
        postCode: shopDetails.post_code,
        post: shopDetails.post,
        bankAccount: shopDetails.bank_account,
        latitude: shopDetails.latitude,
        longitude: shopDetails.longitude,
      });
    }
  }, [successGetShop]);

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
    if (successAdd || successUpdateShop) {
      dispatch({ type: ADD_SHOP_DELETE_SUCCESS });
      dispatch({ type: EDIT_SHOP_DELETE });
      dispatch({ type: GET_SHOPS_LIST_DELETE });
      navigate("/dashboard/shops");
    }

    // if (successAdd && !isImage && shopImageFlag) {
    //   navigate("/dashboard/shops/shops");
    // } else if (successAdd && isImage && successInsertImage && shopImageFlag) {
    //   navigate("/dashboard/shops/shops");
    // } else if (successUpdateShop && !isImage && shopImageFlag) {
    //   navigate("/dashboard/shops/shops");
    // } else if (
    //   successUpdateShop &&
    //   isImage &&
    //   successInsertImage &&
    //   shopImageFlag
    // ) {
    //   navigate("/dashboard/shops/shops");
    // }
  }, [successAdd, successUpdateShop]);
  //}, [successAdd, isImage, successInsertImage, successUpdateShop]);

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

  const returnBtn = {
    color: "#212529",
    fontSize: ".975rem",
    fontWeight: 500,
    lineHeight: 1.5,
    color: "black",
  };

  const BTN = {
    borderRadius: "0.25rem",
    padding: "0.5rem",
    minWidth: "100px",
    border: "none",

    color: "white",
    fontWeight: "500",
  };

  const changeBtn = {
    ...BTN,
    backgroundImage:
      "linear-gradient(183deg, rgba(236, 181, 26, 1) 0%, rgba(217, 196, 33, 1) 100%)",
  };

  const addBtn = {
    ...BTN,
    backgroundImage:
      "linear-gradient(183deg, rgba(72, 236, 26, 1) 0%, rgba(83, 155, 41, 1) 100%)",
  };

  /// UPDATE FORM
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
  });

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
      //pattern: "^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$",
      pattern: t("Pattern_nip"),
      defaultValue:
        successGetShop && editShopParam === "edit" && shopDetails.nip,
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

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  <FormInput
                    key={input.id}
                    {...input}
                    onChange={(event) => {
                      setBankAccount(event.target.value);
                      const { value } = event.target;
                      event.target.value = normalizeCardNumber(value);
                    }}
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
            <UploadImage nip={currentTaxNo} />
            {/* {imageRender
              ? editShopParam === "edit" &&
                shopDetails.photo !== null && (
                  <Col>
                    <img src={shopDetails.photo} />
                  </Col>
                )
              : null} */}
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
