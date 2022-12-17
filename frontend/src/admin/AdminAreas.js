import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import { unOrActiveList } from "../actions/adminActions";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";
import { getAreas } from "../actions/adminActions";

function AdminAreas() {
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

  //  handle function
  const activeHandler = (id) => {
    //setActive(true);
  };

  const unActiveHandler = (id) => {
    //setActiveAreas(false);
    console.log("!!!!!!!!!!!!!!!!!!", id);
    dispatch(
      unOrActiveList({
        Id: id,
        active: false,
        userId: userInfo.id,
        // objType: SHOP_DESCRIPTION,
        objType: "area",
        kind: "Active shop",
      })
    );
  };

  // fech data from Redux
  const areaListRedux = useSelector((state) => state.areaList);
  const { loading, areaList, error, success } = areaListRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // fetching list of area from DB
  useEffect(() => {
    if (areaList.length === 0) {
      dispatch(getAreas());
    }
  }, [dispatch, areaList.length]);

  // style
  const btnDelete = {
    backgroundColor: "transparent",
    border: "none",
    fontWeight: "bold",
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
      {loading ? (
        <Loader />
      ) : (
        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div className="d-flex justify-content-between"></div>
          <div className="bg-gradient-secondary shadow-secondary border-radius-lg pt-4 pb-3">
            <Link className="text-white text-capitalize ps-3" to="add">
              {t("btn_add_areas")}
            </Link>
            <h3 className="text-white text-capitalize text-center ps-3">
              {t("AdminAreas_title")}
            </h3>
            <button
              style={btnShowAreas}
              onClick={() => setActiveAreas(!activeAreas)}
            >
              {!activeAreas
                ? t("btn_show_active_areas")
                : t("btn_show_inactive_areas")}
            </button>
          </div>
          <div className="card-body px-0 pb-2">
            <div className="table-responsive p-0">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7">
                      {t("AdminAreas_name")}
                    </th>
                    <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-7">
                      {t("AdminAreas_status")}
                    </th>
                    <th className="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  {success
                    ? areaList.map((area) => (
                        <tr key={area.id}>
                          <>
                            {area.is_active && activeAreas ? (
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <>
                                      <h6 className="mb-0 text-sm">
                                        {area.name}
                                      </h6>
                                      <p className="text-xs text-secondary mb-0">
                                        {area.city}, {area.street}{" "}
                                        {area.no_building}
                                      </p>
                                    </>
                                  </div>
                                </div>
                              </td>
                            ) : null}
                            {!area.is_active && !activeAreas ? (
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <>
                                      <h6 className="mb-0 text-sm">
                                        {area.name}
                                      </h6>
                                      <p className="text-xs text-secondary mb-0">
                                        {area.city}, {area.street}{" "}
                                        {area.no_building}
                                      </p>
                                    </>
                                  </div>
                                </div>
                              </td>
                            ) : null}
                            {area.is_active && activeAreas ? (
                              <td className="align-middle text-center">
                                <span className="badge badge-sm text-success">
                                  ONLINE
                                </span>
                              </td>
                            ) : null}
                            {!area.is_active && !activeAreas ? (
                              <td className="align-middle text-center">
                                <span className="badge badge-sm text-success">
                                  ONLINE
                                </span>
                              </td>
                            ) : null}
                            {activeAreas && area.is_active ? (
                              <td className="text-center">
                                <button
                                  style={btnDelete}
                                  className="text-xs text-danger pe-3"
                                  onClick={() => unActiveHandler(area.id)}
                                >
                                  {t("btn_unactive")}
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
        </div>
      )}
    </>
  );
}

export default AdminAreas;
