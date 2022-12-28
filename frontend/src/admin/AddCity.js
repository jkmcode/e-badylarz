import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import InfoWindow from "../component/infoWindow";
import { getFullDiscricts } from "../actions/discrictsActions";
import useBackToLogin from "../component/useBackToLogin";
import useResponsive from "../component/useResponsive";
import { Icon } from "@iconify/react";
import Divider from "./Divider";

import { addCiti } from "../actions/adminActions";
import AddDescription from "./AddDescription";
import {
  CITI_ADD_DELETE,
  CITY_DESCRIPTION,
  SET_FLAG_DESC_FALSE,
  TWO,
} from "../constants/adminConstans";

import { formLabel, formInput, submitBtn, FormLayout } from "./AdminCSS";

import { NUMBERS_AND_NATIONAL_LETTERS } from "../constants/formValueConstans";

import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";

function AddCity() {
  useBackToLogin();
  const { windowWidth } = useResponsive();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const dscrictId = Number(params.id);

  const [addDescription, setAddDescription] = useState(false);
  const [idNewDistrict, setIdNewDistrict] = useState("");

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

  const d2flag = useSelector((state) => state.windowFlag);
  const { windowFlag } = d2flag;

  const newCity = useSelector((state) => state.addCity);
  const { loading, error, success, result } = newCity;

  const discrictListRedux = useSelector((state) => state.districts);
  const {
    districtList,
    loading: descLoading,
    error: descError,
  } = discrictListRedux;

  const onSubmit = (data) => {
    const insertData = {
      name: data.name,
      creator: userInfo.id,
      post: data.post,
      lat: data.latitude,
      lng: data.longitude,
      desc_id: dscrictId,
    };
    dispatch(addCiti(insertData));
  };

  useEffect(() => {
    dispatch({ type: SET_FLAG_DESC_FALSE });
    dispatch({ type: CITI_ADD_DELETE });
  }, []);

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getFullDiscricts("only true"));
    }
  }, [dispatch, districtList.length]);

  useEffect(() => {
    if (addDescFlag) {
      navigate(`/dashboard/district/${dscrictId}/edit`);
    }
  }, [addDescFlag]);

  //styling

  const mainContainer = {
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: "0.5rem",
    padding: "1.5rem",
  };

  const formLayout = {
    display: "grid",
    gridTemplateColumns:
      windowWidth > 800 ? `repeat(2, 1fr)` : `repeat(1, 1fr)`,
    gridColumnGap: "1rem",
  };

  const msgError = {
    fontStyle: "italic",
    fontSize: "0.75rem",
    margin: "0",
    color: "red",
  };

  const geolocationTitle = {
    fontSize: "1rem",
    fontWeight: "500",
  };

  return (
    <>
      {loading || descLoading ? (
        <Loader />
      ) : (
        <div style={mainContainer}>
          {error ? (
            <ErrorMessage
              msg={error}
              timeOut={TIME_SET_TIMEOUT}
              variant="danger"
            />
          ) : null}
          {descError ? (
            <ErrorMessage
              msg={descError}
              timeOut={TIME_SET_TIMEOUT}
              variant="danger"
            />
          ) : null}
          {success ? (
            <ErrorMessage
              msg={t("AddCity_success")}
              timeOut={TIME_SET_TIMEOUT}
              variant="success"
              success={true}
            />
          ) : null}

          {addDescription ? (
            <InfoWindow
              title={t("Window_title")}
              body={t("AddCity_body_window")}
            />
          ) : null}
          <Link
            style={{
              color: "grey",
              textTransform: "uppercase",
              verticalAlign: "top",
            }}
            to={`/dashboard/district/${dscrictId}/edit`}
          >
            <Icon icon="material-symbols:arrow-back-ios" />
            {t("btn-return")}
          </Link>

          <div className="d-flex justify-content-center display-6">
            {t("AddCiti_title")}
            {districtList.length === 0
              ? null
              : districtList.filter((i) => i.id === dscrictId)[0].name}
          </div>
          <Divider />
          <div>{t("AddCiti_subtitle")}</div>
          <form onSubmit={addhandleSubmit(onSubmit)}>
            <div style={formLayout}>
              <div controlId="name">
                <label htmlFor="name" style={formLabel}>
                  {t("AddCiti_label_name")}
                </label>
                <input
                  id="name"
                  type="text"
                  style={formInput}
                  className={"formInput"}
                  placeholder={t("AddCiti_name_placeholder")}
                  {...register("name", {
                    required: t("Form_field_required"),
                    pattern: {
                      value: NUMBERS_AND_NATIONAL_LETTERS,
                      message: t("Form_letters_pl_and_digits"),
                    },
                    minLength: {
                      value: 3,
                      message: t("Form_minLength_3"),
                    },
                    maxLength: {
                      value: 30,
                      message: t("Form_maxLength_30"),
                    },
                  })}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                  name="name"
                ></input>
                {errors.name && (
                  <div style={msgError}>{errors.name.message}</div>
                )}
              </div>
              <div controlId="post">
                <label htmlFor="post" style={formLabel}>
                  {t("AddCiti_label_post_code")}
                </label>
                <input
                  type="text"
                  id="post"
                  style={formInput}
                  className={"formInput"}
                  placeholder={t("AddCiti_post_code_placeholder")}
                  {...register("post", {
                    required: t("Form_field_required"),
                    pattern: {
                      value: /^[0-9A-Z -]+$/,
                      message: t("Form_post_code"),
                    },
                    minLength: {
                      value: 5,
                      message: t("Form_minLength_5"),
                    },
                    maxLength: {
                      value: 10,
                      message: t("Form_maxLength_10"),
                    },
                  })}
                  onKeyUp={() => {
                    trigger("post");
                  }}
                  name="post"
                ></input>
                {errors.post && (
                  <div style={msgError}>{errors.post.message}</div>
                )}
              </div>
            </div>

            <Divider />
            <div style={geolocationTitle}>
              {t("AddShops_title_geolocation")}
            </div>
            <FormLayout col={TWO}>
              <div controlId="latitude">
                <label htmlFor="latitude" style={formLabel}>
                  {t("AddShops_label_latitude")}
                </label>
                <input
                  type="text"
                  id="latitude"
                  style={formInput}
                  className={"formInput"}
                  placeholder={t("AddShops_latitude_placeholder")}
                  {...register("latitude", {
                    required: t("Form_field_required"),
                    pattern: {
                      value: /^[0-9.]+$/,
                      message: t("Form_only_digits_or_dot"),
                    },
                  })}
                  onKeyUp={() => {
                    trigger("latitude");
                  }}
                  name="latitude"
                ></input>
                {errors.latitude && (
                  <div style={msgError}>{errors.latitude.message}</div>
                )}
              </div>
              <div controlId="longitude">
                <label htmlFor="longitude" style={formLabel}>
                  {t("AddShops_label_longitude")}
                </label>
                <input
                  type="text"
                  id="longitude"
                  style={formInput}
                  className={"formInput"}
                  placeholder={t("AddShops_longitude_placeholder")}
                  {...register("longitude", {
                    required: t("Form_field_required"),
                    pattern: {
                      value: /^[0-9.]+$/,
                      message: t("Form_only_digits_or_dot"),
                    },
                  })}
                  onKeyUp={() => {
                    trigger("longitude");
                  }}
                  name="longitude"
                ></input>
                {errors.longitude && (
                  <div style={msgError}>{errors.longitude.message}</div>
                )}
              </div>
            </FormLayout>

            <div style={{ display: "flex", justifyContent: "center" }}>
              {windowFlag ? null : (
                <button type="submit" style={submitBtn}>
                  {t("btn-add")}
                </button>
              )}
            </div>
          </form>
          {windowFlag ? (
            <AddDescription objId={idNewDistrict} descType={CITY_DESCRIPTION} />
          ) : null}
        </div>
      )}
    </>
  );
}

export default AddCity;
