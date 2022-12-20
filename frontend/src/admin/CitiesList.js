import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import InfoComponent from "../component/infoComponent";
import { Button, Table, ButtonGroup, ToggleButton } from "react-bootstrap";

import { getCitiesList, unOrActiveList } from "../actions/adminActions";

import {
  GET_CITES_LIST_DELETE,
  SET_FLAG_INFO_TRUE,
  CITY_DESCRIPTION,
} from "../constants/adminConstans";

function CitiesList(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // data from redux
  const dataRedux = useSelector((state) => state.citesList);
  const { loading, citiesList, error } = dataRedux;

  const infoFlagRedux = useSelector((state) => state.flag);
  const { infoFlag, cityFlag } = infoFlagRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const data2 = useSelector((state) => state.unOrActiveDescription);
  const { success, loading: loadingUpdate } = data2;

  const [citiesData, setCitiesData] = useState(false);
  const [info, setInfo] = useState(false);
  const [objInfo, setObjInfo] = useState({});

  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: t("Radio_true"), value: "1" },
    { name: t("Radio_false"), value: "0" },
  ];

  const activeHandler = (id) => {
    dispatch({ type: GET_CITES_LIST_DELETE });
    setCitiesData(false);
    dispatch(
      unOrActiveList({
        Id: id,
        active: true,
        userId: userInfo.id,
        objType: CITY_DESCRIPTION,
        kind: "",
      })
    );
  };

  const unActiveHandler = (id) => {
    dispatch({ type: GET_CITES_LIST_DELETE });
    setCitiesData(false);
    dispatch(
      unOrActiveList({
        Id: id,
        active: false,
        userId: userInfo.id,
        objType: CITY_DESCRIPTION,
        kind: "",
      })
    );
  };

  const infoHandler = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
    setInfo(true);
  };

  const descriptionHandler = (i) => {
    navigate(`/add-description/${i.name}/${i.id_district}/${i.id}/add`);
  };

  // run if citiesList is empty
  useEffect(() => {
    if (!citiesList) {
      dispatch(
        getCitiesList({
          Id: props.Id,
          param: "all",
        })
      );
    } else {
      setCitiesData(true);
    }
  }, [dispatch, citiesList]);

  // run if success is true (unOrActiveDescription)
  useEffect(() => {
    if (success) {
      dispatch(
        getCitiesList({
          Id: props.Id,
        })
      );
    }
  }, [dispatch, success]);

  const tableCustom = {
    fontFamily: "Helvetica, sans-serif",
    borderCollapse: "separate",
    borderSpacing: "0px",
    width: "100%",
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

  const tableCellStripe = {
    ...tableCell,
    backgroundColor: "red",
  };

  const citiesBtn = {
    fontSize: "0.9rem",
    background: "transparent",
    color: "white",
    textTransform: "uppercase",
    border: "none",
  };

  const btnUnactive = {
    ...citiesBtn,
    backgroundImage: `linear-gradient(171deg, rgba(234, 17, 59, 1) 45%, rgba(202, 71, 130, 1) 89%)`,
  };

  const btnDescription = {
    ...citiesBtn,
    backgroundImage: `linear-gradient(90deg, rgba(203, 197, 48, 1) 0%, rgba(151, 142, 12, 1) 100%)`,
  };

  const btnInfo = {
    ...citiesBtn,
    backgroundImage: `linear-gradient(171deg, rgba(34, 95, 165, 1) 45%, rgba(42, 51, 113, 1) 89%)`,
  };

  return (
    <>
      {loading || loadingUpdate ? (
        <Loader />
      ) : (
        <div
          style={{
            margin: "1rem",
            padding: "0.5rem",
            backgroundColor: "#f0fcf0",
          }}
        >
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}

          {info & infoFlag ? (
            <InfoComponent
              title={t("InfoComponent_title_city")}
              obj={objInfo}
              typeObj={CITY_DESCRIPTION}
            />
          ) : null}
          <hr />
          {citiesData & cityFlag ? (
            <>
              <ButtonGroup className="mb-2">
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? "outline-danger" : "outline-success"}
                    name="radio"
                    style={{ fontSize: "0.9rem" }}
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              <table style={tableCustom}>
                <thead>
                  <tr>
                    <th style={columnName}>{t("Table_head_name")}</th>
                    <th style={columnName} />
                    <th style={columnName}></th>
                    <th style={columnName}></th>
                  </tr>
                </thead>
                <tbody>
                  {citiesList.length === 0 ? (
                    <p
                      style={{
                        fontSize: "1.2rem",
                        textAlign: "center",
                        textTransform: "uppercase",
                        fontWeight: "400",
                      }}
                    >
                      empty list
                    </p>
                  ) : (
                    citiesList.map((i, index) => (
                      <tr key={i.id}>
                        <>
                          {(radioValue === "1") & i.is_active ? (
                            <>
                              <td
                                style={
                                  index % 2 == 0 ? tableCell : tableCellStripe
                                }
                              >
                                {i.name}
                              </td>
                              <td
                                style={
                                  index % 2 == 0 ? tableCell : tableCellStripe
                                }
                              >
                                <button
                                  style={btnUnactive}
                                  onClick={() => unActiveHandler(i.id)}
                                >
                                  {t("btn_unactive")}
                                </button>
                              </td>
                              <td
                                style={
                                  index % 2 == 0 ? tableCell : tableCellStripe
                                }
                              >
                                <button
                                  style={btnDescription}
                                  onClick={() => descriptionHandler(i)}
                                >
                                  {t("btn_description")}
                                </button>
                              </td>
                              <td
                                style={
                                  index % 2 == 0 ? tableCell : tableCellStripe
                                }
                              >
                                <button
                                  style={btnInfo}
                                  onClick={() => infoHandler(i)}
                                >
                                  {t("btn_info")}
                                </button>
                              </td>
                            </>
                          ) : null}
                          {(radioValue === "0") & (i.is_active === false) ? (
                            <>
                              <td>{i.name}</td>
                              <td>
                                <Button
                                  variant="danger"
                                  className="btn-sm d-flex"
                                  onClick={() => activeHandler(i.id)}
                                >
                                  {t("btn_active")}
                                </Button>
                              </td>
                              <td>
                                <Button
                                  variant="info"
                                  className="btn-sm d-flex"
                                  onClick={() => infoHandler(i)}
                                >
                                  {t("btn_info")}
                                </Button>
                              </td>
                            </>
                          ) : null}
                        </>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}

export default CitiesList;
