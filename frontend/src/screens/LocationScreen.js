import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { ReactComponent as Home } from "../icons/Home.svg";
import useGeoLocation from "../component/useGeoLocation";
import { useTranslation } from "react-i18next";
import CurrentAdress from "./CurrentAdress";
import { useDispatch, useSelector } from "react-redux";
import { testList } from "../actions/testActions";
import { getDiscrict } from "../actions/discrictsActions";

import {
  TEST_REQUEST,
  TEST_SUCCESS,
  TEST_FAIL,
} from "../constants/testConstans";

function LocationScreen() {
  const [newLocation, setNewLocation] = useState(false);
  // const location = useGeoLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const funkcjaTestowa = () => {
    setNewLocation(true);
    console.log("działa poprawnie");
  };

  dispatch(testList());

  dispatch(getDiscrict());

  return (
    <div className="container text-center bg-container mt-5 p-4 rounded">
      <Row>
        <Col>
          <Home className="test4 rounded" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className="color-title ">Podaj swój adres</h5>
        </Col>
        <Col>
          <h5 className="color-title ">{t("test")}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>a my pomożemy ci wybrać odpowiednią lokalizację</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="success" className="w-100 p-3">
            Wybierz ostatni adres
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-2">Chrzanów, Chrzanów</Col>
      </Row>
      <Row>
        <Col className="text-center mt-4 color-title">
          <p className="test3">lub</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-success"
            className="w-100 mt-2 p-3"
            onClick={funkcjaTestowa}
          >
            Inny adres
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            {/* {location.loaded
              ? JSON.stringify(location)
              : "Location data not available yet"} */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            1. Zastosować traslate - samouczek - plik txt 2.Formularz do
            wpisania adresu 3. Sprawdzić czy dany adres istnieje.
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LocationScreen;
