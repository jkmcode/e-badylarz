import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFullDiscricts } from "../actions/discrictsActions";
import Loader from "../component/Loader";
import InfoComponent from "../component/infoComponent";
import ErrorMessage from "../component/ErrorMessage";
import useBackToLogin from "../component/useBackToLogin";

import useResponsive from "../component/useResponsive";
import DistrictTable from "./DistrictTable";

import {
  DISCTRICT_DESCRIPTION,
  DISTRICT_DELETE,
  SET_FLAG_INFO_FALSE,
} from "../constants/adminConstans";

function AdminScreenDistrict() {
  const { t } = useTranslation();
  const { windowWidth } = useResponsive();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

  useBackToLogin();

  useEffect(() => {
    console.log("został uruchomiony AdminScreenDistrict");
  });

  // fech data from Redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const unOrActive = useSelector((state) => state.unOrActiveDescription);
  const {
    loading: loadingUnOrActive,
    success,
    error: errorUnOrActive,
  } = unOrActive;

  const infoFlagRedux = useSelector((state) => state.flag);
  const { infoFlag } = infoFlagRedux;

  const [info, setInfo] = useState(false);
  const [objInfo, setObjInfo] = useState({});

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

  //styling

  const btnMinWidth = 70;

  const btnDistrict = {
    fontSize: "0.8rem",
    border: "none",
    borderRadius: "0.25rem",
    padding: "0.4rem",
    color: "white",
    fontWeight: "500",
    minWidth: windowWidth < 800 ? null : `${btnMinWidth}px`,
  };

  const btnOulineSuccess = {
    ...btnDistrict,
    color: "green",
    border: "1px solid green ",
    fontSize: "1rem",
    margin: "0.4rem",
    textTransform: "uppercase",
  };

  const btnOutlineDanger = {
    ...btnDistrict,
    color: "red",
    border: "1px solid red ",
    fontSize: "1rem",
    margin: "0.4rem",
    textTransform: "uppercase",
  };

  //function
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
        <div className="bg-container mt-4 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <Row className="align-items-center">
            {!error && (
              <Col>
                <Link
                  to="add"
                  className="text-secondary d-flex justify-content-end"
                >
                  {t("btn-add")}
                </Link>
              </Col>
            )}
          </Row>

          <div className="d-flex justify-content-center display-6">
            {radioValue === "1"
              ? t("AdminScreenDistrict_title_active")
              : t("AdminScreenDistrict_title_unactive")}
          </div>
          {radios.map((radio) => {
            const { id, name, value } = radio;
            return (
              <button
                className={value === "1" ? "btnSuccessFocus" : "btnDangerFocus"}
                key={id}
                value={value}
                style={value === "1" ? btnOulineSuccess : btnOutlineDanger}
                onClick={(e) => handleBtnValue(e)}
              >
                {name}
              </button>
            );
          })}

          {info & infoFlag ? (
            <InfoComponent
              title={t("InfoComponent_title")}
              obj={objInfo}
              typeObj={DISCTRICT_DESCRIPTION}
            />
          ) : null}

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
