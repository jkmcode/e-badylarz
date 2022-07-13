import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";

import { getCitiesList }  from "../actions/adminActions"

function CitiesList(props) {


  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // data from redux
  const dataRedux = useSelector((state) => state.districts);
  const { loading, citiesList, error, success } = dataRedux;

  useEffect(() => {
    if (!success ) {
      dispatch(getCitiesList({
        Id:props.Id
      }));
    }
  }, [dispatch, success]);

  useEffect(() => {}, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
        </div>
      )}
    </>
  );
}

export default CitiesList;
