import React, { useState, useEffect } from "react";
import Loader from "../component/Loader";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDiscrict } from "../actions/discrictsActions";
import background from "./jabłka.png";

//https://react-select.com/advanced

function FormAddressScreen() {
  const [disabledField, setDisabledField] = useState(true);
  const [districRequired, setDistricRequired] = useState("");
  const [locationMsg, setLocaionMsg] = useState("");
  const [resetContent, setResetContent] = useState(false);
  const zero = "0";

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log("działa submit formularza", data);
    console.log("data.district", data.district);

    if (data.district === zero) {
      setDistricRequired("Pole wymagane");
    } else {
      if (data.city !== zero && data.pickupLocation !== zero) {
        setLocaionMsg("Można wybrać tylko jedno z tych pól");
        setResetContent(!resetContent);
      } else if (data.city === zero && data.pickupLocation === zero) {
        setLocaionMsg("Należy wybrać jedno z tych pól");
      } else {
        console.log("walidacja poprawna");
      }
    }
  };

  const selectHandler = () => {
    setDistricRequired("");
    setDisabledField(false);
  };

  const selectHandler2 = () => {
    setLocaionMsg("");
  };

  const cities = ["Chrzanów", "Pogorzyce", "Płaza"];
  console.log("districtList", districtList, typeof loading);

  useEffect(() => {
    console.log(districtList.length);
    if (districtList.length === 0) {
      console.log("jesem w ifie");
      dispatch(getDiscrict());
    }
  }, [dispatch, districtList.length]);

  // Style
  const backgroungImage = {
    backgroundImage: `url(${background})`,
    height: "120vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const shadowTransparentParent = {
    position: "relative",
  };

  const shadowTransparentChildren = {
    backgroundColor: "black",
    height: "20vh",
    width: "100%",
    opacity: "40%",
    marginTop: "-20vh",
  };

  const topright = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <div style={backgroungImage}>
        {loading ? (
          <Loader />
        ) : error ? (
          <p>error</p>
        ) : (
          // <div className="container bg-container max-sizing mt-5 p-4 rounded">
          <div className="container bg-container max-sizing p-4 rounded">
            <Row>
              <Col>
                <h5 className="text-center">{t("FormAddressScreen_title")}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className="text-center">
                  {t("FormAddressScreen_subtitle")}
                </h5>
              </Col>
            </Row>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Select
                      name="district"
                      {...register("district")}
                      onChange={selectHandler}
                    >
                      <option key="blankChoice" hidden value={zero}>
                        {t("FormAddressScreen__district_placeholder")}
                      </option>
                      {districtList.map((i) => (
                        <option key={i.id}>{i.name}</option>
                      ))}
                    </Form.Select>
                    {districRequired ? <p>{districRequired}</p> : null}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Select
                      //aria-label="Default select example"
                      name="city"
                      {...register("city")}
                      disabled={disabledField}
                      className="mt-3"
                      onChange={selectHandler2}
                      defaultValue="0"
                    >
                      <option key="blankChoice" hidden value={zero}>
                        {t("FormAddressScreen__city_placeholder")}
                      </option>
                      <option key="zeroValue" value={zero}></option>
                      <option>{cities[0]}</option>
                      <option>{cities[1]}</option>
                      <option>{cities[2]}</option>
                    </Form.Select>
                  </Col>
                </Row>
                {locationMsg ? <p>{locationMsg}</p> : null}
              </Form.Group>
              <Row>
                <Col className="text-center mt-4 color-title">
                  <p className="test3">lub</p>
                </Col>
              </Row>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Select
                      name="pickupLocation"
                      {...register("pickupLocation")}
                      disabled={disabledField}
                      className="mt-3"
                      onChange={selectHandler2}
                    >
                      <option key="blankChoice" hidden value={zero}>
                        {t("FormAddressScreen__pickup_location_placeholder")}
                      </option>
                      <option key="zeroValue" value={zero}></option>
                      <option>{cities[0]}</option>
                      <option>{cities[1]}</option>
                      <option>{cities[2]}</option>
                    </Form.Select>
                  </Col>
                </Row>
                {locationMsg ? <p>{locationMsg}</p> : null}
              </Form.Group>
              <Row>
                <h5 className="mt-3 ">{t("FormAddressScreen__info")}</h5>
              </Row>
              <Button
                type="submit"
                variant="success"
                className="rounded my-3 w-100"
              >
                {t("FormAddressScreen__btn")}
              </Button>
            </Form>
          </div>
        )}
      </div>
      <div style={shadowTransparentParent}>
        <div style={shadowTransparentChildren} />
        <Button
          type="submit"
          variant="success"
          className="rounded w-30"
          style={topright}
        >
          {t("FormAddressScreen__learn_more_btn")}
        </Button>
      </div>
    </>
  );
}

export default FormAddressScreen;
