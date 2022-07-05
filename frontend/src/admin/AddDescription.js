import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";
import language from "../language";
import { addDesc, getDesc } from "../actions/adminActions";
import BackToLogin from "./BackToLogin";
import {
  DISTRICT_ADD_DESC_DELETE,
  ADD_DESC_DELETE,
} from "../constants/adminConstans";
import { USER_LOGOUT } from "../constants/userConstans";

import {
  CREDENTIALS_WERE_NOT_PROVIDED,
  INVALID_TOKEN,
  NO_PERMISSION,
} from "../constants/errorsConstants";

import Description from "./Description";

function AddDescription(props) {
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

  const onSubmit = (data) => {
    console.log("działa submit formularza", data);
    console.log("id opisu -->", desc[0].id);
    dispatch(
      addDesc({
        id: userInfo.id,
        addDesc: isAddDesc,
        objType: props.descType,
        objId: props.objId,
        lng: lngCode,
        desc: data.desc,
        descId: desc[0].id,
      })
    );
  };

  const selectHandler = (e) => {
    setLngDesc(e.target.value);
    setActiveDesc(true);
    language.map((i) => {
      if (i.code == e.target.value) {
        setLngName(i.name);
        setLngCode(i.code);
      }
    });
  };
  // delete old state
  useEffect(() => {
    dispatch({ type: DISTRICT_ADD_DESC_DELETE });
    dispatch({ type: ADD_DESC_DELETE });

    console.log("kontrola kasowanie stanów po --->", desc);
  }, []);

  // add or modify OK, go to call page
  useEffect(() => {
    if (addsuccess) {
      dispatch({ type: DISTRICT_ADD_DESC_DELETE });
      dispatch({ type: ADD_DESC_DELETE });
      console.log("Sukces");
      navigate(`/dashboard/district/district/${props.objId}/edit`);
    }
  }, [addsuccess]);

  // recognition adding or modification of description
  useEffect(() => {
    //if (success & activeDesc) {
    if (success) {
      if (desc.length < 1) {
        setIsAddDesc(true);
      } else {
        console.log("test opisu-->", desc[0].description);
        setDescText(desc[0].description);
      }
    }
  }, [desc, activeDesc]);

  // fetch description from DB
  useEffect(() => {
    if (activeDesc) {
      console.log("kontrola-->", activeDesc, "-->", descText);
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

  // back to login based on Error --- Authentication credentials were not provided
  useEffect(() => {
    if (error === CREDENTIALS_WERE_NOT_PROVIDED || error === NO_PERMISSION) {
      dispatch({ type: DISTRICT_ADD_DESC_DELETE });
      dispatch({ type: USER_LOGOUT });
      navigate("/login-admin");
    }
  }, [error]);

  //districtList.filter((i) => i.id === districtId)[0].name;

  return (
    <>
      <BackToLogin />
      {loading || addloading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={4000} /> : null}
          {adderror ? <ErrorMessage msg={adderror} timeOut={4000} /> : null}
          <p>{descText}</p>
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
                        //defaultValue={{ value: "pl" }}
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
              <Description descText={descText} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default AddDescription;
