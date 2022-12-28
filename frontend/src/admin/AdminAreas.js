import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import { unOrActiveList } from "../actions/adminActions";
import ErrorMessage from "../component/ErrorMessage";
import useBackToLogin from "../component/useBackToLogin";
import { getAreas } from "../actions/areaAction";
import useResponsive from "../component/useResponsive";
import { Icon } from "@iconify/react";

import {
  TIME_AUT_ERROR,
  TIME_AUT_SUCCESS,
} from "../constants/environmentConstans";

import {
  ADD_AREA_DELETE,
  GET_AREA_LIST_DELETE,
} from "../constants/areaConstans";

function AdminAreas() {
  useBackToLogin();
  const { windowWidth } = useResponsive();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [activeAreas, setActiveAreas] = useState(true);

  // fech data from Redux
  const areaListRedux = useSelector((state) => state.areaList);
  const { loading, areaList, error, success } = areaListRedux;

  const areaActive = useSelector((state) => state.unOrActiveDescription);
  const {
    loading: loadingActive,
    error: errorActive,
    success: successActive,
  } = areaActive;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //  handle function

  const editHandler = (id) => {
    console.log("jestem--/.", id);
    navigate(`/dashboard/areas/edit/${id}`);
  };

  const activeHandler = (id) => {
    console.log("Test-->", id);
    dispatch(
      unOrActiveList({
        Id: id,
        active: true,
        userId: userInfo.id,
        objType: "AREA",
        kind: "Active area",
      })
    );
    //setActive(true);
  };

  const unActiveHandler = (id) => {
    //setActiveAreas(false);
    dispatch(
      unOrActiveList({
        Id: id,
        active: false,
        userId: userInfo.id,
        objType: "AREA",
        kind: "Inactive area",
      })
    );
  };

  // reset list of area
  useEffect(() => {
    if (successActive) {
      dispatch({ type: GET_AREA_LIST_DELETE });
    }
  }, [dispatch, successActive]);

  // fetching list of area from DB
  useEffect(() => {
    if (areaList.length === 0) {
      dispatch(getAreas());
    }
  }, [dispatch, areaList.length]);

  // style

  const headerContainer = {
    position: "absolute",
    top: "-4rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const cellColor = `	#D3D3D3`;

  const tableCell = {
    backgroundColor: cellColor,
    borderRadius: "1rem",
  };

  const tableCellBtn = {
    ...tableCell,
    verticalAlign: "middle",
    textAlign: "center",
    border: "3px solid whitesmoke",
  };

  const cellFirstColumn = {
    ...tableCell,
    minWidth: "300px",
    width: "70%",
    padding: "0.5rem",
    paddingLeft: "1.5rem",
    border: "3px solid whitesmoke",
  };

  const btn = {
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: "0.85rem",
    border: "none",
    backgroundColor: "transparent",
  };

  const btnDelete = {
    ...btn,
    color: "red",
  };

  const btnEdit = {
    ...btn,
    color: "#eef299",
  };

  const btnShowAreas = {
    border: "none",
    backgroundColor: "transparent",
    color: "white",
    fontWeight: "500",
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <>
      {loading || loadingActive ? (
        <Loader />
      ) : (
        <>
          {error ? <ErrorMessage msg={error} timeOut={TIME_AUT_ERROR} /> : null}
          {errorActive ? (
            <ErrorMessage msg={errorActive} timeOut={TIME_AUT_ERROR} />
          ) : null}
          <div style={{ position: "relative", marginTop: "3rem" }}>
            <div style={headerContainer}>
              <div
                style={{
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  backgroundImage: `linear-gradient(195deg, #747b8a 0%, #495361 100%)`,
                  width: "80%",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {t("AdminAreas_title")}
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link style={{ color: "white" }} to="add">
                    {t("btn_add_areas")}
                  </Link>

                  <button
                    style={btnShowAreas}
                    onClick={() => setActiveAreas(!activeAreas)}
                  >
                    {!activeAreas
                      ? t("btn_show_active_areas")
                      : t("btn_show_inactive_areas")}
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                overflowY: "auto",
                height: "500px",
                backgroundColor: "whitesmoke",
                padding: "2rem",
              }}
            >
              <table
                style={{
                  margin: "0",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ paddingLeft: "1rem" }}>
                      {t("AdminAreas_name")}
                    </th>
                    <th style={{ textAlign: "center" }}>
                      {t("AdminAreas_status")}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {success
                    ? areaList.map((area) => (
                        <tr key={area.id}>
                          <>
                            {area.is_active && activeAreas ? (
                              <td style={cellFirstColumn}>
                                <div
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  {area.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.85rem",
                                    fontWeight: "400",
                                  }}
                                >
                                  {area.city}, {area.street} {area.no_building}
                                </div>
                              </td>
                            ) : null}
                            {!area.is_active && !activeAreas ? (
                              <td style={tableCell}>
                                <div
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  {area.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.85rem",
                                    fontWeight: "400",
                                  }}
                                >
                                  {area.city}, {area.street} {area.no_building}
                                </div>
                              </td>
                            ) : null}
                            {area.is_active && activeAreas ? (
                              <td style={tableCellBtn}>
                                <span
                                  style={{
                                    color: "green",
                                    fontWeight: "500",
                                    textTransform: "uppercase",
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  <Icon
                                    icon="mdi:check-circle-outline"
                                    color="#093"
                                    width="24"
                                    height="24"
                                  />
                                </span>
                              </td>
                            ) : null}
                            {!area.is_active && !activeAreas ? (
                              <td style={tableCellBtn}>
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  <Icon
                                    icon="ph:x-circle-bold"
                                    color="red"
                                    width="24"
                                    height="24"
                                  />
                                </span>
                              </td>
                            ) : null}
                            {activeAreas && area.is_active ? (
                              <>
                                <td style={tableCellBtn}>
                                  <button
                                    style={btnDelete}
                                    onClick={() => unActiveHandler(area.id)}
                                  >
                                    {t("btn_unactive")}
                                  </button>
                                </td>
                                <td style={tableCellBtn}>
                                  <button
                                    style={btnEdit}
                                    onClick={() => editHandler(area.id)}
                                  >
                                    {t("btn_edit")}
                                  </button>
                                </td>
                              </>
                            ) : null}
                            {!activeAreas && !area.is_active ? (
                              <td style={tableCellBtn}>
                                <button
                                  style={btnDelete}
                                  onClick={() => activeHandler(area.id)}
                                >
                                  {t("btn_active")}
                                </button>
                              </td>
                            ) : null}
                          </>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminAreas;
