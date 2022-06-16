import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userAction";

function LogoutScreen() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(logout());
  }, []);

  return (
    <div className="container bg-container mt-5 p-4 rounded">
      <Link to="/" className="text-secondary">
        {t("btn-return")}
      </Link>
      <div className="d-flex justify-content-center display-6">
        {t("LogoutScreen_title")}
      </div>
    </div>
  );
}

export default LogoutScreen;
