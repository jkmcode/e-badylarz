import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CartScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlerSubmit = () => {
    console.log("handlerSubmit ---clicked");
    navigate(-1);
  };

  return <Button onClick={handlerSubmit}>{t("btn-return")}</Button>;
}

export default CartScreen;
