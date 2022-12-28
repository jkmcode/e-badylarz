import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCitiesList } from "../actions/adminActions";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";

function LocationFormScreen() {
  const navigate = useNavigate();
  const zero = "0";
  const [disabledField, setDisabledField] = useState(true);
  const [districRequired, setDistricRequired] = useState(false);
  const [cityRequired, setCityRequired] = useState(false);
  const [cityFlag, setCityFlag] = useState(false);
  const [locationMsg, setLocaionMsg] = useState("");
  const [selectedCiti, setSelectedCiti] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(0);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  // data from redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { districtList } = discrictListRedux;

  const dataRedux = useSelector((state) => state.citesList);
  const { loading, citiesList, error, success } = dataRedux;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    if (selectedDistrict === 0) {
      setDistricRequired(true);
    } else {
      setDistricRequired(false);
    }

    if (selectedCiti === 0) {
      setCityRequired(true);
    } else {
      setCityRequired(false);
    }

    if (selectedDistrict !== 0 && selectedCiti !== 0) {
      localStorage.setItem("selectedCity", JSON.stringify(selectedCiti));
      navigate("/main-page");
    }
  };

  const selectDistrictHandler = (e) => {
    setDisabledField(false);
    setDistricRequired(false);
    setSelectedDistrict(e.target.value);
    setCityFlag(false);
  };

  const selectCitiHandler = (e) => {
    setSelectedCiti(e.target.value);
    setLocaionMsg("");
  };

  const clearHandler = () => {
    setCityRequired(false);
    setDistricRequired(false);
    setSelectedCiti(0);
    setSelectedDistrict(0);
  };

  // uruchamiany gdy jest wybrany powiat
  useEffect(() => {
    if (selectedDistrict) {
      dispatch(
        getCitiesList({
          Id: selectedDistrict,
          param: "only true",
        })
      );
    }
  }, [dispatch, selectedDistrict]);

  // uruchamiany gdy jest wybrany powiat i zwrócona lista miejscowosci
  // dla tego powiatu
  useEffect(() => {
    if (success) {
      setCityFlag(true);
    }
  }, [success]);

  const infoMsg = {
    backgroundColor: "#EAFEE1",
    marginTop: "0.5rem",
    color: "#1A5E02",
    borderRadius: "10px",
  };

  const errorMsg = {
    backgroundColor: "#FFE1E1",
    marginTop: "1rem",
    color: "#AE1D1D",
    borderRadius: "10px",
  };

  const searchAreaBtn = {
    color: "white",
    backgroundColor: "#207B00",
    borderRadius: "20px",
    border: "none",
  };

  const clearBtn = {
    display: "center",
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "green",
    borderColor: "transparent",
    borderRadius: "1rem",
    color: "white",
    textTransform: "capitalize",
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? <ErrorMessage msg={error} timeOut={4000} /> : null}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button onClick={clearHandler} style={clearBtn}>
              {t("btn_clear")}
            </button>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Select
                    name="district"
                    {...register("district")}
                    onChange={selectDistrictHandler}
                    value={selectedDistrict}
                  >
                    <option key="blankChoice" hidden value={zero}>
                      {t("FormAddressScreen__district_placeholder")}
                    </option>
                    {districtList.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="invalid-feedback fst-italic">
                    {districRequired ? (
                      <div>{t("Form_field_required")}</div>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Select
                    name="city"
                    {...register("city")}
                    disabled={disabledField}
                    className="mt-3"
                    onChange={selectCitiHandler}
                    value={selectedCiti}
                  >
                    <option key="blankChoice" hidden value={zero}>
                      {t("FormAddressScreen__city_placeholder")}
                    </option>
                    {cityFlag
                      ? citiesList.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                  <div className="invalid-feedback fst-italic">
                    {cityRequired ? (
                      <div>{t("Form_field_required")}</div>
                    ) : null}
                  </div>
                </Col>
              </Row>
              {locationMsg ? <p>{locationMsg}</p> : null}
            </Form.Group>
            <div className="d-flex justify-content-center">
              <button
                className="w-90 w-md-50 my-1 py-3 h6"
                style={searchAreaBtn}
              >
                {t("FormAddressScreen__btn")}
              </button>
            </div>
          </Form>
        </>
      )}
    </>
  );
}

export default LocationFormScreen;
