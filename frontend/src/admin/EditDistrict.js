import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { getFullDiscricts } from "../actions/discrictsActions";
import { Icon } from "@iconify/react";
import useBackToLogin from "../component/useBackToLogin";

import AddDescription from "./AddDescription";
import CitiesList from "./CitiesList";

import {
  DISCTRICT_DESCRIPTION,
  SET_FLAG_DESC_TRUE,
  SET_FLAG_DESC_FALSE,
  GET_CITES_LIST_DELETE,
  SET_FLAG_CITY_TRUE,
} from "../constants/adminConstans";

import {
  TIME_AUT_ERROR,
} from "../constants/environmentConstans"

function EditDistrict() {
  useBackToLogin();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const districtId = Number(params.id);

  const [addDescr, setAddDescr] = useState(false);
  const [cities, setCities] = useState(false);

  // data from redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const dflag = useSelector((state) => state.flag);
  const { descFlag, cityFlag } = dflag;

  const descrHandler = () => {
    setAddDescr(true);
    setCities(false);
    dispatch({ type: SET_FLAG_DESC_TRUE });
  };

  const addCityHandler = () => {
    dispatch({ type: GET_CITES_LIST_DELETE });
    navigate(`add-city`);
  };

  const citiesHandler = () => {
    if (!cities) {
      setAddDescr(false);
      setCities(true);
      dispatch({ type: SET_FLAG_CITY_TRUE });
      dispatch({ type: GET_CITES_LIST_DELETE });
    }
  };

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getFullDiscricts("only true"));
    }
  }, [dispatch, districtList.length]);

  useEffect(() => {
    dispatch({ type: SET_FLAG_DESC_FALSE });
  }, []);

  const [seletedCity, setSelectedCity] = useState("");

  useEffect(() => {
    if (districtList.length !== 0) {
      setSelectedCity(districtList.filter((i) => i.id === districtId)[0]);
    }
  }, []);

  useEffect(() => {
    // if (error === CREDENTIALS_WERE_NOT_PROVIDED || error === NO_PERMISSION) {
    //   dispatch({ type: DISTRICT_ADD_DESC_DELETE });
    //   dispatch({ type: USER_LOGOUT });
    //   navigate("/login-admin");
    // }
    if (error) {
      setAddDescr(false)
      dispatch({ type: SET_FLAG_DESC_FALSE });
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            backgroundColor: "white",
            height: "auto",
            minHeight: "80vh",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          {error ? <ErrorMessage msg={error} timeOut={TIME_AUT_ERROR} /> : null}
          <Link to="/dashboard/district" className="text-secondary">
            <Icon icon="material-symbols:arrow-back-ios" />
            {t("btn-return")}
          </Link>
          <div
            style={{
              textAlign: "center",
              fontSize: `calc(1rem + 1.5vw)`,
              fontWeight: "350",
            }}
          >
            {t("EditDistrict_title")} : {seletedCity.name}
          </div>
          <div
            style={{
              width: "100%",
              height: "3px",
              backgroundColor: "rgb(82, 82, 122)",
              marginBottom: "1rem",
              borderRadius: "1rem",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                backgroundColor: "green",
                border: "none",
                color: "white",
                padding: "0.5rem",
                width: "300px",
                borderRadius: "0.25rem",
                marginRight: "0.75rem",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
              onClick={() => descrHandler()}
            >
              {t("btn_add_description")}
            </button>
            <button
              style={{
                backgroundColor: "green",
                border: "none",
                color: "white",
                padding: "0.5rem",
                width: "300px",
                borderRadius: "0.25rem",
                marginRight: "0.75rem",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
              onClick={() => citiesHandler()}
            >
              {t("btn_cities")}
            </button>
            <button
              style={{
                backgroundColor: "green",
                border: "none",
                color: "white",
                padding: "0.5rem",
                width: "300px",
                borderRadius: "0.25rem",
                marginRight: "0.75rem",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
              onClick={() => addCityHandler()}
            >
              {t("btn_add_citi")}
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingLeft: "4rem",
              paddingRight: "4rem",
            }}
          >
            <Icon
              icon="ic:baseline-add-comment"
              color="gray"
              width="240"
              height="240"
            />
            <Icon
              icon="material-symbols:map-outline-rounded"
              color="gray"
              width="240"
              height="240"
            />
            <Icon icon="mdi:city" color="gray" width="240" height="240" />
          </div>
          {addDescr & descFlag ? (
            <AddDescription
              objId={districtId}
              descType={DISCTRICT_DESCRIPTION}
            />
          ) : null}
          {cities & cityFlag ? <CitiesList Id={districtId} /> : null}
        </div>
      )}
    </>
  );
}

export default EditDistrict;
