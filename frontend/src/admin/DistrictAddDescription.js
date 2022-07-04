import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";
import language from "../language";
import { addDiscrictDesc, getDiscrictDesc } from "../actions/adminActions";
import BackToLogin from "./BackToLogin";
import { DISTRICT_ADD_DESC_DELETE } from "../constants/adminConstans";
import { USER_LOGOUT } from "../constants/userConstans";

import {
  CREDENTIALS_WERE_NOT_PROVIDED,
  INVALID_TOKEN,
  NO_PERMISSION,
} from "../constants/errorsConstants";

function DistrictAddDescription(props) {
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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [activeDesc, setActiveDesc] = useState(false);
  const [isAddDesc, setIsAddDesc] = useState(false);
  const [lngDesc, setLngDesc] = useState("");
  const [lngName, setLngName] = useState("");
  const [lngCode, setLngCode] = useState("");

  const onSubmit = (data) => {
    console.log("działa submit formularza", data.desc);
    console.log("kod-->",lngCode)
    console.log("id-->",userInfo.id)
    console.log("type", props.descType)
    dispatch(
      addDiscrictDesc({
      id: userInfo.id,
      addDesc: isAddDesc,
      objType: props.descType,
      objId : props.objId,
      lng: lngCode,
      desc: data.desc
    }))


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
  // recognition adding or modification of description
  useEffect(() => {
    if (success) {
      if (desc.language===null){
        setIsAddDesc(true)
      }
    }

  }, [desc]);

  // fetch description from DB
  useEffect(() => {
    if (lngDesc) {
      dispatch(
        getDiscrictDesc({
          id: userInfo.id,
          lng: lngDesc,
          Id: props.objId,
          type: props.descType
        })
      );
    }
  }, [lngDesc]);

  // back to login based on Error --- Authentication credentials were not provided
  useEffect(() => {
    if (error === CREDENTIALS_WERE_NOT_PROVIDED || error === NO_PERMISSION) {
      console.log("error", error);
      dispatch({ type: DISTRICT_ADD_DESC_DELETE });
      dispatch({ type: USER_LOGOUT });
      navigate("/login-admin");
    }
  }, [error]);

  //districtList.filter((i) => i.id === districtId)[0].name;

  return (
    <>
      <BackToLogin />
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={4000} /> : null}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Row>
                <Col>
                  {!lngDesc ? (
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
                    <p>{`${t("DistrictAddDescription_selected_lng")} ${lngName}`}</p>
                  )}
                </Col>
              </Row>
            </Form.Group>
            {activeDesc && (
              <>
                <Form.Group controlId="desc">
                  <Form.Label className="form-msg-style ms-2">
                    {t("DistrictAddDescription_label_desc")}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder={t("DistrictAddDescription_placeholder_desc")}
                    {...register("desc", {
                      maxLength: {
                        value: 255,
                        message: t("Form_maxLength_255"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("desc");
                    }}
                    name="desc"
                  ></Form.Control>
                  {errors.desc && (
                    <div className="text-danger form-msg-style">
                      {errors.desc.message}
                    </div>
                  )}
                </Form.Group>
                <Button
                  type="submit"
                  variant="success"
                  className="rounded my-3 w-50"
                >
                  {t("btn_submit")}
                </Button>
              </>
            )}
          </Form>
        </div>
      )}
    </>
  );
}

export default DistrictAddDescription;
