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
import ErrorMessage from "../component/ErrorMessage";

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
    height: "18vh",
    width: "100%",
    opacity: "30%",
    marginTop: "-18vh",
  };

  const shadowForDesktop = {
    backgroundColor: "#1d1c1b",
    height: "20vh",
    width: "100%",
    opacity: "30%",
    marginTop: "-20vh",
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
          <ErrorMessage msg={error} timeOut={4000} />
        ) : (
          <div
            style={centerForm}
            className="bg-container max-sizing px-4 pt-4 w-90"
          >
            <Row>
              <Col>
                <div
                  style={title}
                  className="text-center h5 fw-bolder font-size-title"
                >
                  {t("FormAddressScreen_title")}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center h5 fw-bolder letter-spacing-1 font-size-title">
                  {t("FormAddressScreen_subtitle")}
                </div>
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
                    <div className="invalid-feedback fst-italic">
                      {districRequired ? <div>{districRequired}</div> : null}
                    </div>
                  </Col>
                </Row>
                {locationMsg ? <p>{locationMsg}</p> : null}
              </Form.Group>
              <Row>
                {/* <h5 className="mt-3 text-justify">
                  {t("FormAddressScreen__info")}
                </h5> */}
              </Row>
              {districRequired ? (
                <div style={errorMsg} className="p-3 font-size-msg">
                  Prosimy o wypełnienie wymaganych pól.
                </div>
              ) : null}

              <div style={infoMsg} className="p-3 font-size-msg">
                <div>Podaj swój adres w celu oszacowania kosztu dostawy.</div>
              </div>

              <div className="d-flex justify-content-center">
                <button
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
        <div style={windowWidth > 1200 ? shadowForDesktop : shadowForMobile} />
        <Row>
          <div style={positionInfo} className="fw-bolder">
            Twoje ulubione lokalne sklepy w jednym miejscu!
          </div>
        </Row>

        <button
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
