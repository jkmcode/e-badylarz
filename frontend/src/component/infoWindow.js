import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";

import {
  SET_WINDOW_FLAG_FALSE,
  SET_WINDOW_FLAG_TRUE,
  GET_SHOPS_LIST_DELETE,
  SET_FLAG_SHOP_FALSE,
} from "../constants/adminConstans";

function InfoWindow(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(true);

  const handleYes = () => {
    setModalShow(false);
    dispatch({ type: SET_WINDOW_FLAG_TRUE });
    if (props.type === "shop") {
      dispatch({ type: GET_SHOPS_LIST_DELETE });
      dispatch({ type: SET_FLAG_SHOP_FALSE });
    }
  };

  const handleNo = () => {
    setModalShow(false);
    dispatch({ type: SET_WINDOW_FLAG_FALSE });
    if (props.type === "shop") {
      dispatch({ type: SET_FLAG_SHOP_FALSE });
    }
  };

  return (
    <>
      <Modal
        show={modalShow}
        // onHide={true}
        backdrop="static"
        keyboard={false}
        className="d-flex justify-content-center align-items-center"
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
