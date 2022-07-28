import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
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

  const [active, setActive] = useState(false);

  //  handle function
  const activeHandler = (id) => {
    setActive(true);
  };

  const unActiveHandler = (id) => {
    setActive(false);
  };

  // fech data from Redux
  const areaListRedux = useSelector((state) => state.areaList);
  const { loading, areaList, error, success } = areaListRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // fetching list of area from DB
  useEffect(() => {
    //if (areaList.length === 0) {
    dispatch(getAreas());
    //}
  }, [dispatch]);

  // style
  const btnDelete = {
    backgroundColor: "transparent",
    border: "none",
    fontWeight: "bold",
  };

  return (
    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
      <div className="bg-gradient-secondary shadow-secondary border-radius-lg pt-4 pb-3">
        <h3 className="text-white text-capitalize text-center ps-3">
          Areas list
        </h3>
        <div className="d-flex justify-content-between">
          <Link className="text-white text-capitalize ps-3" to="add">
            {t("btn_add_shop")}
          </Link>
        </div>
      </div>
      <div className="card-body px-0 pb-2">
        <div className="table-responsive p-0">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7">
                  Author
                </th>
                <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-7">
                  Status
                </th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex px-2 py-1">
                    <div className="d-flex flex-column justify-content-center">
                      <p className="mb-0 h6">John Michael</p>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center">
                  <span className="badge badge-sm text-danger">Offline</span>
                </td>
                <td className="text-center">
                  {active ? (
                    <button
                      style={btnDelete}
                      className="text-xs text-danger pe-3"
                      onClick={() => unActiveHandler()}
                    >
                      {t("btn_unactive")}
                    </button>
                  ) : (
                    <button
                      style={btnDelete}
                      className="text-xs text-danger pe-3"
                      onClick={() => activeHandler()}
                    >
                      {t("btn_active")}
                    </button>
                  )}
                  <Link to={`/edit`} className="text-xs text-warning">
                    {t("btn_edit")}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex px-2 py-1">
                    <div></div>
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">Alexa Liras</h6>
                      <p className="text-xs text-secondary mb-0">
                        alexa@creative-tim.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center">
                  <span className="badge badge-sm text-success">ONLINE</span>
                </td>
                <td className="text-center">
                  {active ? (
                    <button
                      style={btnDelete}
                      className="text-xs text-danger pe-3"
                      onClick={() => unActiveHandler()}
                    >
                      {t("btn_unactive")}
                    </button>
                  ) : (
                    <button
                      style={btnDelete}
                      className="text-xs text-danger pe-3"
                      onClick={() => activeHandler()}
                    >
                      {t("btn_active")}
                    </button>
                  )}
                  <Link to={`/edit`} className="text-xs text-warning">
                    {t("btn_edit")}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminAreas;
