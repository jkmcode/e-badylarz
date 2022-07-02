import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Table, Button, Row, Col } from "react-bootstrap";

import { getDiscrict } from "../actions/discrictsActions";

import DistrictAddDescription from "./DistrictAddDescription";

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

  const descrHandler = () => {
    setAddDescr(true);
  };

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getDiscrict());
    }
  }, [dispatch, districtList.length]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <div className=" d-flex justify-content-center display-6">
            <div className="px-3">{t("EditDistrict_title")}</div>

            {districtList.length === 0
              ? null
              : districtList.filter((i) => i.id === districtId)[0].name}
          </div>
          <Button
            variant="success"
            className="btn-sm d-flex"
            onClick={() => descrHandler()}
          >
            {t("btn_add_description")}
          </Button>
          {addDescr ? <DistrictAddDescription districtId={districtId} /> : null}
        </div>
      )}
    </>
  );
}

export default EditDistrict;
