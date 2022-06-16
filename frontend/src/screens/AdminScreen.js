import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AdminScreen() {
  const { t } = useTranslation();

  return (
    <div className="container bg-container mt-5 p-4 rounded">
      <Link to="district" className="link-btn">
        {t("AdminScreen_district_btn")}
      </Link>
    </div>
  );
}

export default AdminScreen;
