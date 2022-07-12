import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Table, Button, Row, Col } from "react-bootstrap";

import { getDiscrict } from "../actions/discrictsActions";

import AddDescription from "./AddDescription";

import {
  DISCTRICT_DESCRIPTION,
  SET_FLAG_DESC_TRUE,
  SET_FLAG_DESC_FALSE,
} from "../constants/adminConstans";

function EditDistrict() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const districtId = Number(params.id);

  const [addDescr, setAddDescr] = useState(false);

  // data from redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const dflag = useSelector((state) => state.flag);
  const { descFlag } = dflag;

  const descrHandler = () => {
    setAddDescr(true);
    dispatch({ type: SET_FLAG_DESC_TRUE });
  };

  const addCitiHandler = () => {
    navigate(`/add-city/${districtId}/add`);
  };

  const citisHandler = () => {
    console.log("działa--->");
    // setAddDescr(true);
    // dispatch({ type: SET_FLAG_DESC_TRUE });
  };

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getDiscrict());
    }
  }, [dispatch, districtList.length]);

  useEffect(() => {
    dispatch({ type: SET_FLAG_DESC_FALSE });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          <Link to="/dashboard/district/district" className="text-secondary">
            {t("btn-return")}
          </Link>
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <div className=" d-flex justify-content-center display-6">
            <div className="px-3">{t("EditDistrict_title")}</div>
            {districtList.length === 0
              ? null
              : districtList.filter((i) => i.id === districtId)[0].name}
          </div>
          <Row>
            <Col>
              <Button
                variant="success"
                className="btn-sm d-flex"
                onClick={() => descrHandler()}
              >
                {t("btn_add_description")}
              </Button>
            </Col>
            <Col>
              <Button
                variant="info"
                className="btn-sm d-flex"
                onClick={() => citisHandler()}
              >
                {t("btn_citis")}
              </Button>
            </Col>
            <Col>
              <Button
                variant="info"
                className="btn-sm d-flex"
                onClick={() => addCitiHandler()}
              >
                {t("btn_add_citi")}
              </Button>
            </Col>
          </Row>
          {addDescr & descFlag ? (
            <AddDescription
              objId={districtId}
              descType={DISCTRICT_DESCRIPTION}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default EditDistrict;
