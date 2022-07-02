import React, { useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";

import { addDiscrict } from "../actions/adminActions";
import {
  DISTRICT_ADD_DELETE,
  DISTRICT_DELETE,
} from "../constants/adminConstans";

function AddDiscrict() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newDistrict = useSelector((state) => state.addDistrict);
  const { loading, error, success } = newDistrict;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log("działa onSubmit", data);
    const insertData = {
      name: data.name,
    };
    dispatch(addDiscrict(insertData));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: DISTRICT_ADD_DELETE });
      dispatch({ type: DISTRICT_DELETE });
      navigate("/admin/district");
    }
  }, [navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? (
            <ErrorMessage msg={error} timeOut={1000} variant="danger" />
          ) : null}
          <Row className="align-items-center">
            <Col>
              <Link
                to="/dashboard/district/district"
                className="text-secondary"
              >
                {t("btn-return")}
              </Link>
            </Col>
          </Row>
          <div className="d-flex justify-content-center display-6">
            {t("AddDiscrict_title")}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label className="form-msg-style ms-2">
                {t("AddDistrict_label_name")}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t("AddDistrict_name_placeholder")}
                {...register("name", {
                  required: t("Form_field_required"),
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: t("Form_only_letters"),
                  },
                  minLength: {
                    value: 2,
                    message: t("Form_minLength_6"),
                  },
                })}
                onKeyUp={() => {
                  trigger("name");
                }}
                name="name"
              ></Form.Control>
              {errors.name && (
                <div className="text-danger form-msg-style">
                  {errors.name.message}
                </div>
              )}
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="success" className="rounded my-3 ">
                {t("btn-add")}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export default AddDiscrict;
