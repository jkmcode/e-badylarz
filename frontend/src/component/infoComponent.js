import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../admin/Divider";
import ErrorMessage from "../component/ErrorMessage";

import { Icon } from "@iconify/react";

import { getFullDescriptions } from "../actions/adminActions";

import { GET_FULL_DESCRIPTION_DELETE } from "../constants/adminConstans";
import { TIME_AUT_ERROR } from "../constants/environmentConstans";

import { btnEdit, } from "../admin/AdminCSS";

function InfoComponent(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // fech data from Redux
  const descriptions = useSelector((state) => state.fullDescriptions);
  const { loading, desc, error, success } = descriptions;

  const [isDescription, setIsDescription] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDescID, setSelectedDescID] = useState(0);

  const descriptionHandler = (i) => {
    if (selectedDescID > 0) {
      if (i.id === selectedDescID) {
        setSelectedDescID(0)
      } else { setSelectedDescID(i.id) }
    } else { setSelectedDescID(i.id) }
  }
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
      if (desc.length !== 0) {
        setIsDescription(true);
      } else {
        setIsDescription(false);
      }
    }
  }, [desc]);

  //styling
  const mainContainer = {
    position: "relative",
    backgroundColor: "whitesmoke",
    width: "80%",
    maxWidth: "600px",
    height: "70vh",
  };

  const modalOverlay = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "grid",
    placeItems: "center",
    transition: `all 0.3s linear`,
    visibility: "hidden",
    zIndex: "-1",
  };

  const showModalOverlay = {
    ...modalOverlay,
    visibility: "visible",
    zIndex: "10",
  };

  const title = {
    color: "black",
    fontSize: "1.5rem",
    fontWeight: "500",
    textAlign: "center",
    marginTop: "0.5rem",
  };

  const titleLanguage = {
    color: "black",
    fontSize: "1rem",
    fontWeight: "400",
    textAlign: "left",
    margin: "0rem",
    marginLeft: "1rem",
    marginTop: "0rem",
  }

  const body = {
    textAlign: "left",
    fontSize: "0.8rem",
    marginLeft: "1rem",
    marginRight: "1rem",
    fontWeight: "400",
  };

  const closeBtn = {
    position: "absolute",
    bottom: "5%",
    left: "50%",
    transform: `translatex(-50%)`,
    backgroundImage: `linear-gradient(171deg, rgba(234, 17, 59, 1) 45%, rgba(202, 71, 130, 1) 89%)`,
    border: "none",
    padding: "0.5rem",
    minWidth: "150px",
    borderRadius: "0.5rem",
    color: "white",
    textTransform: "uppercase",
    fontWeight: "500",
  };

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div style={showModalOverlay}>
          {error ? <ErrorMessage msg={error} timeOut={TIME_AUT_ERROR} /> : null}
          <div style={mainContainer}>
            <div style={title}>
              {props.title} {props.obj.name}
            </div>
            <Divider />
            <div>
              {success ? (
                isDescription ? (
                  desc.map((i) => (
                    <>

                      {selectedDescID == i.id ?
                        <>
                          <p>
                            <button
                              style={{ ...btnEdit, color: "red", textTransform: "uppercase" }}
                              onClick={() => descriptionHandler(i)}
                            >
                              <Icon
                                icon="ic:outline-keyboard-arrow-up"
                                width="24"
                                height="24"
                              />
                              {i.language}
                            </button>
                          </p>

                          <p style={body} key={i.id}>
                            {i.description}
                          </p>
                        </>
                        : <p>
                          <button
                            style={{ ...btnEdit, color: "red", textTransform: "uppercase" }}
                            onClick={() => descriptionHandler(i)}
                          >
                            <Icon
                              icon="ic:baseline-keyboard-arrow-down"
                              width="24"
                              height="24"
                            />
                            {i.language}
                          </button>
                        </p>
                      }

                    </>

                  ))
                ) : (
                  <p style={body}>{t("No_data")}</p>
                )
              ) : null}
            </div>
            <button style={closeBtn} onClick={(e) => props.closeInfoHandler(e)}>
              {t("btn_close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoComponent;
