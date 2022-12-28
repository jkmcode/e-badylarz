import React, { useEffect, useState } from "react";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
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
  const [isHover, setIsHover] = useState(false);

  let userLoginTest = localStorage.getItem("userInfo");

  let userLoginTestParse = JSON.parse(userLoginTest);

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
      if (userInfo.IsAdmin && userLoginTestParse) {
        navigate("/dashboard");
      } else {
        setPermission(NO_PERMISSION);
      }
    }
  }, [success]);

  //styling

  const container = {
    backgroundImage: `url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
    padding: "0",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: `center`,
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "50%",
    height: "100vh",
  };

  const formContainer = {
    position: "relative",
    backgroundColor: "white",
    borderRadius: "0.25rem",
    boxShadow: `0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)`,
  };

  const fromHeaderContainer = {
    padding: "1rem 2rem",
    position: "absolute",
    width: "100%",
    top: "-5rem",
  };

  const formHeader = {
    backgroundImage: `linear-gradient(195deg, #EC407A 0%, #D81B60 100%)`,
    boxShadow: `0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)`,
    borderRadius: `0.5rem`,
    padding: `1rem 0`,
    display: "flex",
    justifyContent: "center",
  };

  const formHeaderTitle = {
    color: "white",
    fontWeight: "700",
    fontSize: "1.5rem",
    textAlign: `center !important`,
  };

  const formInput = {
    display: "block",
    width: "100%",
    padding: "0.375rem 0.75rem",
    border: `1px solid #ced4da`,
    borderRadius: "0.25rem",
  };

  const fromBtn = {
    border: "none",
    backgroundColor: "transparent",
    boxShadow: isHover
      ? `0px 4px 14px -5px rgba(150, 21, 75, 1)`
      : `0px 4px 10px -5px rgba(150, 21, 75, 1)`,
    width: "100%",
    paddingTop: "0.4rem",
    paddingBottom: "0.4rem",
    borderRadius: "0.25rem",
    color: "rgb(236, 64, 122)",
    fontWeight: "500",
    textTransform: "uppercase",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  const formError = {
    color: "#F44335",
    fontStyle: "italic",
    fontSize: "0.75rem",
    marginTop: "0.1rem",
  };

  return (
    <>
      <main style={container}>
        <div style={{ width: "80%", maxWidth: "500px" }}>
          <div style={formContainer}>
            <div style={fromHeaderContainer}>
              <div style={formHeader}>
                <span style={formHeaderTitle}>ADMIN PANEL</span>
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              {error ? <ErrorMessage msg={error} timeOut={5000} /> : null}
              {permission ? (
                <ErrorMessage msg={permission} timeOut={5000} />
              ) : null}
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div controlid="userName" className="mb-3">
                  <label
                    htmlFor="username"
                    style={{ fontStyle: "italic", fontSize: "0.875rem" }}
                  >
                    {t("LoginScreen_label_username")}
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="focusInput"
                    style={formInput}
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
                  ></input>
                  {errors.userName && (
                    <div style={formError}>{errors.userName.message}</div>
                  )}
                </div>
                <div controlid="password">
                  <label
                    htmlFor="password"
                    style={{ fontStyle: "italic", fontSize: "0.875rem" }}
                  >
                    {t("LoginScreen_label_password")}
                  </label>
                  <input
                    type="password"
                    id="password"
                    style={formInput}
                    className="focusInput"
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
                  ></input>
                  {errors.password && (
                    <div style={formError}>{errors.password.message}</div>
                  )}
                </div>
                <div className="d-flex justify-content-center mt-4">
                  {loading ? (
                    <Loader />
                  ) : (
                    <button
                      type="submit"
                      style={fromBtn}
                      onMouseLeave={() => setIsHover(false)}
                      onMouseEnter={() => setIsHover(true)}
                    >
                      {t("btn-login")}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginAdmin;
