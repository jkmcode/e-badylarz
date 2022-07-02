import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-bootstrap";

import {
  WRONG_PASSWORD,
  REQUEST_ERROR_500,
  CREDENTIALS_WERE_NOT_PROVIDED,
  INVALID_TOKEN,
  NO_PERMISSION,
} from "../constants/errorsConstants";

// variants: 'primary','secondary','success','danger','warning','info','light','dark'
// If timeOut is less than 2000, then message cannot disappear
function ErrorMessage(props) {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [timeOut] = useState(props.timeOut);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    switch (props.msg) {
      case WRONG_PASSWORD:
        return setErrorMessage("ErrorMessage_inproper_password");
      case REQUEST_ERROR_500:
        return setErrorMessage("ErrorMessage_request_500");
      case CREDENTIALS_WERE_NOT_PROVIDED:
        return setErrorMessage("ErrorMessage_credentials_were_not_provided");
      case INVALID_TOKEN:
        return setErrorMessage("ErrorMessage_invalid_token");
      case NO_PERMISSION:
        return setErrorMessage("ErrorMessage_no_permission");
      default:
        return setErrorMessage(props.msg);
    }
  }, []);

  useEffect(() => {
    if (timeOut > 2000) {
      setTimeout(() => {
        setErrorMessage("");
      }, props.timeOut);
    }
  }, [errorMessage]);

  return (
    <>
      {errorMessage && open && (
        <Alert
          variant={props.variant}
          onClose={() => setOpen(false)}
          dismissible
        >
          <Alert.Heading>{t("ErrorMessage_title")}</Alert.Heading>
          <p>{t(errorMessage)}</p>
        </Alert>
      )}
    </>
  );
}

export default ErrorMessage;
