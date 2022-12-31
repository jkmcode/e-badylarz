import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import InfoComponent from "../component/infoComponent";
import { getCitiesList, unOrActiveList } from "../actions/adminActions";
import RadioButtons from "./RadioButtons";
import useResponsive from "../component/useResponsive";
import Divider from "./Divider";
import InfoAlertComponent from "../component/InfoAlertComponent";
import AddDescription from "./AddDescription";
import { emptylistTitle, emptyListIcon } from "./AdminCSS";
import { Icon } from "@iconify/react";

import {
  SET_FLAG_INFO_TRUE,
  SET_FLAG_INFO_FALSE,
  CITY_DESCRIPTION,
  UNACTIVE,
  ACTIVE,
  CITY,
  SET_CITY_FLAG_DESC_TRUE,
} from "../constants/adminConstans";

import { ONE, ZERO } from "../constants/environmentConstans";

function CitiesList(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { windowWidth } = useResponsive();

  const tableRef = useRef(null);

  const btnMinWidth = 70;

  // data from redux
  const dataRedux = useSelector((state) => state.citesList);
  const { loading, cityList, error, success } = dataRedux;

  const infoFlagRedux = useSelector((state) => state.flag);
  const { infoFlag, cityFlag, descFlag, cityDescFlag } = infoFlagRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const data2 = useSelector((state) => state.unOrActiveDescription);
  const { loading: loadingUpdate } = data2;

  const [citiesData, setCitiesData] = useState(false);
  const [objInfo, setObjInfo] = useState({});

  const [radioValue, setRadioValue] = useState("1");
  const [isOpen, setIsOpen] = useState(false);

  ///
  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [discObj, setDiscObj] = useState({});
  const [updateStatus, setUpdateStatus] = useState("");
  const [helper, setHelper] = useState("");
  const [objId, setObjId] = useState("");
  ///

  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
    setIsOpen(false);
  };

  const infoHandler = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
  };

  const closeInfoHandler = () => {
    dispatch({ type: SET_FLAG_INFO_FALSE });
  };

  const descriptionHandler = (i) => {
    dispatch({ type: SET_CITY_FLAG_DESC_TRUE });
    setHelper(i.name);
    setObjId(i.id);
  };

  // run if citiesList is empty
  useEffect(() => {
    if (cityList.length === 0) {
      dispatch(
        getCitiesList({
          Id: props.Id,
          param: "all",
        })
      );
    } else {
      setCitiesData(true);
    }
  }, [dispatch, cityList.length, citiesData]);

  ////

  const unActiveHandler = (id) => {
    setCitiesData(false);
    setShowAlert(true);
    setUpdateStatus(UNACTIVE);
    setDiscObj(id);
  };

  const activeHandler = (id) => {
    setCitiesData(false);
    setShowAlert(true);
    setUpdateStatus(ACTIVE);
    setDiscObj(id);
  };

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
  };

  useEffect(() => {
    if (confirm && updateStatus === UNACTIVE) {
      dispatch(
        unOrActiveList({
          Id: discObj,
          active: false,
          userId: userInfo.id,
          objType: CITY_DESCRIPTION,
          kind: "",
        })
      );
    }

    if (confirm && updateStatus === ACTIVE) {
      dispatch(
        unOrActiveList({
          Id: discObj,
          active: true,
          userId: userInfo.id,
          objType: CITY_DESCRIPTION,
          kind: "",
        })
      );
    }
  }, [confirm, dispatch, updateStatus]);

  //styling
  const mainContainer = {
    margin: "1rem",
    padding: "0.5rem",
    backgroundColor: "#f0fcf0",
  };

  const tableCustom = {
    fontFamily: "Helvetica, sans-serif",
    borderCollapse: "separate",
    borderSpacing: "0px",
    width: "100%",
    overflowY: "auto",
  };

  const columnName = {
    backgroundColor: "#04AA6D",
    color: "white",
    padding: "12px 8px",
    width: "100%",
  };

  const tableCell = {
    padding: "12px 8px",
    borderBottom: "1px solid grey",
  };

  const citiesBtn = {
    fontSize: "0.7rem",
    fontWeight: "700",
    background: "transparent",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    padding: "0.4rem",
    minWidth: windowWidth < 800 ? null : `${btnMinWidth}px`,
  };

  const btnUnactive = {
    ...citiesBtn,
    backgroundImage: `linear-gradient(171deg, rgba(234, 17, 59, 1) 45%, rgba(202, 71, 130, 1) 89%)`,
  };

  const btnActive = {
    ...citiesBtn,
    backgroundImage: `linear-gradient(171deg, rgba(29, 223, 77, 1) 45%, rgba(60, 128, 46, 1) 89%)`,
  };

  const btnDescription = {
    ...citiesBtn,
    backgroundImage: `linear-gradient(90deg, rgba(203, 197, 48, 1) 0%, rgba(151, 142, 12, 1) 100%)`,
  };

  const btnInfo = {
    ...citiesBtn,
    backgroundImage: `linear-gradient(171deg, rgba(34, 95, 165, 1) 45%, rgba(42, 51, 113, 1) 89%)`,
  };

  const emptyList = {
    fontSize: "1.2rem",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "400",
  };

  function StatusDistrictsTable({ active }) {
    let currentDistrictsList = [];
    if (active === true) {
      currentDistrictsList = cityList.filter((disc) => disc.is_active == true);
    }

    if (active === false) {
      currentDistrictsList = cityList.filter(
        (disc) => disc.is_active === false
      );
    }

    console.log("currentDistrictsList", currentDistrictsList);
    if (currentDistrictsList.length === 0) {
      return (
        <>
          <div style={emptylistTitle}>
            <div style={{ marginTop: "3rem" }}>pusta lista</div>
          </div>
          <div style={emptyListIcon}>
            <Icon icon="ic:outline-featured-play-list" />
          </div>
        </>
      );
    }

    return (
      <table style={tableCustom} ref={tableRef}>
        <thead>
          <tr>
            <th style={columnName}>{t("Table_head_name")}</th>
            <th style={columnName} />
            <th style={columnName}></th>
            <th style={columnName}></th>
          </tr>
        </thead>
        <tbody>
          {currentDistrictsList.map((i) => (
            <>
              <tr key={i.id}>
                <td style={tableCell}>{i.name}</td>
                <td style={tableCell}>
                  <button
                    style={btnUnactive}
                    onClick={() => unActiveHandler(i.id)}
                  >
                    {t("btn_unactive")}
                  </button>
                </td>
                <td style={tableCell}>
                  <button
                    style={btnDescription}
                    onClick={() => descriptionHandler(i)}
                  >
                    {t("btn_description")}
                  </button>
                </td>
                <td style={tableCell}>
                  <button style={btnInfo} onClick={() => infoHandler(i)}>
                    {t("btn_info")}
                  </button>
                </td>
              </tr>
              {helper === i.name && cityDescFlag && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: `calc(0.00001% + ${tableRef.current.offsetWidth}px)`,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#4d4d4d",
                      padding: "1rem",
                      width: "80%",
                      margin: "1rem",
                    }}
                  >
                    <AddDescription
                      objId={objId}
                      descType={CITY_DESCRIPTION}
                      return={true}
                    />
                  </div>
                </div>
              )}
            </>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      {loading || loadingUpdate ? (
        <Loader />
      ) : (
        <div style={mainContainer}>
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}

          {infoFlag && (
            <InfoComponent
              title={t("InfoComponent_title_city")}
              obj={objInfo}
              typeObj={CITY_DESCRIPTION}
              closeInfoHandler={closeInfoHandler}
            />
          )}

          {showAlert && (
            <InfoAlertComponent
              confirmYes={confirmYes}
              confirmNo={confirmNo}
              updateStatus={updateStatus}
              geo={CITY}
            />
          )}

          <Divider />
          {citiesData & cityFlag ? (
            <>
              <RadioButtons handleBtnValue={handleBtnValue} />
              {radioValue === ONE && <StatusDistrictsTable active={true} />}
              {radioValue === ZERO && <StatusDistrictsTable active={false} />}
            </>
          ) : null}
        </div>
      )}
    </>
  );
}

export default CitiesList;
