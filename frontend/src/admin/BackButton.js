import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { returnBtn } from "./AdminCSS";

function BackButton() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      {location.pathname !== "/" && (
        <Link to="#" onClick={handleClick} style={returnBtn}>
          <Icon icon="ion:arrow-back" />
          {t("btn-return")}
        </Link>
      )}
    </div>
  );
}

export default BackButton;
