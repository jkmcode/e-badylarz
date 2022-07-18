import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";

import {
  SET_WINDOW_FLAG_FALSE,
  SET_WINDOW_FLAG_TRUE,
} from "../constants/adminConstans";

function InfoWindow(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(true);

  const handleYes = () => {
    setModalShow(false);
    dispatch({ type: SET_WINDOW_FLAG_TRUE });
  };

  const handleNo = () => {
    setModalShow(false);
    dispatch({ type: SET_WINDOW_FLAG_FALSE });
  };

  return (
    <>
      <Modal
        show={modalShow}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleYes}>
            {t("btn_yes")}
          </Button>
          <Button variant="secondary" onClick={handleNo}>
            {t("btn_no")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoWindow;
