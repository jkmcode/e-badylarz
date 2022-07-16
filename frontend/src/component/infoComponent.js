import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Button, Modal } from "react-bootstrap";

import { getFullDescriptions } from "../actions/adminActions";

import {
  GET_FULL_DESCRIPTION_DELETE,
  SET_FLAG_INFO_FALSE,
} from "../constants/adminConstans";

function InfoComponent(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // fech data from Redux
  const descriptions = useSelector((state) => state.fullDescriptions);
  const { loading, desc, error, success } = descriptions;

  const [isDescription, setIsDescription] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => {
    setModalShow(false);
    dispatch({ type: SET_FLAG_INFO_FALSE });
    dispatch({ type: GET_FULL_DESCRIPTION_DELETE });
  };

  useEffect(() => {
    dispatch({ type: GET_FULL_DESCRIPTION_DELETE });
    dispatch(
      getFullDescriptions({
        Id: props.obj.id,
        type: props.typeObj,
      })
    );
  }, []);

  useEffect(() => {
    if (success) {
      setModalShow(true);
      if (desc.length > 0) {
        setIsDescription(true);
      }
    }
  }, [desc]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <Modal
            show={modalShow}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {props.title} {props.obj.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {success ? (
                isDescription ? (
                  desc.map((i) => <p key={i.id}> {i.description}</p>)
                ) : (
                  <p>{t("No_data")}</p>
                )
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
              {t("btn_close")}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default InfoComponent;
