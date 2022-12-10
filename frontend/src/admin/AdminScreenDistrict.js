import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFullDiscricts } from "../actions/discrictsActions";
import Loader from "../component/Loader";
import InfoComponent from "../component/infoComponent";
import ErrorMessage from "../component/ErrorMessage";
import { unOrActiveList } from "../actions/adminActions";
import { Icon } from "@iconify/react";
import CitiesList from "./CitiesList";
import useResponsive from "../component/useResponsive";

import {
  DISCTRICT_DESCRIPTION,
  DISTRICT_DELETE,
  SET_FLAG_INFO_TRUE,
  SET_FLAG_INFO_FALSE,
  SET_FLAG_CITY_TRUE,
  GET_CITES_LIST_DELETE,
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

  // fech data from Redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const dataRedux = useSelector((state) => state.citesList);
  const { citiesList } = dataRedux;

  const unOrActive = useSelector((state) => state.unOrActiveDescription);
  const {
    loading: loadingUnOrActive,
    success,
    error: errorUnOrActive,
  } = unOrActive;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const infoFlagRedux = useSelector((state) => state.flag);
  const { infoFlag } = infoFlagRedux;

  const [info, setInfo] = useState(false);
  const [objInfo, setObjInfo] = useState({});

  const activeHandler = (id) => {
    dispatch(
      unOrActiveList({
        Id: id,
        active: true,
        userId: userInfo.id,
        objType: DISCTRICT_DESCRIPTION,
        kind: "",
      })
    );
  };

  const unActiveHandler = (id) => {
    dispatch(
      unOrActiveList({
        Id: id,
        active: false,
        userId: userInfo.id,
        objType: DISCTRICT_DESCRIPTION,
        kind: "",
      })
    );
  };

  const infoHandler = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
    setInfo(true);
  };

  const editHandler = (i) => {
    navigate(`${i.id}/edit`);
  };

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

  const mainTableContainer = {
    width: "100%",
    alignItems: "center",
    verticalAlign: "top",
    borderCollapse: "collapse",
  };

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

  const btnDistrictDanger = {
    ...btnDistrict,
    backgroundImage: `linear-gradient(171deg, rgba(234, 17, 59, 1) 45%, rgba(202, 71, 130, 1) 89%)`,
  };

  const btnDistrictSuccess = {
    ...btnDistrict,
    backgroundImage: `linear-gradient(171deg, rgba(29, 223, 77, 1) 45%, rgba(60, 128, 46, 1) 89%)`,
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

  const btnDistrictEdit = {
    ...btnDistrict,
    backgroundImage: `linear-gradient(171deg, rgba(234, 209, 17, 1) 45%, rgba(202, 158, 71, 1) 89%)`,
  };

  const btnDistrictInfo = {
    ...btnDistrict,
    backgroundImage: `linear-gradient(171deg, rgba(34, 95, 165, 1) 45%, rgba(42, 51, 113, 1) 89%)`,
  };

  const btnShowMore = {
    background: "transparent",
    border: "none",
  };

  //function

  const [shopName, setShopName] = useState("");
  const [shopId, setShopId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState(false);

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
                  {districtList.map((district) => (
                    <>
                      <tr key={district.id} className="tableHover">
                        {radioValue === "1" && district.is_active ? (
                          <>
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
                              <button
                                style={btnDistrictDanger}
                                className="btnHover"
                                onClick={() => unActiveHandler(district.id)}
                              >
                                {t("btn_unactive")}
                              </button>
                            </td>
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
                          </>
                        ) : null}
                      </tr>
                      {radioValue === "1" && district.is_active ? (
                        <tr
                          className="tableCollapse"
                          style={{
                            height:
                              shopName === district.name && isOpen
                                ? "100px"
                                : "0.5px",
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
                                <h4>Miasta</h4>
                                <CitiesList Id={shopId} mainTable={true} />
                              </div>
                            ) : null}
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      ) : null}
                    </>
                  ))}
                  {districtList.map((district) =>
                    (radioValue === "0") & (district.is_active === false) ? (
                      <>
                        <tr key={district.id} className="tableHover">
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
                            <button
                              style={btnDistrictSuccess}
                              className="btnHover"
                              onClick={() => activeHandler(district.id)}
                            >
                              {t("btn_active")}
                            </button>
                          </td>
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
                              {t("btn_info")}
                            </button>
                          </td>
                        </tr>
                        {(radioValue === "0") &
                        (district.is_active === false) ? (
                          <tr
                            className="tableCollapse"
                            style={{
                              height:
                                shopName === district.name && isOpen
                                  ? "100px"
                                  : "0.5px",
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
                                    width: `calc(100% + ${2 * btnMinWidth}px)`,
                                  }}
                                >
                                  <h4>Miasta</h4>
                                  <CitiesList Id={shopId} mainTable={true} />
                                </div>
                              ) : null}
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        ) : null}
                      </>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AdminScreenDistrict;
