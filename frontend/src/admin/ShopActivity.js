import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";
import { addShop, getShop, updateShop } from "../actions/adminActions";
import UploadImage from "../component/UploadImage";

import { Icon } from "@iconify/react";

function AddShops() {
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

  const [uploading, setUploading] = useState(false);
  const [render, setRender] = useState(false);

  const editShopParam = params.edit;
  const addShopParam = params.add;
  const shopId = params.id;

  console.log("addShopParam", addShopParam);

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addShopInfo = useSelector((state) => state.addShop);
  const { loading, error, success } = addShopInfo;

  const getShopRedux = useSelector((state) => state.getShop);
  const { shopDetails } = getShopRedux;

  // Rozwiązanie dodania zdjęcia po dodaniu do bazy sklepu.
  // Musimy w pierwszej kolejności dostać success na true z Redux (addShopInfo)
  // a potem za pomocą UseEffecta uruchomimy kolejną funkcje (action) z odpowiednimi Content-Type dla image
  const uploadFilesHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // const { data } = await axios.post(
      //   "/api/products/upload/",
      //   formData,
      //   config
      // );
      // setMsg(true);
      // setImage(data.image);
      // setUploading(false);
      // setMsgTextUpload(data.text);
    } catch (error) {
      //setUploading(false);
      console.log("aaaaaa");
    }
  };

  const onSubmit = (data) => {
    if (addShopParam) {
      dispatch(
        addShop({
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          nip: data.nip,
          number: data.number,
          photo: data.photo,
          post: data.post,
          postCode: data.postCode,
          street: data.street,
          creator: userInfo.id,
        })
      );
    } else {
      dispatch(
        updateShop({
          id: shopId,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          nip: data.nip,
          number: data.number,
          photo: data.photo,
          post: data.post,
          postCode: data.postCode,
          street: data.street,
          creator: userInfo.id,
          typeOfChnage: "Edit date",
        })
      );
    }
  };

  // fetch data from DB -- shop to edit
  useEffect(() => {
    if (shopId) {
      dispatch(
        getShop({
          Id: shopId,
        })
      );
    }
  }, []);

  //style

  const background = {
    backgroundColor: "rgba(231, 231, 235, 1)",
    backgroundImage:
      "linear-gradient(322deg, rgba(233, 243, 250, 1) 35%, rgba(161, 174, 205, 1) 100%)",
    boxShadow: "-9px 8px 34px -13px rgba(66, 68, 90, 1)",
  };

  const formInvalid = {
    borderColor: "red",
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-5 p-4 rounded" style={background}>
          {error ? <ErrorMessage msg={error} timeOut={4000} /> : null}
          <Row className="align-items-center ">
            <Col>
              <Link to="/dashboard/shops/shops" className="text-dark h6">
                <Icon icon="ion:arrow-back" />
                {t("btn-return")}
              </Link>
            </Col>
          </Row>
          <div className="d-flex justify-content-center display-6">
            {editShopParam === "edit"
              ? t("EditShops_title")
              : t("AddShops_title")}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AddShops_label_name")}
                  </Form.Label>
                  <Form.Control
                    className={errors.name ? "formInvalid" : null}
                    type="text"
                    placeholder={t("AddShops_name_placeholder")}
                    defaultValue={
                      editShopParam === "edit" && shopDetails
                        ? shopDetails.name
                        : null
                    }
                    {...register("name", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ ]+$/,
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
              </Col>

              <Col md={6}>
                <Form.Group controlId="nip">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AddShops_label_nip")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.nip ? "formInvalid" : null}
                    placeholder={t("AddShops_nip_placeholder")}
                    defaultValue={
                      editShopParam === "edit" && shopDetails
                        ? shopDetails.nip
                        : null
                    }
                    {...register("nip", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[0-9 ]+$/,
                        message: t("Form_only_digits_or_space"),
                      },
                    })}
                    onKeyUp={() => {
                      trigger("nip");
                    }}
                    name="nip"
                  ></Form.Control>
                  {errors.nip && (
                    <div className="text-danger form-msg-style">
                      {errors.nip.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <h6>{t("AddShops_title_address")}</h6>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AddShops_label_city")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.city ? "formInvalid" : null}
                    placeholder={t("AddShops_city_placeholder")}
                    defaultValue={
                      editShopParam === "edit" && shopDetails
                        ? shopDetails.city
                        : null
                    }
                    {...register("city", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ ]+$/,
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
                    {t("AddShops_label_street")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.street ? "formInvalid" : null}
                    placeholder={t("AddShops_street_placeholder")}
                    defaultValue={
                      editShopParam === "edit" && shopDetails
                        ? shopDetails.street
                        : null
                    }
                    {...register("street", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ ]+$/,
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
            <Row>
              <Col xs={6} md={4}>
                <Form.Group controlId="number">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AddShops_label_number")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.number ? "formInvalid" : null}
                    placeholder={t("AddShops_number_placeholder")}
                    defaultValue={
                      editShopParam === "edit" && shopDetails
                        ? shopDetails.no_building
                        : null
                    }
                    {...register("number", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ/ ]+$/,
                        message: t("Form_letters_pl_and_digits"),
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
                    {t("AddShops_label_postCode")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.postCode ? "formInvalid" : null}
                    placeholder={t("AddShops_postCode_placeholder")}
                    defaultValue={
                      editShopParam === "edit" && shopDetails
                        ? shopDetails.post_code
                        : null
                    }
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
                    {t("AddShops_label_post")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.post ? "formInvalid" : null}
                    placeholder={t("AddShops_post_placeholder")}
                    defaultValue={
                      editShopParam === "edit" && shopDetails
                        ? shopDetails.post
                        : null
                    }
                    {...register("post", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ/ ]+$/,
                        message: t("Form_letters_pl_and_digits"),
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
            <h6>{t("AddShops_title_geolocation")}</h6>
            <Row>
              <Col md={6}>
                <Form.Group controlId="latitude">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AddShops_label_latitude")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.latitude ? "formInvalid" : null}
                    placeholder={t("AddShops_latitude_placeholder")}
                    defaultValue={
                      editShopParam === "edit" && shopDetails
                        ? shopDetails.latitude
                        : null
                    }
                    {...register("latitude", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[0-9.]+$/,
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
                    {t("AddShops_label_longitude")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.longitude ? "formInvalid" : null}
                    placeholder={t("AddShops_longitude_placeholder")}
                    defaultValue={
                      editShopParam === "edit" && shopDetails
                        ? shopDetails.longitude
                        : null
                    }
                    {...register("longitude", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[0-9.]+$/,
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
            <Row>
              <Col>
                {/* <Form.Group
                  controlId="photo"
                  className="btn-img-upload rounded mb-3"
                  onChange={uploadFilesHandler}
                >
                  <Form.Label>
                    {t("AdminAddProducts_label_choose_photos")}
                  </Form.Label>
                  <Form.Control type="file" {...register("photo", {})} />
                </Form.Group> */}
                <UploadImage />
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              {editShopParam === "edit" ? (
                <Button
                  type="submit"
                  variant="warning"
                  className="rounded my-3 "
                >
                  {t("btn_edit")}
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
          </Form>
        </div>
      )}
    </>
  );
}

export default AddShops;
