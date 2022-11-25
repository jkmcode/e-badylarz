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
import LocationFormScreen from "./LocationFormScreen";

//https://react-select.com/advanced

function FormAddressScreen() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getDiscrict());
    }
  }, [dispatch, districtList.length]);

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
            <LocationFormScreen />
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
