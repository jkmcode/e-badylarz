import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";
import useBackToLogin from "../component/useBackToLogin";
import { FormLayout } from "./AdminCSS";
import FormInput from "./FormInput";

import { addArea, getAreaToEdit } from "../actions/areaAction";

import { ADD_AREA_DELETE, TIME_AUT } from "../constants/areaConstans";
import { GET_AREA_LIST_DELETE } from "../constants/areaConstans";

import {
  TIME_AUT_ERROR,
  TIME_AUT_SUCCESS,
} from "../constants/environmentConstans";

import { TWO, THREE } from "../constants/adminConstans";
import {
  NUMBERS_AND_NATIONAL_LETTERS,
  NIP_FORMAT,
  BANK_ACCOUNT_FORMAT,
  GPS_FORMAT,
} from "../constants/formValueConstans";

import { Icon } from "@iconify/react";

function AddArea() {
  useBackToLogin();
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

  const editAreaParam = params.edit;
  const addAreaParam = params.add;
  const Id = params.id;

  const [successFlag, setSuccessFlag] = useState(false);
  const [values, setValues] = useState({
    shopArea: "",
    nip: "",
    city: "",
    street: "",
    number: "",
    postCode: "",
    post: "",
    latitude: "",
    longitude: "",
  });

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addArea12 = useSelector((state) => state.areaActivity);
  const { loading, success, error } = addArea12;

  const getArea = useSelector((state) => state.areaToEdit);
  const {
    loading: loadingAreaToEdit,
    success: successAreaToEdit,
    error: errorAreaToEdit,
    area,
  } = getArea;

  const onSubmit = (data) => {
    if (addAreaParam === "add") {
      dispatch(
        addArea({
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          nip: data.nip,
          number: data.number,
          post: data.post,
          postCode: data.postCode,
          street: data.street,
          creator: userInfo.id,
          bankAccount: data.bankAccount,
          add: true,
        })
      );
    } else {
      dispatch(
        addArea({
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          nip: data.nip,
          number: data.number,
          post: data.post,
          postCode: data.postCode,
          street: data.street,
          creator: userInfo.id,
          bankAccount: data.bankAccount,
          add: false,
          id: Id,
        })
      );
    }
  };

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  // normalize function
  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 39)
        .toUpperCase() || ""
    );
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccessFlag(true);
        dispatch({ type: ADD_AREA_DELETE });
      }, TIME_AUT);
    }
  }, [success]);

  useEffect(() => {
    if (addAreaParam === "edit") {
      dispatch(getAreaToEdit(Id));
    }
  }, []);

  useEffect(() => {
    if (successFlag) {
      navigate("/dashboard/areas");
    }
  }, [successFlag]);

  const inputs = [
    {
      id: "1",
      name: "AreaName",
      type: "text",
      placeholder: t("AreaActivity_name_placeholder"),
      errorMessage: t("AreaActivity_name_error_message"),
      label: t("AreaActivity_label_name"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{3,50}$",
      defaultValue:
        addAreaParam === "add"
          ? ""
          : successAreaToEdit && addAreaParam === "edit" && area.name,
      required: true,
    },
    {
      id: "2",
      name: "nip",
      type: "text",
      placeholder: t("nip_placeholder"),
      errorMessage: t("nip_error_message"),
      label: t("nip_label"),
      pattern: "^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$",
      defaultValue:
        addAreaParam === "add"
          ? ""
          : successAreaToEdit && addAreaParam === "edit" && area.nip,
      required: true,
    },
    {
      id: "3",
      name: "city",
      type: "text",
      placeholder: t("city_placeholder"),
      errorMessage: t("city_error_message"),
      label: t("city_label"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{3,16}$",
      defaultValue: successAreaToEdit && addAreaParam === "edit" && area.city,
      required: true,
    },
    {
      id: "4",
      name: "street",
      type: "text",
      placeholder: t("street_placeholder"),
      errorMessage: t("street_error_message"),
      label: t("street_label"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{3,50}$",
      defaultValue: successAreaToEdit && addAreaParam === "edit" && area.street,
      required: true,
    },
    {
      id: "5",
      name: "number",
      type: "text",
      placeholder: t("number_placeholder"),
      errorMessage: t("number_error_message"),
      label: t("number_label"),
      pattern: "^[0-9A-Z]+(-[0-9]+)?(/[0-9]+(-[0-9]+)?)*$",
      defaultValue:
        successAreaToEdit && addAreaParam === "edit" && area.no_building,
      required: true,
    },
    {
      id: "6",
      name: "postCode",
      type: "text",
      placeholder: t("postCode_placeholder"),
      errorMessage: t("postCode_error_message"),
      label: t("postCode_label"),
      pattern: "^[0-9]{2}-[0-9]{3}$",
      defaultValue:
        successAreaToEdit && addAreaParam === "edit" && area.post_code,
      required: true,
    },
    {
      id: "7",
      name: "post",
      type: "text",
      placeholder: t("AddShops_post_placeholder"),
      errorMessage: t("AddShops_post_error_message"),
      label: t("AddShops_label_post"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,50}$",
      defaultValue: successAreaToEdit && addAreaParam === "edit" && area.post,
      required: true,
    },
    {
      id: "8",
      name: "bankAccount",
      type: "tel",
      placeholder: t("bankAccound_placeholder"),
      errorMessage: t("bankAccound_error_message"),
      label: t("bankAccound_label"),
      pattern:
        "^PL[0-9]{2} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$",
      defaultValue:
        successAreaToEdit && addAreaParam === "edit" && area.bank_account,
      required: true,
    },
    {
      id: "9",
      name: "latitude",
      type: "text",
      placeholder: t("latitude_placeholder"),
      errorMessage: t("latitude_error_message"),
      label: t("label_latitude"),
      pattern: "^-?([1-8]\\d|90|[0-9])(\\.\\d+)?$",
      defaultValue:
        successAreaToEdit && addAreaParam === "edit" && area.latitude,
      required: true,
    },
    {
      id: "10",
      name: "longitude",
      type: "text",
      placeholder: t("longitude_placeholder"),
      errorMessage: t("longitude_error_message"),
      label: t("label_longitude"),
      pattern: "^-?(180|1[0-7]\\d|[1-9]\\d|[1-9])(\\.\\d+)?$",
      defaultValue:
        successAreaToEdit && addAreaParam === "edit" && area.longitude,
      required: true,
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={TIME_AUT_ERROR} /> : null}
          {errorAreaToEdit ? (
            <ErrorMessage msg={errorAreaToEdit} timeOut={TIME_AUT_ERROR} />
          ) : null}

          {success ? (
            <ErrorMessage
              msg={
                addAreaParam === "add"
                  ? t("AddArea_success")
                  : t("EditArea_success")
              }
              timeOut={TIME_AUT_SUCCESS}
              variant="success"
              success={true}
            />
          ) : null}
          <Row className="align-items-center ">
            <Col>
              <Link to="/dashboard/areas" className="text-dark h6">
                <Icon icon="ion:arrow-back" />
                {t("btn-return")}
              </Link>
            </Col>
          </Row>
          <div className="d-flex justify-content-center display-6">
            {editAreaParam === "edit"
              ? t("AreaActivity_EditAreas_title")
              : t("AreaActivity_AddAreas_title")}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout col={TWO}>
              {inputs.map((input, index) => {
                if (index <= 1) {
                  return (
                    <FormInput key={input.id} {...input} onChange={onChange} />
                  );
                }
              })}
            </FormLayout>
            <hr />
            <h6>{t("AreaActivity_title_address")}</h6>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AreaActivity_label_city")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.city ? "formInvalid" : null}
                    placeholder={t("AreaActivity_city_placeholder")}
                    {...register("city", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: NUMBERS_AND_NATIONAL_LETTERS,
                        message: t("Form_letters_pl_and_digits"),
                      },
                      minLength: {
                        value: 3,
                        message: t("Form_minLength_3"),
                      },
                      maxLength: {
                        value: 30,
                        message: t("Form_maxLength_30"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("city");
                    }}
                    name="city"
                  ></Form.Control>
                  {errors.city && (
                    <div className="text-danger form-msg-style">
                      {errors.city.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="street">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AreaActivity_label_street")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.street ? "formInvalid" : null}
                    placeholder={t("AreaActivity_street_placeholder")}
                    {...register("street", {
                      pattern: {
                        value: NUMBERS_AND_NATIONAL_LETTERS,
                        message: t("Form_letters_pl_and_digits"),
                      },
                      minLength: {
                        value: 3,
                        message: t("Form_minLength_3"),
                      },
                      maxLength: {
                        value: 30,
                        message: t("Form_maxLength_30"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("street");
                    }}
                    name="street"
                  ></Form.Control>
                  {errors.street && (
                    <div className="text-danger form-msg-style">
                      {errors.street.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6} md={4}>
                <Form.Group controlId="number">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AreaActivity_label_number")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.number ? "formInvalid" : null}
                    placeholder={t("AreaActivity_number_placeholder")}
                    {...register("number", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: NUMBERS_AND_NATIONAL_LETTERS,
                        message: t("Form_letters_pl_and_digits"),
                      },
                      maxLength: {
                        value: 30,
                        message: t("Form_maxLength_30"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("number");
                    }}
                    name="number"
                  ></Form.Control>
                  {errors.number && (
                    <div className="text-danger form-msg-style">
                      {errors.number.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="postCode">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AreaActivity_label_postCode")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.postCode ? "formInvalid" : null}
                    placeholder={t("AreaActivity_postCode_placeholder")}
                    {...register("postCode", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: t("Post_code_validate"),
                        message: t("Form_post_code"),
                      },
                      minLength: {
                        value: 5,
                        message: t("Form_minLength_5"),
                      },
                      maxLength: {
                        value: 10,
                        message: t("Form_maxLength_10"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("postCode");
                    }}
                    name="postCode"
                  ></Form.Control>
                  {errors.postCode && (
                    <div className="text-danger form-msg-style">
                      {errors.postCode.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="post">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AreaActivity_label_post")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.post ? "formInvalid" : null}
                    placeholder={t("AreaActivity_post_placeholder")}
                    {...register("post", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: NUMBERS_AND_NATIONAL_LETTERS,
                        message: t("Form_letters_pl_and_digits"),
                      },
                      minLength: {
                        value: 3,
                        message: t("Form_minLength_3"),
                      },
                      maxLength: {
                        value: 30,
                        message: t("Form_maxLength_30"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("post");
                    }}
                    name="post"
                  ></Form.Control>
                  {errors.post && (
                    <div className="text-danger form-msg-style">
                      {errors.post.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Form.Group controlId="bankAccount">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AreaActivity_label_bankAccound")}
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    className={errors.bankAccount ? "formInvalid" : null}
                    placeholder={t("AreaActivity_bankAccound_placeholder")}
                    ref={register}
                    {...register("bankAccount", {
                      onChange: (event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCardNumber(value);
                      },
                      required: t("Form_field_required"),
                      pattern: {
                        value: BANK_ACCOUNT_FORMAT,
                        message: t("Form_IBAN"),
                      },
                      minLength: {
                        value: 21,
                        message: t("Form_minLength_15"),
                      },
                      maxLength: {
                        value: 40,
                        message: t("Form_maxLength_34"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("bankAccount");
                    }}
                    name="bankAccount"
                  ></Form.Control>
                  {errors.bankAccount && (
                    <div className="text-danger form-msg-style">
                      {errors.bankAccount.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <h6>{t("AreaActivity_title_geolocation")}</h6>
            <Row>
              <Col md={6}>
                <Form.Group controlId="latitude">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AreaActivity_label_latitude")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.latitude ? "formInvalid" : null}
                    placeholder={t("AreaActivity_latitude_placeholder")}
                    {...register("latitude", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: GPS_FORMAT,
                        message: t("Form_only_digits_or_dot"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("latitude");
                    }}
                    name="latitude"
                  ></Form.Control>
                  {errors.latitude && (
                    <div className="text-danger form-msg-style">
                      {errors.latitude.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="longitude">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AreaActivity_label_longitude")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.longitude ? "formInvalid" : null}
                    placeholder={t("AreaActivity_longitude_placeholder")}
                    {...register("longitude", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: GPS_FORMAT,
                        message: t("Form_only_digits_or_dot"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("longitude");
                    }}
                    name="longitude"
                  ></Form.Control>
                  {errors.longitude && (
                    <div className="text-danger form-msg-style">
                      {errors.longitude.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              {editAreaParam === "edit" ? (
                <Button
                  type="submit"
                  variant="warning"
                  className="rounded my-3 "
                >
                  {t("btn-change")}
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="success"
                  className="rounded my-3 "
                >
                  {t("btn-add")}
                </Button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddArea;
