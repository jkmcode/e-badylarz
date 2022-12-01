import React, { useState, useEffect } from "react";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { INTERVAL_COOKIE } from "../constants/cookieConstans";

const getLocalStorage = () => {
  let acceptCookie = localStorage.getItem("acceptCookie");
  let lastDate = localStorage.getItem("lastAccept");
  let currentDate = Date.now();
  let interval = INTERVAL_COOKIE;

  if (acceptCookie === "true" && parseInt(lastDate) > currentDate - interval) {
    return true;
  } else if (
    acceptCookie !== "true" &&
    parseInt(lastDate) < currentDate - interval
  ) {
    return false;
  }
};

function Cookie() {
  const { t } = useTranslation();
  const [submit, setSubmit] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [acceptCookie, setAcceptCookie] = useState(getLocalStorage());

  const handleSubmitCookie = () => {
    const lastAccept = Date.now();
    localStorage.setItem("lastAccept", JSON.stringify(lastAccept));
    setSubmit(true);
    setAcceptCookie(true);
  };

  const cookieBtn = {
    display: !submit ? "flex" : "none",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    padding: "1.5rem",
    zIndex: "1001",
    bottom: "0",
    width: "100%",
    backgroundColor: "#3a3c40",
    color: "white",
  };

  const shadow = {
    backgroundColor: "black",
    opacity: "30%",
    zIndex: "1001",
    bottom: "0",
    position: "fixed",
    width: "100%",
    height: "100vh",
  };

  const btnCookie = {
    backgroundColor: isHover ? "#28eb82" : "#08c25e",
    color: "white",
    borderColor: "transparent",
    padding: "0.25rem",
    borderRadius: "0.25rem",
  };

  useEffect(() => {
    localStorage.setItem("acceptCookie", JSON.stringify(acceptCookie));
  }, [acceptCookie]);

  return (
    <>
      {acceptCookie ? null : (
        <>
          {!submit && <RemoveScrollBar />}
          {!submit && <div style={shadow}></div>}
          <div style={cookieBtn}>
            <div>
              {t("Cookie_text")}
              <Link
                onClick={handleSubmitCookie}
                style={{ marginLeft: "0.5rem", color: "#08c25e" }}
                to="/private-policy"
              >
                {t("Cookie_link_title")}
              </Link>
            </div>
            <button
              onClick={handleSubmitCookie}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              style={btnCookie}
            >
              {t("btn_submit")}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Cookie;
