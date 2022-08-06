import React, { useState, useEffect } from "react";
import Loader from "../component/Loader";
import AboutUsScreeen from "./AboutUsScreen";
import PwaInstallaction from "./PwaInstallaction";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDiscrict } from "../actions/discrictsActions";
import background from "../images/jabłka.png";
import { scroller } from "react-scroll";

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

  useEffect(() => {
    console.log(districtList.length);
    if (districtList.length === 0) {
      dispatch(getDiscrict());
    }
  }, [dispatch, districtList.length]);

  // responsive
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const detectSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowWidth]);

  //scroll

  const [pwaInst, setPwaInst] = useState(false);

  useEffect(() => {
    if (pwaInst) {
      scroller.scrollTo("pwaInstallaction", {
        smooth: true,
        offset: 0,
        duration: 200,
      });
      setPwaInst(false);
    }
  }, [pwaInst]);

  // Style

  const title = {
    color: "#ae1d1d",
    letterSpacing: "1.2px",
  };

  const backgroungImage = {
    backgroundImage: `url(${background})`,
    height: "90vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
    backgroundPosition: "50% 50%",
  };

  const positionRelative = {
    position: "relative",
  };

  const shadowForMobile = {
    backgroundColor: "#1d1c1b",
    height: "20vh",
    width: "100%",
    opacity: "30%",
    marginTop: "-20vh",
  };

  const shadowForDesktop = {
    backgroundColor: "#1d1c1b",
    height: "25vh",
    width: "100%",
    opacity: "30%",
    marginTop: "-25vh",
  };

  const centerForm = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
  };

  const positionBtn = {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    backgroundColor: "#207B00",
    borderRadius: "20px",
    border: "none",
  };

  const info = {
    backgroundColor: "#EAFEE1",
    marginTop: "1rem",
    color: "#1A5E02",
    borderRadius: "10px",
  };

  const positionInfo = {
    fontSize: "20px",
    lineHeight: "20px",
    textAlign: "center",
    color: "white",
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const searchAreaBtn = {
    color: "white",
    backgroundColor: "#207B00",
    borderRadius: "20px",
    border: "none",
  };

  return (
    <>
      <div style={backgroungImage}>
        {loading ? (
          <Loader />
        ) : error ? (
          <p>error</p>
        ) : (
          <div style={centerForm} className="bg-container max-sizing p-4 w-90">
            <Row>
              <Col>
                <p style={title} className="text-center h5 fw-bolder">
                  {t("FormAddressScreen_title")}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-center h5 fw-bolder letter-spacing-1">
                  {t("FormAddressScreen_subtitle")}
                </p>
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
              {/* <Row>
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
              </Form.Group> */}
              <Row>
                {/* <h5 className="mt-3 text-justify">
                  {t("FormAddressScreen__info")}
                </h5> */}
              </Row>
              <div style={info} className="p-3">
                <div>Podaj swój adres w celu oszacowania kosztu dostawy</div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="w-90 w-md-50 my-1 py-3 h6"
                  style={searchAreaBtn}
                >
                  {/* {t("FormAddressScreen__btn")} */}
                  Szukaj obszaru zakupów
                </button>
              </div>
            </Form>
          </div>
        )}
      </div>
      <div style={positionRelative}>
        <div style={windowWidth > 600 ? shadowForDesktop : shadowForMobile} />
        <Row>
          <p style={positionInfo} className="fw-bolder">
            Twoje ulubione lokalne sklepy w jednym miejscu!
          </p>
        </Row>

        <button
          type="submit"
          className="w-80 w-md-25 py-3 h6"
          style={positionBtn}
          onClick={() => setPwaInst(true)}
        >
          {t("FormAddressScreen__learn_more_btn")}
        </button>
      </div>
      <div id="pwaInstallaction">
        <PwaInstallaction />
      </div>
      <AboutUsScreeen />
    </>
  );
}

export default FormAddressScreen;
