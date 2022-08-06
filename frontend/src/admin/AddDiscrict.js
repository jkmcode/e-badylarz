import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";

import { addDiscrict } from "../actions/adminActions";
import AddDescription from "./AddDescription";
import {
  DISTRICT_ADD_DELETE,
  DISTRICT_DELETE,
  DISCTRICT_DESCRIPTION,
  SET_FLAG_DESC_FALSE,
  SET_FLAG_DESC_TRUE,
  SET_FLAG_ADD_DESC_FALSE,
  SET_FLAG_ADD_DESC_TRUE,
} from "../constants/adminConstans";

import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";

function AddDiscrict() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nextDesc, setNextDesc] = useState(false);
  const [idNewDistrict, setIdNewDistrict] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit: addhandleSubmit,
    reset,
    trigger,
  } = useForm();

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dflag = useSelector((state) => state.flag);
  const { descFlag, addDescFlag } = dflag;

  const newDistrict = useSelector((state) => state.addDistrict);
  const { loading, error, success, district } = newDistrict;

  const onSubmit = (data) => {
    const insertData = {
      name: data.name,
      creator: userInfo.id,
    };
    dispatch(addDiscrict(insertData));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        if (window.confirm(t("AddDiscrict_window_confirm"))) {
          setNextDesc(true);
          setIdNewDistrict(district[0].id);
          dispatch({ type: SET_FLAG_DESC_TRUE });
          dispatch({ type: DISTRICT_ADD_DELETE });
          dispatch({ type: DISTRICT_DELETE });
        } else {
          dispatch({ type: DISTRICT_ADD_DELETE });
          dispatch({ type: DISTRICT_DELETE });
          dispatch({ type: SET_FLAG_ADD_DESC_TRUE });
        }
      }, TIME_SET_TIMEOUT);
    }
  }, [navigate, success]);

  useEffect(() => {
    dispatch({ type: SET_FLAG_DESC_FALSE });
    dispatch({ type: DISTRICT_ADD_DELETE });
  }, []);

  useEffect(() => {
    if (addDescFlag) {
      navigate("/dashboard/district/district");
    }
  }, [addDescFlag]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? (
            <ErrorMessage msg={error} timeOut={1000} variant="danger" />
          ) : null}
          {success ? (
            <ErrorMessage
              msg={t("AddDiscrict_success")}
              timeOut={4000}
              variant="success"
              success={true}
            />
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
          <Form onSubmit={addhandleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label className="form-msg-style ms-2">
                {t("AddDistrict_label_name")}
              </Form.Label>
              <Form.Control
                type="text"
                className={errors.name ? "formInvalid" : null}
                placeholder={t("AddDistrict_name_placeholder")}
                {...register("name", {
                  required: t("Form_field_required"),
                  pattern: {
                    value: /^[A-Za-z1-9ąćĆęłŁńóżŻźŹ ]+$/,
                    message: t("Form_letters_pl_and_digits"),
                  },
                  minLength: {
                    value: 6,
                    message: t("Form_minLength_6"),
                  },
                  maxLength: {
                    value: 30,
                    message: t("Form_maxLength_30"),
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
              {nextDesc ? null : (
                <Button
                  type="submit"
                  variant="success"
                  className="rounded my-3 "
                >
                  {t("btn-add")}
                </Button>
              )}
            </div>
          </Form>
          {nextDesc & descFlag ? (
            <AddDescription
              objId={idNewDistrict}
              descType={DISCTRICT_DESCRIPTION}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default AddDiscrict;
