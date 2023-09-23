import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import useResponsive from "../component/useResponsive";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import ErrorMesageRedux from "./ErrorMesageRedux"
import useBackToLogin from "../component/useBackToLogin";
import { FormLayout, changeBtn, addBtn, returnBtn } from "./AdminCSS";
import FormInput from "./FormInput";
import FormInputIBAN from "./FormInputIBAN";
import Divider from "./Divider";
import { addArea, getAreaToEdit } from "../actions/areaAction";
import {
  GET_AREA_LIST_DELETE,
  TIME_AUT,
  ADD_AREA_DELETE,
  GET_AREA_DELETE
} from "../constants/areaConstans";

import {
  TIME_AUT_ERROR,
  TIME_AUT_SUCCESS,
  UNIQUE_VALUE
} from "../constants/environmentConstans";

import { TWO, THREE } from "../constants/adminConstans";
import {
  NAME_PATTERN,
  NIP_PATTERN,
  LONG_NAME_PATTERN,
  NO_BUILDING_PATTERN,
  POST_FORMAT,
  POST_NAME_PATTERN,
  PL_BANKACCOUNT_PATTERN,
  LATITUDE_PATTERN,
  LONGITUDE_PATTERN
} from "../constants/formValueConstans";

import { Icon } from "@iconify/react";

function AddArea() {
  useBackToLogin();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { windowWidth } = useResponsive();

  const activityAreaParam = params.add;
  const Id = params.id;
  const [values, setValues] = useState({
    areaName: "",
    nip: "",
    city: "",
    street: UNIQUE_VALUE,
    number: "",
    postCode: "",
    post: "",
    latitude: "",
    longitude: "",
    bankAccount: "",
  });

  const [showError, setShowError] = useState(false);
  const [showErrorAreaToEdit, setShowErrorAreaToEdit] = useState(false);

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addArea12 = useSelector((state) => state.areaActivity);
  const { loading, success, error } = addArea12;

  const getArea = useSelector((state) => state.areaToEdit);
  const {
    loading: loadingAreaToEdit,
    success: successAreaToEdit,
    error: errorAreaToEdit,
    area,
  } = getArea;

  // Handlers

  const closeError = () => {
    if (showError) {
      dispatch({ type: ADD_AREA_DELETE });
      setShowError(false)
    }
    else if (showErrorAreaToEdit) {
      dispatch({ type: GET_AREA_DELETE });
      setShowErrorAreaToEdit(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (activityAreaParam === "add") {
      dispatch(
        addArea({
          city: values.city,
          latitude: values.latitude,
          longitude: values.longitude,
          name: values.areaName,
          nip: values.nip,
          number: values.number,
          post: values.post,
          postCode: values.postCode,
          street: values.street,
          creator: userInfo.id,
          bankAccount: values.bankAccount,
          add: true,
        })
      );
    } else {
      dispatch(
        addArea({
          city: !values.city ? area.city : values.city,
          latitude: !values.latitude ? area.latitude : values.latitude,
          longitude: !values.longitude ? area.longitude : values.longitude,
          name: !values.areaName ? area.name : values.areaName,
          nip: !values.nip ? area.nip : values.nip,
          number: !values.number ? area.no_building : values.number,
          post: !values.post ? area.post : values.post,
          postCode: !values.postCode ? area.post_code : values.postCode,
          street: values.street === UNIQUE_VALUE ? area.street : values.street,
          creator: userInfo.id,
          bankAccount: !values.bankAccount
            ? area.bank_account
            : values.bankAccount,
          add: false,
          id: Id,
        })
      );
    }
  };

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const onChangeIBANHandler = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  //USEEFFECT

  // ustawienie flagi błędu
  useEffect(() => {
    if (error) {
      setShowError(true)
    }
    if (errorAreaToEdit) {
      setShowErrorAreaToEdit(true)
    }
  }, [error, errorAreaToEdit]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: GET_AREA_LIST_DELETE });
        dispatch({ type: ADD_AREA_DELETE });
        navigate("/dashboard/areas");
      }, TIME_AUT);
    }
  }, [success]);

  useEffect(() => {
    if (activityAreaParam === "edit") {
      dispatch(getAreaToEdit(Id));
    }
  }, []);

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

  //form data
  const inputs = [
    {
      id: "1",
      name: "areaName",
      type: "text",
      placeholder: t("AreaActivity_name_placeholder"),
      errorMessage: t("AreaActivity_name_error_message"),
      label: t("AreaActivity_label_name"),
      pattern: NAME_PATTERN,
      defaultValue:
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit && activityAreaParam === "edit" && area.name,
      required: true,
    },
    {
      id: "2",
      name: "nip",
      type: "text",
      placeholder: t("nip_placeholder"),
      errorMessage: t("nip_error_message"),
      label: t("nip_label"),
      pattern: NIP_PATTERN,
      defaultValue:
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit && activityAreaParam === "edit" && area.nip,
      required: true,
    },
    {
      id: "3",
      name: "city",
      type: "text",
      placeholder: t("city_placeholder"),
      errorMessage: t("city_error_message"),
      label: t("city_label"),
      pattern: NAME_PATTERN,
      defaultValue:
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit && activityAreaParam === "edit" && area.city,
      required: true,
    },
    {
      id: "4",
      name: "street",
      type: "text",
      placeholder: t("street_placeholder"),
      errorMessage: t("street_error_message"),
      label: t("street_label"),
      pattern: LONG_NAME_PATTERN,
      defaultValue:
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit && activityAreaParam === "edit" && area.street,
      required: false,
    },
    {
      id: "5",
      name: "number",
      type: "text",
      placeholder: t("number_placeholder"),
      errorMessage: t("number_error_message"),
      label: t("number_label"),
      pattern: NO_BUILDING_PATTERN,
      defaultValue:
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit &&
          activityAreaParam === "edit" &&
          area.no_building,
      required: true,
    },
    {
      id: "6",
      name: "postCode",
      type: "text",
      placeholder: t("postCode_placeholder"),
      errorMessage: t("postCode_error_message"),
      label: t("postCode_label"),
      pattern: POST_FORMAT,
      defaultValue:
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit && activityAreaParam === "edit" && area.post_code,
      required: true,
    },
    {
      id: "7",
      name: "post",
      type: "text",
      placeholder: t("AddShops_post_placeholder"),
      errorMessage: t("AddShops_post_error_message"),
      label: t("AddShops_label_post"),
      pattern: POST_NAME_PATTERN,
      defaultValue:
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit && activityAreaParam === "edit" && area.post,
      required: true,
    },
    {
      id: "8",
      name: "bankAccount",
      type: "tel",
      placeholder: t("bankAccound_placeholder"),
      errorMessage: t("bankAccound_error_message"),
      label: t("bankAccound_label"),
      pattern: PL_BANKACCOUNT_PATTERN,
      defaultValue:
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit &&
          activityAreaParam === "edit" &&
          area.bank_account,
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
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit && activityAreaParam === "edit" && area.latitude,
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
        activityAreaParam === "add"
          ? ""
          : successAreaToEdit && activityAreaParam === "edit" && area.longitude,
      required: true,
    },
  ];

  return (
    <>
      {loading || loadingAreaToEdit ? (
        <Loader />
      ) : (
        <div style={mainContainer}>
          {showError ?
            <ErrorMesageRedux
              confirmYes={closeError}
              error={error}
            />
            : showErrorAreaToEdit ?
              <ErrorMesageRedux
                confirmYes={closeError}
                error={errorAreaToEdit}
              />
              : null}

          {success ? (
            <ErrorMessage
              msg={
                activityAreaParam === "add"
                  ? t("AddArea_success")
                  : t("EditArea_success")
              }
              timeOut={TIME_AUT_SUCCESS}
              variant="success"
              success={true}
            />
          ) : null}
          <Link to="/dashboard/areas" style={returnBtn}>
            <Icon icon="ion:arrow-back" />
            {t("btn-return")}
          </Link>
          <div className="d-flex justify-content-center display-6">
            {activityAreaParam === "edit"
              ? t("AreaActivity_EditAreas_title")
              : t("AreaActivity_AddAreas_title")}
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
            <div style={{ fontWeight: 500 }}>
              {t("AreaActivity_title_address")}
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
            <div style={{ fontWeight: 500 }}>
              {t("AreaActivity_title_geolocation")}
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

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              {activityAreaParam === "edit" ? (
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

export default AddArea;
