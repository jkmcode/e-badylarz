import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import InfoWindow from "../component/infoWindow";
import { getFullDiscricts } from "../actions/discrictsActions";
import useBackToLogin from "../component/useBackToLogin";
import { Icon } from "@iconify/react";
import Divider from "./Divider";
import FormInput from "./FormInput";

import { addCiti } from "../actions/adminActions";
import AddDescription from "./AddDescription";
import {
  CITI_ADD_DELETE,
  CITY_DESCRIPTION,
  SET_FLAG_DESC_FALSE,
  TWO,
} from "../constants/adminConstans";

import { submitBtn, FormLayout } from "./AdminCSS";
import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";

function AddCity() {
  useBackToLogin();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const dscrictId = Number(params.id);

  const [values, setValues] = useState({
    cityName: "",
    postCode: "",
    latitude: "",
    longitude: "",
  });
  const [addDescription, setAddDescription] = useState(false);
  const [idNewDistrict, setIdNewDistrict] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit: addhandleSubmit,
    reset,
    trigger,
  } = useForm();

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dflag = useSelector((state) => state.flag);
  const { descFlag, addDescFlag } = dflag;

  const d2flag = useSelector((state) => state.windowFlag);
  const { windowFlag } = d2flag;

  const newCity = useSelector((state) => state.addCity);
  const { loading, error, success, result } = newCity;

  const discrictListRedux = useSelector((state) => state.districts);
  const {
    districtList,
    loading: descLoading,
    error: descError,
  } = discrictListRedux;

  const onSubmit = () => {
    const insertData = {
      name: values.cityName,
      creator: userInfo.id,
      post: values.postCode,
      lat: values.latitude,
      lng: values.longitude,
      desc_id: dscrictId,
    };
    dispatch(addCiti(insertData));
  };

  useEffect(() => {
    dispatch({ type: SET_FLAG_DESC_FALSE });
    dispatch({ type: CITI_ADD_DELETE });
  }, []);

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getFullDiscricts("only true"));
    }
  }, [dispatch, districtList.length]);

  useEffect(() => {
    if (addDescFlag) {
      navigate(`/dashboard/district/${dscrictId}/edit`);
    }
  }, [addDescFlag]);

  //styling

  const mainContainer = {
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: "0.5rem",
    padding: "1.5rem",
  };

  const geolocationTitle = {
    fontSize: "1rem",
    fontWeight: "500",
  };

  const title = {
    display: "flex",
    justifyContent: "center",
    fontSize: "calc(1.2rem + 1vw)",
    marginBottom: "1rem",
    marginTop: "1rem",
    textAlign: "center",
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: "1",
      name: "cityName",
      type: "text",
      placeholder: t("AddCiti_name_placeholder"),
      errorMessage: t("AddCiti_name_error_message"),
      label: t("AddCiti_label_name"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{3,50}$",
      required: true,
    },
    {
      id: "2",
      name: "postCode",
      type: "text",
      placeholder: t("AddCiti_post_code_placeholder"),
      errorMessage: t("AddCiti_post_code_error_message"),
      label: t("AddCiti_label_post_code"),
      pattern: "^[0-9]{2}-[0-9]{3}$",
      required: true,
    },
    {
      id: "3",
      name: "latitude",
      type: "text",
      placeholder: t("latitude_placeholder"),
      errorMessage: t("latitude_error_message"),
      label: t("label_latitude"),
      pattern: "^-?([1-8]\\d|90|[0-9])(\\.\\d+)?$",
      required: true,
    },
    {
      id: "4",
      name: "longitude",
      type: "text",
      placeholder: t("longitude_placeholder"),
      errorMessage: t("longitude_error_message"),
      label: t("label_longitude"),
      pattern: "^-?(180|1[0-7]\\d|[1-9]\\d|[1-9])(\\.\\d+)?$",
      required: true,
    },
  ];

  return (
    <>
      {loading || descLoading ? (
        <Loader />
      ) : (
        <div style={mainContainer}>
          {error ? (
            <ErrorMessage
              msg={error}
              timeOut={TIME_SET_TIMEOUT}
              variant="danger"
            />
          ) : null}
          {descError ? (
            <ErrorMessage
              msg={descError}
              timeOut={TIME_SET_TIMEOUT}
              variant="danger"
            />
          ) : null}
          {success ? (
            <ErrorMessage
              msg={t("AddCity_success")}
              timeOut={TIME_SET_TIMEOUT}
              variant="success"
              success={true}
            />
          ) : null}

          {addDescription ? (
            <InfoWindow
              title={t("Window_title")}
              body={t("AddCity_body_window")}
            />
          ) : null}
          <Link
            style={{
              color: "grey",
              textTransform: "uppercase",
              verticalAlign: "top",
            }}
            to={`/dashboard/district/${dscrictId}/edit`}
          >
            <Icon icon="material-symbols:arrow-back-ios" />
            {t("btn-return")}
          </Link>

          <div style={title}>
            {t("AddCiti_title")}
            {districtList.length === 0
              ? null
              : districtList.filter((i) => i.id === dscrictId)[0].name}
          </div>
          <form onSubmit={addhandleSubmit(onSubmit)}>
            <FormLayout col={TWO}>
              {inputs.map((input, index) => {
                if (index <= 1) {
                  return (
                    <FormInput key={input.id} {...input} onChange={onChange} />
                  );
                }
              })}
            </FormLayout>

            <Divider backgroundColor="gray" />
            <div style={geolocationTitle}>
              {t("AddShops_title_geolocation")}
            </div>
            <FormLayout col={TWO}>
              {inputs.map((input, index) => {
                if (index === 2 || index === 3) {
                  return (
                    <FormInput key={input.id} {...input} onChange={onChange} />
                  );
                }
              })}
            </FormLayout>

            <div style={{ display: "flex", justifyContent: "center" }}>
              {windowFlag ? null : (
                <button type="submit" style={submitBtn}>
                  {t("btn-add")}
                </button>
              )}
            </div>
          </form>
          {windowFlag ? (
            <AddDescription objId={idNewDistrict} descType={CITY_DESCRIPTION} />
          ) : null}
        </div>
      )}
    </>
  );
}

export default AddCity;
