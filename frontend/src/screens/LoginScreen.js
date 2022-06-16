import React, { useState, useEffect } from "react";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";

function LoginScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const onSubmit = (data) => {
    const credentials = {
      username: data.userName,
      password: data.password,
    };
    dispatch(login(credentials));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <div className="d-flex justify-content-center display-6">
            {t("LoginScreen_title")}
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="userName">
              <Form.Label className="form-msg-style ms-2">
                {t("LoginScreen_label_username")}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t("LoginScreen_username_placeholder")}
                {...register("userName", {
                  required: t("Form_field_required"),
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: t("Form_only_letters"),
                  },
                  minLength: {
                    value: 6,
                    message: t("Form_minLength_6"),
                  },
                })}
                onKeyUp={() => {
                  trigger("userName");
                }}
                name="userName"
              ></Form.Control>
              {errors.userName && (
                <div className="text-danger form-msg-style">
                  {errors.userName.message}
                </div>
              )}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="form-msg-style ms-2">
                {t("LoginScreen_label_password")}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={t("LoginScreen_password_placeholder")}
                {...register("password", {
                  required: t("Form_field_required"),
                  minLength: {
                    value: 8,
                    message: t("Form_minLength_8"),
                  },
                })}
                onKeyUp={() => {
                  trigger("password");
                }}
                name="password"
              ></Form.Control>
              {errors.password && (
                <div className="text-danger form-msg-style">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                variant="success"
                className="rounded my-3 d-flex justify-content-end"
              >
                {t("btn-login")}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export default LoginScreen;
