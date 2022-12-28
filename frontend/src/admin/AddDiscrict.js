import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import useBackToLogin from "../component/useBackToLogin";
import { Icon } from "@iconify/react";
import FormInput from "./FormInput";

import { addDiscrict } from "../actions/discrictsActions";
import AddDescription from "./AddDescription";
import {
  DISTRICT_ADD_DELETE,
  DISTRICT_DELETE,
  DISCTRICT_DESCRIPTION,
  SET_FLAG_DESC_FALSE,
  SET_FLAG_DESC_TRUE,
  SET_FLAG_ADD_DESC_FALSE,
  SET_FLAG_ADD_DESC_TRUE,
  TWO,
} from "../constants/adminConstans";

import { FormLayout, submitBtn } from "./AdminCSS";

import { NUMBERS_AND_NATIONAL_LETTERS } from "../constants/formValueConstans";

import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";

function AddDiscrict() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useBackToLogin();

  const [nextDesc, setNextDesc] = useState(false);
  const [idNewDistrict, setIdNewDistrict] = useState("");

  const [disctrictName, setDisctrictName] = useState("");

  const [values, setValues] = useState({
    name: "",
    latitude: "",
    longitude: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit: addhandleSubmit,
    reset,
    trigger,
  } = useForm();

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dflag = useSelector((state) => state.flag);
  const { descFlag, addDescFlag } = dflag;

  const newDistrict = useSelector((state) => state.addDistrict);
  const { loading, error, success, district } = newDistrict;

  const onSubmit = (data) => {
    const insertData = {
      name: data.name,
      creator: userInfo.id,
      lat: data.latitude,
      lng: data.longitude,
    };
    dispatch(addDiscrict(insertData));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        if (window.confirm(t("AddDiscrict_window_confirm"))) {
          setNextDesc(true);
          setIdNewDistrict(district[0].id);
          dispatch({ type: SET_FLAG_DESC_TRUE });
          dispatch({ type: DISTRICT_ADD_DELETE });
          dispatch({ type: DISTRICT_DELETE });
        } else {
          dispatch({ type: DISTRICT_ADD_DELETE });
          dispatch({ type: DISTRICT_DELETE });
          dispatch({ type: SET_FLAG_ADD_DESC_TRUE });
        }
      }, TIME_SET_TIMEOUT);
    }
  }, [navigate, success]);

  useEffect(() => {
    dispatch({ type: SET_FLAG_DESC_FALSE });
    dispatch({ type: DISTRICT_ADD_DELETE });
  }, []);

  useEffect(() => {
    if (addDescFlag) {
      navigate("/dashboard/district");
    }
  }, [addDescFlag]);

  const inputs = [
    {
      id: "1",
      name: "name",
      type: "text",
      placeholder: t("AddDistrict_name_placeholder"),
      errorMessage: t("AddDistrict_name_error_message"),
      label: t("AddDistrict_label_name"),
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: "2",
      name: "latitude",
      type: "text",
      placeholder: t("AddShops_latitude_placeholder"),
      errorMessage: t("AddDistrict_longitude_error_message"),
      label: t("AddDistrict_label_latitude"),
      pattern: "^-?([1-8]\\d|90|[0-9])(\\.\\d+)?$",
      required: true,
    },
    {
      id: "3",
      name: "longitude",
      type: "text",
      placeholder: t("AddShops_longitude_placeholder"),
      errorMessage: t("AddDistrict_longitude_error_message"),
      label: t("AddDistrict_label_longitude"),
      pattern: "^-?(180|1[0-7]\\d|[1-9]\\d|[1-9])(\\.\\d+)?$",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? (
            <ErrorMessage msg={error} timeOut={4000} variant="danger" />
          ) : null}
          {success ? (
            <ErrorMessage
              msg={t("AddDiscrict_success")}
              timeOut={4000}
              variant="success"
              success={true}
            />
          ) : null}
          <Link
            to="/dashboard/district"
            style={{ color: "grey", textTransform: "uppercase" }}
          >
            <Icon icon="material-symbols:arrow-back-ios" />
            {t("btn-return")}
          </Link>
          <div className="d-flex justify-content-center display-6">
            {t("AddDiscrict_title")}
          </div>
          <form onSubmit={addhandleSubmit(onSubmit)}>
            {inputs.map((input, index) => {
              if (index === 0) {
                return (
                  <FormInput
                    key={input.id}
                    {...input}
                    onChange={onChange}
                    value={values[input.name]}
                  />
                );
              }
            })}
            <div
              style={{
                fontWeight: "500",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              {t("AddShops_title_geolocation")}
            </div>
            <FormLayout col={TWO}>
              {inputs.map((input, index) => {
                if (index > 0) {
                  return (
                    <>
                      <FormInput
                        key={input.id}
                        {...input}
                        onChange={onChange}
                        value={values[input.name]}
                      />
                    </>
                  );
                }
              })}
            </FormLayout>

            <div style={{ display: "flex", justifyContent: "center" }}>
              {nextDesc ? null : (
                <button style={submitBtn}>{t("btn-add")}</button>
              )}
            </div>
          </form>
          {nextDesc & descFlag ? (
            <AddDescription
              objId={idNewDistrict}
              descType={DISCTRICT_DESCRIPTION}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default AddDiscrict;
