import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addDesc } from "../actions/adminActions";
import { formLabel } from "./AdminCSS";

import { DISTRICT_ADD_DESC_DELETE } from "../constants/adminConstans";

function Description(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [currentDesc, setCurrentDesc] = useState(() => {
    if (props.getDesc) {
      if (props.getDesc.length !== 0) {
        return props.getDesc[0].description;
      }
    }
  });

  const [value, setValue] = useState(currentDesc);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.length === 0) {
      setErrorMessage(t("DistrictAddDescription_error_message_requred"));
    } else if (value.length > 100) {
      setErrorMessage(t("DistrictAddDescription_error_message_too_long"));
    } else {
      dispatch({ type: DISTRICT_ADD_DESC_DELETE });
      if (props.getDesc.length < 1) {
        dispatch(
          addDesc({
            id: userInfo.id,
            addDesc: true,
            objType: props.parentProps.descType,
            objId: props.parentProps.objId,
            lng: props.lngDesc,
            desc: value,
          })
        );
      } else {
        dispatch(
          addDesc({
            id: userInfo.id,
            addDesc: false,
            objType: props.parentProps.descType,
            objId: props.parentProps.objId,
            lng: props.lngDesc,
            desc: value,
            descId: props.getDesc[0].id,
          })
        );
      }
    }
  };

  const btnSumbitDesc = {
    width: "40%",
    marginTop: "1rem",
    borderRadius: "0.25rem",
    padding: "0.25rem",
    backgroundImage: `linear-gradient(90deg, rgb(152, 255, 152) 0%, rgb(61, 217, 61) 100%)`,
    border: "none",
    fontWeight: "500",
    color: "white",
    fontSize: "calc(0.8rem + 0.3vw)",
  };

  const textArea = {
    display: "block",
    width: "100%",
    minHeight: "20vh",
    border: "2px solid red",
    fontSize: "1rem",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div controlId="desc">
        <label htmlFor="descDistrict" style={formLabel}>
          {t("DistrictAddDescription_label_desc")}
        </label>
        <textarea
          placeholder={t("DistrictAddDescription_placeholder_desc")}
          pattern="[A-Za-z0-9]{3,}"
          className="textAreaInput"
          name="description"
          style={textArea}
          onChange={(e) => setValue(e.target.value)}
          defaultValue={currentDesc}
        />
        <span
          style={{ color: "red", fontSize: "0.85rem", fontStyle: "italic" }}
        >
          {errorMessage}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="submit" style={btnSumbitDesc}>
          {t("btn_submit")}
        </button>
      </div>
    </form>
  );
}

export default Description;
