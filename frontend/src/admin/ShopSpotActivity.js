import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import { getFullDiscricts } from "../actions/discrictsActions";
import ErrorMessage from "../component/ErrorMessage";
import { getCitiesList } from "../actions/adminActions";
import {
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import {
  addShopSpot,
  getShop,
  getSpot,
  updateShopSpot,
  InsertImage,
} from "../actions/adminActions";

import UploadImage from "../component/UploadImage";

import {
  DELETE_IMAGE_REDUX,
  SET_FLAG_IMAGE_TRUE,
  GET_SHOPS_LIST_DELETE,
  ADD_SHOP_SPOT_DELETE,
} from "../constants/adminConstans";

import {
  TIME_AUT_ERROR,
  TIME_AUT_SUCCESS
} from "../constants/environmentConstans"

import {
  NUMBERS_AND_NATIONAL_LETTERS,
  ONLY_NUMBER,
  GPS_FORMAT
} from "../constants/formValueConstans"

import { Icon } from "@iconify/react";

function AddShopsSpot() {
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

  const [showShop, setShowShop] = useState(false);
  const [space, setSpace] = useState("  ");

  const zero = "0";
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);

  const SpotParam = params.add;
  const editShopParam = params.edit;
  const shopId = params.id;
  const spotId = params.idSpot;

  console.log('SpotParam-->', SpotParam, "spot", spotId)
  console.log('editShopParam-->', editShopParam, "shopId", shopId)

  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: t("Radio_own_collection"), value: "1" },
    { name: t("Radio_delivery"), value: "0" },
  ];

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const shopListRedux = useSelector((state) => state.shopList);
  const {
    loading: loadingShopList,
    error: errorShopList,
    successAdd,
    shopList
  } = shopListRedux;

  const spotRedux = useSelector((state) => state.getShopSpot);
  const {
    spotDetails,
    success: successGetSpot,
    loading: spotLoading,
    error: spotError,
  } = spotRedux;

  const addSpotRedux = useSelector((state) => state.shopSpotsList);
  const {
    successAdd: successAddSpot,
    loading: addSpotLoading,
    error: addSpotError,
  } = addSpotRedux;

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

  // **********************************************************
  const discrictListRedux = useSelector((state) => state.districts);
  const {
    loading: loadingDisctrict,
    districtList,
    error: errorDisctrict,
    success: successDisctric
  } = discrictListRedux;

  const shopSpotUpdateRedux = useSelector((state) => state.shopSpotUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = shopSpotUpdateRedux;

  const dataRedux = useSelector((state) => state.citesList);
  // const { loading, citiesList, error, success } = dataRedux;
  const { loading: loadingCity, citiesList, success, error: errorCity } = dataRedux;

  const selectDistrictHandler = (e) => {
    //console.log('Jestem-->')
    setSelectedDistrict(e.target.value);
  }
  const selectCityHandler = (e) => {
    //console.log('Jestem-->')
    setSelectedCity(e.target.value);
  }

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getFullDiscricts("only active"));
    }
  }, [dispatch, districtList.length,]);

  // uruchamiany gdy jest wybrany powiat
  useEffect(() => {
    if (selectedDistrict) {
      dispatch(
        getCitiesList({
          Id: selectedDistrict,
          param: "only true"
        })
      );
    }
  }, [dispatch, selectedDistrict]);
  // *********************************************************

  // Handlers
  const onSubmit = (data) => {
    setCurrentTaxNo(data.nip);
    if (SpotParam === "add") {
      // dispatch({ type: SET_FLAG_IMAGE_TRUE });
      // if radioValue = 1 without range - not delivery
      if (radioValue === "1") {
        const insertData = {
          add: true,
          id_shops: shopId,
          name: data.name,
          city: data.city,
          street: data.street,
          no_building: data.number,
          postCode: data.postCode,
          post: data.post,
          latitude: data.latitude,
          longitude: data.longitude,
          creator: userInfo.id,
          is_active: "True",
          delivery: "False",
          range: "0",
        };
        dispatch(addShopSpot(insertData));
      } else {
        const insertData = {
          add: true,
          id_shops: shopId,
          name: data.name,
          city: data.city,
          street: data.street,
          no_building: data.number,
          postCode: data.postCode,
          post: data.post,
          latitude: data.latitude,
          longitude: data.longitude,
          creator: userInfo.id,
          is_active: "True",
          delivery: "True",
          range: data.range,
        };
        dispatch(addShopSpot(insertData));
      }
    } else {
      //   dispatch({ type: SET_FLAG_IMAGE_TRUE });
      //   dispatch({ type: GET_SHOPS_LIST_DELETE });
      if (radioValue === "1") {
        const insertData = {
          add: false,
          id_spot: spotId,
          id_shops: shopId,
          name: data.name,
          city: data.city, /// To jest źle
          street: data.street,
          no_building: data.number,
          postCode: data.postCode,
          post: data.post,
          latitude: data.latitude,
          longitude: data.longitude,
          creator: userInfo.id,
          is_active: "True",
          delivery: "False",
          range: "0",
        };
        dispatch(updateShopSpot(insertData));
      } else {
        const insertData = {
          add: false,
          id_spot: spotId,
          id_shops: shopId,
          name: data.name,
          city: data.city, /// To jest źle
          street: data.street,
          no_building: data.number,
          postCode: data.postCode,
          post: data.post,
          latitude: data.latitude,
          longitude: data.longitude,
          creator: userInfo.id,
          is_active: "True",
          delivery: "True",
          range: data.range,
        };
        dispatch(updateShopSpot(insertData));
      }
    }
  };

  // fetch data from DB -- shop & spot to edit
  // remove old image
  useEffect(() => {
    dispatch({ type: DELETE_IMAGE_REDUX });
    if (shopId) {
      dispatch(getShop({ Id: shopId }));
      setImageRender(true);
    }
    if (spotId) {
      dispatch(getSpot({ Id: spotId }));
    }
  }, []);

  //Reset Default data
  useEffect(() => {
    if (successGetSpot) {
      setShowShop(true);  /// to do sprawdzenia nie wiem czy to potrzebne ?
      if (SpotParam === "edit") {
        if (spotDetails.delivery) {
          setRadioValue("0");
        } else {
          setRadioValue("1");
        }
        reset({
          name: spotDetails.name,
          nip: spotDetails.nip,
          city: spotDetails.city.name,
          street: spotDetails.street,
          number: spotDetails.no_building,
          postCode: spotDetails.post_code,
          post: spotDetails.post,
          range: spotDetails.range,
          latitude: spotDetails.latitude,
          longitude: spotDetails.longitude,
        });
      } else {
        reset({});
      }
    }
  }, [successGetSpot]);

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

  // NIE WIEM CZY TO POTRZEBNE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // navigate to ShopAdmin
  useEffect(() => {
    if (successAddSpot) {
      dispatch({ type: ADD_SHOP_SPOT_DELETE });
      navigate(`/dashboard/shops/${shopId}/contact`);
    }
  }, [dispatch, successAddSpot]);

  // // navigate to ShopAdmin
  // useEffect(() => {
  //   if (successAdd && !isImage && shopImageFlag) {
  //     navigate("/dashboard/shops/shops");
  //   } else if (successAdd && isImage && successInsertImage && shopImageFlag) {
  //     navigate("/dashboard/shops/shops");
  //   } else if (successUpdateShop && !isImage && shopImageFlag) {
  //     navigate("/dashboard/shops/shops");
  //   } else if (
  //     successUpdateShop &&
  //     isImage &&
  //     successInsertImage &&
  //     shopImageFlag
  //   ) {
  //     navigate("/dashboard/shops/shops");
  //   }
  // }, [successAdd, isImage, successInsertImage, successUpdateShop]);

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

      {loadingDisctrict || loadingCity || loadingShopList ||
        // nie sprawdzone
        loadingInsertImage ||
        loadingGetShop ||
        loadingUpdateShop ||
        spotLoading ||
        addSpotLoading ? (
        <Loader />
      ) : (
        <div className="container mt-5 p-4 rounded" style={background}>
          {errorShopList ? <ErrorMessage msg={errorShopList} timeOut={TIME_AUT_ERROR} /> : null}
          {errorDisctrict ? <ErrorMessage msg={errorDisctrict} timeOut={TIME_AUT_ERROR} /> : null}
          {errorCity ? <ErrorMessage msg={errorCity} timeOut={TIME_AUT_ERROR} /> : null}
          {spotError ? <ErrorMessage msg={spotError} timeOut={TIME_AUT_ERROR} /> : null}
          {addSpotError ? <ErrorMessage msg={addSpotError} timeOut={TIME_AUT_ERROR} /> : null}
          {errorUpdate ? <ErrorMessage msg={errorUpdate} timeOut={TIME_AUT_ERROR} /> : null}
          <Row className="align-items-center ">
            <Col>
              <Link
                to={{ pathname: `/dashboard/shops/${shopId}/contact` }}
                className="text-dark h6"
              >
                <Icon icon="ion:arrow-back" />
                {t("btn-return")}
              </Link>
            </Col>
          </Row>
          {showShop ? (
            <div className="d-flex justify-content-center display-8">
              {shopDetails.name},{space}
              {shopDetails.city},
              {space}
              {shopDetails.street}
              {space}
              {shopDetails.no_building}
            </div>
          ) : null}
          <div className="d-flex justify-content-center display-6">
            {SpotParam === "edit"
              ? t("ShopsSpot_Edit_title")
              : t("ShopsSpot_Add_title")}
          </div>
          <hr />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={5}>
                <Form.Group controlId="name">
                  <Form.Label className="form-msg-style ms-2">
                    {t("ShopsSpot_label_name")}
                  </Form.Label>
                  <Form.Control
                    className={errors.name ? "formInvalid" : null}
                    type="text"
                    placeholder={t("ShopsSpot_name_placeholder")}
                    ref={register}
                    {...register("name", {
                      required: t("Form_field_required"),
                      pattern: {
                        value: NUMBERS_AND_NATIONAL_LETTERS,
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

              <Col md={4}>
                <ButtonGroup className="mb-2">
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "outline-danger" : "outline-success"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
              <Col md={3}>
                {radioValue === "0" ? (
                  <Form.Group controlId="range">
                    <Form.Label className="form-msg-style ms-2">
                      {t("ShopsSpot_label_range")}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={errors.range ? "formInvalid" : null}
                      placeholder={t("ShopsSpot_range_placeholder")}
                      {...register("range", {
                        required: t("Form_field_required"),
                        pattern: {
                          value: ONLY_NUMBER,
                          message: t("Form_only_letters"),
                        },
                        maxLength: {
                          value: 14,
                          message: t("Form_maxLength_14"),
                        },
                      })}
                      onKeyUp={() => {
                        trigger("range");
                      }}
                      name="range"
                    ></Form.Control>
                    {errors.range && (
                      <div className="text-danger form-msg-style">
                        {errors.range.message}
                      </div>
                    )}
                  </Form.Group>
                ) : null}
              </Col>
            </Row>
            <hr />
            <h6>{t("ShopsSpot_title_address")}</h6>
            <Row className="mb-3">
              <Col mg={4}>
                <Form.Label className="form-msg-style ms-2">
                  {t("ShopsSpot_label_district")}
                </Form.Label>
                <Form.Select
                  name="district"
                  {...register("district")}
                  onChange={selectDistrictHandler}
                  value={selectedDistrict}
                >
                  <option key="blankChoice" hidden value={zero}>
                    {t("ShopSpot_district_placeholder")}
                  </option>
                  {districtList.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col mg={4}>
                <Form.Label className="form-msg-style ms-2">
                  {t("ShopsSpot_label_city")}
                </Form.Label>
                <Form.Select
                  name="city"
                  {...register("city")}
                  onChange={selectCityHandler}
                  value={selectedCity}
                >
                  <option key="blankChoice" hidden value={zero}>
                    {t("ShopSpot_city_placeholder")}
                  </option>
                  {success ? citiesList.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  )) : null}
                </Form.Select>
              </Col>
              {/* <Col md={6}>
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
              </Col> */}
              <Col md={4}>
                <Form.Group controlId="street">
                  <Form.Label className="form-msg-style ms-2">
                    {t("AddShops_label_street")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.street ? "formInvalid" : null}
                    placeholder={t("AddShops_street_placeholder")}
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
                    {t("AddShops_label_number")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.number ? "formInvalid" : null}
                    placeholder={t("AddShops_number_placeholder")}
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
                        value: NUMBERS_AND_NATIONAL_LETTERS,
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
            <h6>{t("ShopsSpot_title_geolocation")}</h6>
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
                    {t("AddShops_label_longitude")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={errors.longitude ? "formInvalid" : null}
                    placeholder={t("AddShops_longitude_placeholder")}
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
              {SpotParam === "edit" ? (
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

export default AddShopsSpot;
