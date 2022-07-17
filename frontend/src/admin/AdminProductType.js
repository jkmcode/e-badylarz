import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";

function AdminProductType() {
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

  const loading = false;
  const error = false;

  useEffect(() => {}, []);

  return (
    <div className="bg-container p-4 rounded">
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <Col>
            <Link
              to="add"
              className="text-secondary d-flex justify-content-end"
            >
              {t("btn-add")}
            </Link>
          </Col>
          <div className="d-flex justify-content-center display-6">
            {t("AdminProductType_title")}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminProductType;
