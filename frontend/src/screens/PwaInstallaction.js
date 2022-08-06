import React from "react";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col } from "react-bootstrap";

//Images
import PWA1 from "../images/pwa1.png";
import PWA2 from "../images/pwa2.png";
import PWA3 from "../images/pwa3.png";
import Devices from "../images/devices.png";

function PwaInstallaction() {
  const loading = false;
  const error = false;

  //style
  const instSteps = {
    fontWeight: "600",
  };

  const instTitle = {
    fontFamily: "Merienda",
    fontWeight: "400",
    letterSpacing: "7%",
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="bg-container px-5 pb-4">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <div className="text-center">
            <Col className="pt-4">
              <div className="d-flex justify-content-evenly">
                <p className="my-auto mx-3 h1 text-dark" style={instTitle}>
                  Ściągnij aplikacje w
                  <p className="display-2 m-0 text-dark">3</p>
                  prostych krokach
                </p>
                <img src={Devices} />
              </div>
            </Col>
          </div>
          <Row className="text-center">
            <Col className="pt-4">
              <p style={instSteps}>Naciśnij menu paska przeglądarki</p>
              <img src={PWA1} />
            </Col>
            <Col className="pt-4">
              <p style={instSteps}>Naciśnij przycisk „Zainstaluj aplikację”</p>
              <img src={PWA2} />
            </Col>
            <Col className="pt-4">
              <p style={instSteps}>Na końcu zatwierdź instalacje</p>
              <img src={PWA3} />
            </Col>
          </Row>
        </main>
      )}
    </>
  );
}

export default PwaInstallaction;
