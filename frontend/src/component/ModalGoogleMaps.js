import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Icon } from "@iconify/react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

function ModalGoogleMaps(props) {
  const [modalShow, setModalShow] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDaCLnI3l3OV1Pd9XLHm0npZXMWQKsAc2w",
  });

  const mapBtn = {
    marginLeft: "auto",
    borderColor: "transparent",
    backgroundColor: "transparent",
    padding: "0",
    fontSize: "2rem",
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <button style={mapBtn} onClick={() => setModalShow(true)}>
        <Icon icon="logos:google-maps" />
      </button>
      <Modal
        show={modalShow}
        backdrop="static"
        keyboard={false}
        className="d-flex justify-content-center align-items-center"
      >
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GoogleMap
            zoom={14}
            center={{ lat: 50.14225314644723, lng: 19.402262826521515 }}
            mapContainerClassName="map-container"
          >
            <Marker
              position={{ lat: 50.14225314644723, lng: 19.402262826521515 }}
            />
          </GoogleMap>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalGoogleMaps;
