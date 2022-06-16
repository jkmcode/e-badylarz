import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";

function DraftComponent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = true;
  const error = false;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
        </div>
      )}
    </div>
  );
}

export default DraftComponent;
