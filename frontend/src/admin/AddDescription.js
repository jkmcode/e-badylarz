import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import language from "../language";
import { getDesc } from "../actions/adminActions";
import BackToLogin from "./BackToLogin";
import { Icon } from "@iconify/react";
import {
  DISTRICT_ADD_DESC_DELETE,
  ADD_DESC_DELETE,
  SET_FLAG_DESC_FALSE,
  SET_FLAG_ADD_DESC_TRUE,
  SET_CITY_FLAG_DESC_FALSE,
} from "../constants/adminConstans";
import useResponsive from "../component/useResponsive";

import { USER_LOGOUT } from "../constants/userConstans";
import ErrorMessage from "../component/ErrorMessage";
import {
  CREDENTIALS_WERE_NOT_PROVIDED,
  NO_PERMISSION,
  TIME_SET_TIMEOUT,
} from "../constants/errorsConstants";

import Description from "./Description";

function AddDescription(props) {
  const {
    register,
    formState: { errors },
  } = useForm();
  const { windowWidth } = useResponsive();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // data from redux
  const districtDesc = useSelector((state) => state.addDistrictDesc);
  const { loading, success, desc, error } = districtDesc;

  const addDescription = useSelector((state) => state.addDesc);
  const {
    loading: addloading,
    success: addsuccess,
    error: adderror,
  } = addDescription;

  console.log("desc--->", desc)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [activeDesc, setActiveDesc] = useState(false);
  const [isAddDesc, setIsAddDesc] = useState(false);
  const [lngDesc, setLngDesc] = useState("");
  const [lngName, setLngName] = useState("");
  const [lngCode, setLngCode] = useState("");
  const [descText, setDescText] = useState("");

  const selectHandler = (e) => {
    dispatch({ type: DISTRICT_ADD_DESC_DELETE });
    setLngDesc(e.target.value);
    setActiveDesc(true);
    language.map((i) => {
      if (i.code == e.target.value) {
        setLngName(i.name);
        setLngCode(i.code);
      }
    });
  };

  // recognition adding or modification of description
  useEffect(() => {
    if (success & activeDesc) {
      if (desc.length < 1) {
        setIsAddDesc(true);
      } else {
        setDescText(desc[0].description);
      }
    }
  }, [desc, activeDesc]);

  // fetch description from DB

  useEffect(() => {
    if (activeDesc) {
      // console.log('type-->', props.descType)
      dispatch(
        getDesc({
          type: props.descType,
          lng: lngDesc,
          Id: props.objId,
        })
      );
    }
  }, [activeDesc]);

  useEffect(() => {
    if (addsuccess) {
      setTimeout(() => {
        if (props.return) {
          dispatch({ type: ADD_DESC_DELETE });
          navigate(props.path);
        } else {
          dispatch({ type: SET_FLAG_DESC_FALSE });
          dispatch({ type: ADD_DESC_DELETE });
          dispatch({ type: SET_FLAG_ADD_DESC_TRUE });
        }
      }, TIME_SET_TIMEOUT);
    }
  }, [addsuccess]);

  // back to login based on Error --- Authentication credentials were not provided
  useEffect(() => {
    if (error === CREDENTIALS_WERE_NOT_PROVIDED || error === NO_PERMISSION) {
      dispatch({ type: DISTRICT_ADD_DESC_DELETE });
      dispatch({ type: USER_LOGOUT });
      navigate("/login-admin");
    }
    if (error || adderror || addsuccess) {
      setTimeout(() => {
        setActiveDesc(false)
        dispatch({ type: SET_CITY_FLAG_DESC_FALSE });
      }, TIME_SET_TIMEOUT);
      // setActiveDesc(false)
      // dispatch({ type: SET_CITY_FLAG_DESC_FALSE });

    }
  }, [error, adderror, addsuccess]);

  //styling

  const mainContainer = {
    backgroundColor: "#fff",
    marginTop: "3rem",
    padding: windowWidth > 800 ? "1.5rem" : ".5rem",
    borderRadius: "0.25rem",
    width: "100%",
    margin: "auto",
    backgroundColor: "#F0F0F0",
  };

  //functions

  const handleCloseDesc = () => {
    dispatch({ type: SET_CITY_FLAG_DESC_FALSE });
  };

  return (
    <>
      <BackToLogin />
      {loading || addloading ? (
        <Loader />
      ) : (
        <div style={mainContainer}>
          {error ? (
            <ErrorMessage msg={error} timeOut={TIME_SET_TIMEOUT} />
          ) : null}
          {adderror ? (
            <ErrorMessage msg={adderror} timeOut={TIME_SET_TIMEOUT} />
          ) : null}
          {addsuccess ? (
            <ErrorMessage
              msg={t("DistrictAddDescription_success")}
              timeOut={TIME_SET_TIMEOUT}
              variant="success"
              success={true}
            />
          ) : null}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              style={{
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={handleCloseDesc}
            >
              <Icon icon="mdi:close-thick" width="32" height="32" color="red" />
            </button>
          </div>

          <form>
            {!activeDesc && !error ? (
              <>
                {t("DistrictAddDescription_choice_lng")}
                <div
                  style={{
                    position: "relative",
                    width: "80%",
                    margin: "auto",
                  }}
                >
                  <select
                    {...register("lng")}
                    onChange={selectHandler}
                    className="selectFrom"
                    style={{
                      width: "100%",
                      padding: "0.375rem 3rem 0.375rem 0.75rem",
                      border: "1px solid #ced4da",
                      borderRadius: "0.25rem",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="" hidden selected>
                      {t("DistrictAddDescription_option_placeholder")}
                    </option>
                    {language.map(({ code, name }) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      backgroundColor: "white",
                      border: "1px solid #ced4da",
                      width: "3rem",
                      height: "100%",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Icon
                        icon="material-symbols:keyboard-double-arrow-down"
                        width="24"
                      />
                    </div>
                  </span>
                </div>
              </>
            ) : (
              null
            )}
          </form>

          {activeDesc && (
            <>
              <p>{`${t("DistrictAddDescription_selected_lng")}: ${lngName}`}</p>
              <Description
                descText={descText}
                parentProps={props}
                getDesc={desc}
                lngDesc={lngCode}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default AddDescription;
