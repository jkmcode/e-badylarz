import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFullDiscricts } from "../actions/discrictsActions";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import useBackToLogin from "../component/useBackToLogin";
import DistrictTable from "./DistrictTable";
import RadioButtons from "./RadioButtons";
import { title } from "./AdminCSS";

import {
  DISTRICT_DELETE,
  SET_FLAG_INFO_FALSE,
  ONE,
} from "../constants/adminConstans";

function AdminScreenDistrict() {
  useBackToLogin();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

  const [radioValue, setRadioValue] = useState(ONE);

  // fech data from Redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const unOrActive = useSelector((state) => state.unOrActiveDescription);
  const {
    loading: loadingUnOrActive,
    success,
    error: errorUnOrActive,
  } = unOrActive;

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getFullDiscricts("all"));
    }
  }, [dispatch, districtList.length]);

  useEffect(() => {
    if (success) {
      dispatch({ type: DISTRICT_DELETE });
    }
  }, [dispatch, success]);

  useEffect(() => {
    dispatch({ type: SET_FLAG_INFO_FALSE });
  }, []);

  //RadioButtons functions
  const [isOpen, setIsOpen] = useState(false);

  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
    setIsOpen(false);
  };

  return (
    <>
      {loading || loadingUnOrActive ? (
        <Loader />
      ) : (
        <div
          style={{
            backgroundColor: "whitesmoke",
            marginTop: "1rem",
            padding: "2rem",
            borderRadius: "0.5rem",
          }}
        >
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          {!error && (
            <Link
              to="add"
              style={{
                color: "grey",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {t("btn-add")}
            </Link>
          )}

          <div style={title}>
            {radioValue === ONE
              ? t("AdminScreenDistrict_title_active")
              : t("AdminScreenDistrict_title_unactive")}
          </div>
          <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />

          {error ? (
            <p>{t("No_data")}</p>
          ) : (
            <div style={{ height: "65vh", overflowY: "auto" }}>
              <DistrictTable radioValue={radioValue} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AdminScreenDistrict;
