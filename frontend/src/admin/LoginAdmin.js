import React, { useEffect, useState } from "react";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../actions/userAction";

import { NO_PERMISSION } from "../constants/errorsConstants";

function LoginAdmin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success, userInfo } = userLogin;

  const [permission, setPermission] = useState("");

  const onSubmit = (data) => {
    const credentials = {
      username: data.userName,
      password: data.password,
    };
    reset();
    dispatch(login(credentials));
  };

  useEffect(() => {
    if (success) {
      if (userInfo.IsAdmin) {
        navigate("/dashboard");
      } else {
        setPermission(NO_PERMISSION);
      }
    }
  }, [success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="main-content mt-0">
          <div
            className="page-header align-items-start bg-height z-index--1"
            style={{
              backgroundImage: `url(
            "https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
          )`,
            }}
          >
            <div className="container my-auto">
              <div className="row">
                <div className="col-lg-4 col-md-8 col-12 mx-auto">
                  <div className="card z-index-0 fadeIn3 fadeInBottom">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                        <h4 className="text-white font-weight-bolder text-center my-2">
                          ADMIN PANEL
                        </h4>
                      </div>
                    </div>
                    <div className="mt-3">
                      {error ? (
                        <ErrorMessage msg={error} timeOut={5000} />
                      ) : null}
                      {permission ? (
                        <ErrorMessage msg={permission} timeOut={5000} />
                      ) : null}
                    </div>

                    <div className="card-body">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="userName" className="mb-3">
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

                        <div className="d-flex justify-content-center mt-4">
                          <Button
                            type="submit"
                            className="text-primary text-gradient font-weight-bold w-100"
                          >
                            {t("btn-login")}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default LoginAdmin;
