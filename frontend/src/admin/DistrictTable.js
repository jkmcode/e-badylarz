import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import useResponsive from "../component/useResponsive";
import { unOrActiveList } from "../actions/adminActions";
import { useNavigate } from "react-router-dom";
import CitiesList from "./CitiesList";
import InfoAlertComponent from "../component/InfoAlertComponent";
import InfoComponent from "../component/infoComponent";
import { emptylistTitle, emptyListIcon } from "./AdminCSS";

import {
  SET_FLAG_CITY_TRUE,
  GET_CITES_LIST_DELETE,
  DISCTRICT_DESCRIPTION,
  SET_FLAG_INFO_TRUE,
  DISTRICT,
  UNACTIVE,
  ACTIVE,
  ONE,
  ZERO,
  SET_FLAG_INFO_FALSE,
} from "../constants/adminConstans";

function DistrictTable({ radioValue }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { windowWidth } = useResponsive();

  const [shopName, setShopName] = useState("");
  const [shopId, setShopId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState(false);
  const [objInfo, setObjInfo] = useState({});
  const [info, setInfo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [discObj, setDiscObj] = useState({});
  const [updateStatus, setUpdateStatus] = useState("");

  // fech data from Redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { districtList } = discrictListRedux;

  const infoFlagRedux = useSelector((state) => state.flag);
  const { infoFlag } = infoFlagRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //handlers
  const unActiveHandler = (id) => {
    setShowAlert(true);
    setDiscObj(id);
    setUpdateStatus(UNACTIVE);
  };

  const activeHandler = (id) => {
    setShowAlert(true);
    setDiscObj(id);
    setUpdateStatus(ACTIVE);
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
          objType: DISCTRICT_DESCRIPTION,
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
          objType: DISCTRICT_DESCRIPTION,
          kind: "",
        })
      );
    }
  }, [confirm, dispatch, updateStatus]);

  const infoHandler = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
    setInfo(true);
  };

  const editHandler = (i) => {
    navigate(`/dashboard/district/${i.id}/edit`);
  };

  const showMoreHandler = (discrict) => {
    dispatch({ type: SET_FLAG_CITY_TRUE });
    dispatch({ type: GET_CITES_LIST_DELETE });

    districtList.map((disc) => {
      if (discrict.name === disc.name) {
        setCities(true);
        setShopId(disc.id);
        setShopName(disc.name);
        setIsOpen(!isOpen);
      }
    });
  };

  //styling
  const mainTableContainer = {
    width: "100%",
    alignItems: "center",
    verticalAlign: "top",
    borderCollapse: "collapse",
  };

  const btnMinWidth = 70;

  const btnShowMore = {
    background: "transparent",
    border: "none",
  };

  const btnDistrict = {
    fontSize: "0.8rem",
    border: "none",
    borderRadius: "0.25rem",
    padding: "0.4rem",
    color: "white",
    fontWeight: "500",
    textTransform: "uppercase",
    minWidth: windowWidth < 800 ? null : `${btnMinWidth}px`,
  };

  const btnDistrictDanger = {
    ...btnDistrict,
    backgroundImage: `linear-gradient(171deg, rgba(234, 17, 59, 1) 45%, rgba(202, 71, 130, 1) 89%)`,
  };

  const btnDistrictSuccess = {
    ...btnDistrict,
    backgroundImage: `linear-gradient(171deg, rgba(29, 223, 77, 1) 45%, rgba(60, 128, 46, 1) 89%)`,
  };

  const btnDistrictEdit = {
    ...btnDistrict,
    backgroundImage: `linear-gradient(171deg, rgba(234, 209, 17, 1) 45%, rgba(202, 158, 71, 1) 89%)`,
  };

  const btnDistrictInfo = {
    ...btnDistrict,
    backgroundImage: `linear-gradient(171deg, rgba(34, 95, 165, 1) 45%, rgba(42, 51, 113, 1) 89%)`,
  };

  const titleCitiesList = {
    textTransform: "capitalize",
    marginTop: "1rem",
    marginLeft: "1rem",
    fontWeight: "500",
    fontSize: `calc(1rem + 0.4vw)`,
  };

  const closeInfoHandler = () => {
    dispatch({ type: SET_FLAG_INFO_FALSE });
  };

  function StatusDistrictsTable({ active }) {
    let currentDistrictsList = [];

    if (active === true) {
      currentDistrictsList = districtList.filter(
        (disc) => disc.is_active == true
      );
    }

    if (active === false) {
      currentDistrictsList = districtList.filter(
        (disc) => disc.is_active === false
      );
    }

    if (currentDistrictsList.length === 0) {
      return (
        <>
          <div style={emptylistTitle}>
            <div style={{ marginTop: "3rem" }}>{t("Table_empty_list")}</div>
          </div>
          <div style={emptyListIcon}>
            <Icon icon="ic:outline-featured-play-list" />
          </div>
        </>
      );
    }
    return (
      <table style={mainTableContainer}>
        <thead>
          <tr>
            <th style={{ padding: "1rem", width: "2%" }} />
            <th style={{ padding: "1rem", width: "98%" }}>
              {t("Table_head_name")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentDistrictsList.map((district) => {
            return (
              <>
                <tr key={district.id}>
                  <td
                    style={{
                      paddingLeft: "1rem",
                    }}
                  >
                    <button
                      onClick={() => showMoreHandler(district)}
                      style={btnShowMore}
                    >
                      {shopName === district.name && isOpen ? (
                        <Icon
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                        />
                      ) : (
                        <Icon
                          icon="ic:outline-keyboard-arrow-up"
                          width="24"
                          height="24"
                        />
                      )}
                    </button>
                  </td>
                  <td
                    style={{
                      padding: "1rem",
                    }}
                  >
                    {district.name}
                  </td>
                  <td
                    style={{
                      paddingRight: "0.5rem",
                    }}
                  >
                    {active ? (
                      <button
                        style={btnDistrictDanger}
                        className="btnHover"
                        onClick={() => unActiveHandler(district.id)}
                      >
                        {t("btn_unactive")}
                      </button>
                    ) : (
                      <button
                        style={btnDistrictSuccess}
                        className="btnHover"
                        onClick={() => activeHandler(district.id)}
                      >
                        {t("btn_active")}
                      </button>
                    )}
                  </td>
                  {active ? (
                    <td
                      style={{
                        paddingRight: "0.5rem",
                      }}
                    >
                      <button
                        className="btnHover"
                        style={btnDistrictEdit}
                        onClick={() => editHandler(district)}
                      >
                        {windowWidth < 800 ? (
                          <Icon
                            icon="material-symbols:edit-outline-sharp"
                            width="28"
                            height="28"
                          />
                        ) : (
                          t("btn_edit")
                        )}
                      </button>
                    </td>
                  ) : null}

                  <td
                    style={{
                      paddingRight: "0.5rem",
                    }}
                  >
                    <button
                      className="btnHover"
                      style={btnDistrictInfo}
                      onClick={() => infoHandler(district)}
                    >
                      {windowWidth < 800 ? (
                        <Icon
                          icon="humbleicons:info-circle"
                          color="white"
                          width="28"
                          height="28"
                        />
                      ) : (
                        t("btn_info")
                      )}
                    </button>
                  </td>
                </tr>
                <tr
                  className="tableCollapse"
                  style={{
                    height:
                      shopName === district.name && isOpen ? "100px" : "0.5px",
                    backgroundColor:
                      shopName === district.name && isOpen
                        ? "white"
                        : "transparent",
                    borderBottom: "solid 1px",
                  }}
                >
                  <td></td>
                  <td>
                    {shopName === district.name && isOpen ? (
                      <div
                        style={{
                          width: `calc(100% + ${3 * btnMinWidth}px)`,
                        }}
                      >
                        <div style={titleCitiesList}>{t("city")}</div>
                        <CitiesList Id={shopId} mainTable={true} />
                      </div>
                    ) : null}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      {infoFlag ? (
        <InfoComponent
          title={t("InfoComponent_title")}
          obj={objInfo}
          typeObj={DISCTRICT_DESCRIPTION}
          closeInfoHandler={closeInfoHandler}
        />
      ) : null}

      {showAlert && updateStatus === ACTIVE && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("Confirmation_alert_active")}
        />
      )}
      {showAlert && updateStatus === UNACTIVE && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("Confirmation_alert_unactive")}
        />
      )}
      {radioValue === ONE && <StatusDistrictsTable active={true} />}
      {radioValue === ZERO && <StatusDistrictsTable active={false} />}
    </>
  );
}

export default DistrictTable;
