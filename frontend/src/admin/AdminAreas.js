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
import { activeBadge, inactiveBadge } from "./AdminCSS";
import TableComponent from "./TableComponent";
import InfoAlertComponent from "../component/InfoAlertComponent";

import {
  TIME_AUT_ERROR,
  TIME_AUT_SUCCESS,
} from "../constants/environmentConstans";

import {
  ADD_AREA_DELETE,
  GET_AREA_LIST_DELETE,
} from "../constants/areaConstans";

import { UNACTIVE, ACTIVE } from "../constants/adminConstans";

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
  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [areaId, setAreaId] = useState();
  const [updateStatus, setUpdateStatus] = useState("");

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
    navigate(`/dashboard/areas/edit/${id}`);
  };

  const activeHandler = (id) => {
    setShowAlert(true);
    setAreaId(id);
    setUpdateStatus(ACTIVE);
  };

  const unActiveHandler = (id) => {
    setShowAlert(true);
    setAreaId(id);
    setUpdateStatus(UNACTIVE);
  };

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
  };

  //USEEFFECT

  //status changer
  useEffect(() => {
    if (confirm && updateStatus === UNACTIVE) {
      dispatch(
        unOrActiveList({
          Id: areaId,
          active: false,
          userId: userInfo.id,
          objType: "AREA",
          kind: "Inactive area",
        })
      );
    }

    if (confirm && updateStatus === ACTIVE) {
      dispatch(
        unOrActiveList({
          Id: areaId,
          active: true,
          userId: userInfo.id,
          objType: "AREA",
          kind: "Active area",
        })
      );
    }
  }, [confirm, dispatch, updateStatus]);

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

  const tableCell = {
    borderBottom: "1.5px solid rgba(89, 131, 252, 1)",
    padding: "1rem",
  };

  const tableCellNoBorderRight = {
    ...tableCell,
    borderRight: "none",
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

  /************************ TABLE STYLE *****************************/

  const mainTableContainer = {
    overflowY: "auto",
    height: "500px",
    marginTop: "1rem",
  };

  const tableStyle = {
    width: "100%",
    color: "rgba(89, 131, 252, 1)",
    backgroundImage: `linear-gradient(134deg, rgba(255, 255, 255, 1) 0%, rgba(209, 209, 209, 1) 100%)`,
    marginTop: "1rem",
  };

  const styleHeader = {
    borderBottom: `3px solid rgba(89, 131, 252, 1)`,
    padding: "1rem",
  };

  /************************ TABLE PROPS *****************************/

  let currentStatusContactList = [];

  const activeAreaList = areaList.filter((item) => item.is_active === true);

  const unactiveAreaList = areaList.filter((item) => item.is_active === false);

  if (activeAreas) {
    currentStatusContactList = activeAreaList;
  } else {
    currentStatusContactList = unactiveAreaList;
  }

  const tableAreacolumns = [
    {
      key: "name",
      label: t("AdminAreas_name"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "status",
      label: t("AdminAreas_status"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "btnStatusChanger",
      label: "",
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
    {
      key: "btnEdit",
      label: "",
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
    {
      key: "btnShowMore",
      label: "",
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
  ];

  const dataAreaTable = currentStatusContactList.map((item) => ({
    id: item.id,
    name: `${item.name} ${item.city}, ${item.street} ${item.no_building}`,
    status: activeAreas ? (
      <span style={activeBadge}>{t("status_active")}</span>
    ) : (
      <span style={inactiveBadge}>{t("status_inactive")}</span>
    ),
    btnStatusChanger: activeAreas ? (
      <button onClick={() => unActiveHandler(item.id)}>
        {t("btn_unactive")}
      </button>
    ) : (
      <button onClick={() => activeHandler(item.id)}>{t("btn_active")}</button>
    ),
    btnEdit: activeAreas && (
      <button style={btnEdit} onClick={() => editHandler(item.id)}>
        {t("btn_edit")}
      </button>
    ),
    btnShowMore: activeAreas && (
      <Link to={`${item.id}/details`}>{t("btn_more")}</Link>
    ),
  }));

  //*****************************

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

          {showAlert && updateStatus === UNACTIVE && (
            <InfoAlertComponent
              confirmYes={confirmYes}
              confirmNo={confirmNo}
              context={t("Confirmation_alert_unactive_area")}
            />
          )}

          {showAlert && updateStatus === ACTIVE && (
            <InfoAlertComponent
              confirmYes={confirmYes}
              confirmNo={confirmNo}
              context={t("Confirmation_alert_active_area")}
            />
          )}

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

            <TableComponent
              data={dataAreaTable}
              columns={tableAreacolumns}
              tableStyle={tableStyle}
              mainTableContainer={mainTableContainer}
            />
          </div>
        </>
      )}
    </>
  );
}

export default AdminAreas;
