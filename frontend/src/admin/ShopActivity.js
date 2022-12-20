import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form } from "react-bootstrap";
import {
  addShop,
  getShop,
  updateShop,
  InsertImage,
} from "../actions/adminActions";
import UploadImage from "../component/UploadImage";
import useBackToLogin from "../component/useBackToLogin";

import {
  DELETE_IMAGE_REDUX,
  SET_FLAG_IMAGE_TRUE,
  GET_SHOPS_LIST_DELETE,
} from "../constants/adminConstans";

import { Icon } from "@iconify/react";

function AddShops() {
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

  const [uploading, setUploading] = useState(false);
  const [imageRender, setImageRender] = useState(false);
  const [currentTaxNo, setCurrentTaxNo] = useState("");

  const editShopParam = params.edit;
  const addShopParam = params.add;

  const shopId = params.id;

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const shopListRedux = useSelector((state) => state.shopList);
  const { loading, error, successAdd, shopList } = shopListRedux;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  const insertImageRedux = useSelector((state) => state.insertImage);
  const { successInsertImage, loadingInsertImage } = insertImageRedux;

  const imageFlag = useSelector((state) => state.flag);
  const { shopImageFlag } = imageFlag;

  const updateShopRedux = useSelector((state) => state.updateShop);
  const { loading: loadingUpdateShop, success: successUpdateShop } =
    updateShopRedux;

  const getShopRedux = useSelector((state) => state.getShop);
  const {
    loading: loadingGetShop,
    shopDetails,
    success: successGetShop,
  } = getShopRedux;

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

  // Handlers
  const onSubmit = (data) => {
    setCurrentTaxNo(data.nip);
    if (addShopParam) {
      dispatch({ type: SET_FLAG_IMAGE_TRUE });
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
          bankAccount: data.bankAccount,
        })
      );
    } else {
      dispatch({ type: SET_FLAG_IMAGE_TRUE });
      dispatch({ type: GET_SHOPS_LIST_DELETE });
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
          bankAccount: data.bankAccount,
          typeOfChnage: "Edit date",
        })
      );
      if (isImage) {
        dispatch(
          InsertImage({ imageUpload: imageUpload, taxNo: currentTaxNo })
        );
      }
    }
  };

  // fetch data from DB -- shop to edit
  // remove old image
  useEffect(() => {
    dispatch({ type: DELETE_IMAGE_REDUX });
    if (shopId) {
      dispatch(
        getShop({
          Id: shopId,
        })
      );
      setImageRender(true);
    }
  }, []);

  //Reset Default data
  useEffect(() => {
    if (successGetShop) {
      reset({
        name: shopDetails.name,
        nip: shopDetails.nip,
        city: shopDetails.city,
        street: shopDetails.street,
        number: shopDetails.no_building,
        postCode: shopDetails.post_code,
        post: shopDetails.post,
        bankAccount: shopDetails.bank_account,
        latitude: shopDetails.latitude,
        longitude: shopDetails.longitude,
      });
    }
  }, [successGetShop]);

  // set current Tax Number
  useEffect(() => {
    if (successAdd) {
      shopList.map((value) => {
        if (value.nip === currentTaxNo) {
          if (isImage) {
            dispatch(
              InsertImage({ imageUpload: imageUpload, taxNo: currentTaxNo })
            );
          }
        }
      });
    }
  }, [successAdd]);

  // navigate to ShopAdmin
  useEffect(() => {
    if (successAdd && !isImage && shopImageFlag) {
      navigate("/dashboard/shops/shops");
    } else if (successAdd && isImage && successInsertImage && shopImageFlag) {
      navigate("/dashboard/shops/shops");
    } else if (successUpdateShop && !isImage && shopImageFlag) {
      navigate("/dashboard/shops/shops");
    } else if (
      successUpdateShop &&
      isImage &&
      successInsertImage &&
      shopImageFlag
    ) {
      navigate("/dashboard/shops/shops");
    }
  }, [successAdd, isImage, successInsertImage, successUpdateShop]);

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
      {loading || loadingInsertImage || loadingGetShop || loadingUpdateShop ? (
        <Loader />
      ) : (
        <div className="container mt-5 p-4 rounded" style={background}>
          {error ? <ErrorMessage msg={error} timeOut={4000} /> : null}
          <Row className="align-items-center ">
            <Col>
              <Link to="/dashboard/shops" className="text-dark h6">
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
                    ref={register}
                    {...register("name", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ.@ ]+$/,
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
                    {...register("city", {
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
                    {...register("street", {
                      // required: t("Form_field_required"),
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
                    {t("AddShops_label_number")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.number ? "formInvalid" : null}
                    placeholder={t("AddShops_number_placeholder")}
                    {...register("number", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ/ ]+$/,
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
                    {t("AddShops_label_postCode")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.postCode ? "formInvalid" : null}
                    placeholder={t("AddShops_postCode_placeholder")}
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
                    {t("AddShops_label_bankAccound")}
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    className={errors.bankAccount ? "formInvalid" : null}
                    placeholder={t("AddShops_bankAccound_placeholder")}
                    ref={register}
                    {...register("bankAccount", {
                      onChange: (event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCardNumber(value);
                      },
                      required: t("Form_field_required"),
                      pattern: {
                        value: /^[A-Za-z0-9 ]+$/,
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
                <UploadImage nip={currentTaxNo} />
              </Col>
              {imageRender
                ? editShopParam === "edit" &&
                  shopDetails.photo !== null && (
                    <Col>
                      <img src={shopDetails.photo} />
                    </Col>
                  )
                : null}
            </Row>
            <div className="d-flex justify-content-end">
              {editShopParam === "edit" ? (
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
          </Form>
        </div>
      )}
    </>
  );
}

export default AddShops;
