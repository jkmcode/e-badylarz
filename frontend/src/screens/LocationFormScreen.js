import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LocationFormScreen() {
  const navigate = useNavigate();
  const zero = "0";
  const [disabledField, setDisabledField] = useState(true);
  const [districRequired, setDistricRequired] = useState("");
  const [cityRequired, setCityRequired] = useState("");
  const [locationMsg, setLocaionMsg] = useState("");
  const [selectedCiti, setSelectedCiti] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const { t } = useTranslation();

  const discrictListRedux = useSelector((state) => state.districts);
  const { districtList } = discrictListRedux;

  const cities = ["Chrzanów", "Pogorzyce", "Płaza"];

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    if (data.district === zero) {
      setDistricRequired("Pole wymagane");
    } else if (!data.city && data.district !== zero) {
      setCityRequired("Pole wymagane");
    } else {
      navigate("/main-page");
    }

    // else {
    //   if (data.city !== zero && data.pickupLocation !== zero) {
    //     setLocaionMsg("Można wybrać tylko jedno z tych pól");
    //     setResetContent(!resetContent);
    //   } else if (data.city === zero && data.pickupLocation === zero) {
    //     setLocaionMsg("Należy wybrać jedno z tych pól");
    //   } else {
    //     console.log("walidacja poprawna");
    //   }
    // }
  };

  const selectDistrictHandler = (e) => {
    setDistricRequired("");
    setDisabledField(false);
    setSelectedDistrict(e.target.value);
  };

  const selectCitiHandler = (e) => {
    setSelectedCiti(e.target.value);
    setLocaionMsg("");
    setCityRequired("");
  };

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

  const clearHandler = () => {
    setCityRequired("");
    setDistricRequired("");
    setSelectedCiti("");
    setSelectedDistrict("");
  };

  return (
    <>
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
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </Form.Select>
              <div className="invalid-feedback fst-italic">
                {districRequired ? <div>{districRequired}</div> : null}
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
                <option value={cities[0]}>{cities[0]}</option>
                <option value={cities[1]}>{cities[1]}</option>
                <option value={cities[2]}>{cities[2]}</option>
              </Form.Select>
              <div className="invalid-feedback fst-italic">
                {cityRequired ? <div>{cityRequired}</div> : null}
              </div>
            </Col>
          </Row>
          {locationMsg ? <p>{locationMsg}</p> : null}
        </Form.Group>
        {/* <Row>
        <h5 className="mt-3 text-justify">{t("FormAddressScreen__info")}</h5>
      </Row> */}
        {/* {districRequired ? (
          <div style={errorMsg} className="p-3 font-size-msg">
            Prosimy o wypełnienie wymaganych pól.
          </div>
        ) : null} */}

        {/* <div style={infoMsg} className="p-3 font-size-msg">
        <div>Podaj swój adres w celu oszacowania kosztu dostawy.</div>
      </div> */}

        <div className="d-flex justify-content-center">
          <button className="w-90 w-md-50 my-1 py-3 h6" style={searchAreaBtn}>
            {t("FormAddressScreen__btn")}
          </button>
        </div>
      </Form>
    </>
  );
}

export default LocationFormScreen;
