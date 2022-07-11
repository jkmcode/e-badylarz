import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";
import language from "../language";
import { getDesc } from "../actions/adminActions";
import BackToLogin from "./BackToLogin";
import {
  DISTRICT_ADD_DESC_DELETE,
  ADD_DESC_DELETE,
  SET_FLAG_DESC_FALSE,
  SET_FLAG_ADD_DESC_TRUE,
} from "../constants/adminConstans";

import { USER_LOGOUT } from "../constants/userConstans";

import {
  CREDENTIALS_WERE_NOT_PROVIDED,
  INVALID_TOKEN,
  NO_PERMISSION,
  TIME_SET_TIMEOUT,
} from "../constants/errorsConstants";

import Description from "./Description";

function AddDescription(props) {
  const {
    register,
    formState: { errors },
    // handleSubmit,
    // reset,
    // trigger,
  } = useForm();

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
      dispatch(
        getDesc({
          id: userInfo.id,
          lng: lngDesc,
          Id: props.objId,
          type: props.descType,
        })
      );
    }
  }, [activeDesc]);

  useEffect(() => {
    if (addsuccess) {
      setTimeout(() => {
        dispatch({ type: SET_FLAG_DESC_FALSE });
        dispatch({ type: ADD_DESC_DELETE });
        dispatch({ type: SET_FLAG_ADD_DESC_TRUE });     
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
  }, [error]);

  return (
    <>
      <BackToLogin />
      {loading || addloading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={4000} /> : null}
          {adderror ? <ErrorMessage msg={adderror} timeOut={4000} /> : null}
          {addsuccess ? <ErrorMessage msg={t("DistrictAddDescription_success")} timeOut={4000} variant='success'  success={true}/> : null}
          <Form>
            <Form.Group>
              <Row>
                <Col>
                  {!activeDesc ? (
                    <>
                      {t("DistrictAddDescription_choice_lng")}
                      <Form.Select
                        name="lng"
                        {...register("lng")}
                        onChange={selectHandler}
                      >
                        <option key="blankChoice" hidden value="0" />

                        {language.map(({ code, name }) => (
                          <option key={code} value={code}>
                            {name}
                          </option>
                        ))}
                      </Form.Select>
                    </>
                  ) : (
                    <p>{`${t(
                      "DistrictAddDescription_selected_lng"
                    )} ${lngName}`}</p>
                  )}
                </Col>
              </Row>
            </Form.Group>
          </Form>

          {activeDesc && (
            <>
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
