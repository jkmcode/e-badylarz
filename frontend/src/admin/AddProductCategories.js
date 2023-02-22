import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import SelectOption from "./SelectOption";
import ErrorMessage from "../component/ErrorMessage";
import UploadImage from "../component/UploadImage";
import language from "../language";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FormLayout, title, addBtn } from "./AdminCSS";
import { useNavigate } from "react-router-dom";
import { addProductCat } from "../actions/productActions";
import { TWO, EMPTY } from "../constants/environmentConstans";
import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";
import { SET_FLAG_ADD_TRUE } from "../constants/adminConstans";
import { GET_PRODUCT_CAT_LIST_DELETE } from "../constants/productConstans";
import { v4 as uuidv4 } from "uuid";
import { InsertImage2 } from "../actions/adminActions";
import { PRODUCT_SUBCAT } from "../constants/adminConstans";

function AddProductCategories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newId = uuidv4();

  //Variables
  const [selectedLgn, setSelectedLng] = useState("");
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [switcher, setSwitcher] = useState(false);
  const [values, setValues] = useState({
    name: "",
    language: "",
  });

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const newProductCat = useSelector((state) => state.addProduct);
  const { loading, error, success, successAdd } = newProductCat;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  const dflag = useSelector((state) => state.flag);
  const { addFlag } = dflag;

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setUniqueId(newId);
    setSwitcher(true);
  };

  const selectLngHandler = (option) => {
    setSelectedLng(option);
    setValues({ ...values, language: option });
    setEmptyValueError(false);
  };

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  //UseEffects

  // save data to DB
  useEffect(() => {
    if (switcher) {
      const insertData = {
        name: values.name,
        creator: userInfo.id,
        language: values.language,
        uniqueId: uniqueId,
      };

      setSwitcher(false);

      if (selectedLgn === EMPTY) {
        setEmptyValueError(true);
      } else {
        dispatch(addProductCat(insertData));
      }
    }
  }, [switcher]);

  //
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: SET_FLAG_ADD_TRUE });
        dispatch({ type: GET_PRODUCT_CAT_LIST_DELETE });
      }, TIME_SET_TIMEOUT);
    }
  }, [success]);

  // navigate to main dashboard
  useEffect(() => {
    if (addFlag) {
      navigate(-1);
    }
  }, [addFlag]);

  // add/edit photo
  useEffect(() => {
    if (successAdd) {
      if (isImage) {
        dispatch(
          InsertImage2({
            imageUpload: imageUpload,
            uniqueId: uniqueId,
            type: PRODUCT_SUBCAT,
          })
        );
      }
    }
  }, [successAdd]);

  //Lists
  const inputs = [
    {
      id: "1",
      name: "name",
      type: "text",
      placeholder: t("ProductCategories_name_placeholder"),
      errorMessage: t("ProductCategories_name_error_message"),
      label: t("ProductCategories_name_label"),
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: "2",
      name: "language",
      label: "language",
      optionsList: language,
      defaultValue: "Select an option",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        marginTop: "1rem",
        padding: "2rem",
        borderRadius: "0.5rem",
      }}
    >
      {success && (
        <ErrorMessage
          msg={t("ProductCategories_msg_add_success")}
          timeOut={TIME_SET_TIMEOUT}
          variant="success"
          success={true}
        />
      )}
      <Link
        to="/dashboard/product-categories"
        style={{ color: "grey", textTransform: "uppercase" }}
      >
        <Icon icon="material-symbols:arrow-back-ios" />
        {t("btn-return")}
      </Link>
      <div style={title}>{t("AddDiscrict_title")}</div>
      <form onSubmit={handleSubmit}>
        <FormLayout col={TWO}>
          {inputs.map((input, index) => {
            if (index === 0) {
              return (
                <FormInput
                  key={input.id}
                  {...input}
                  onChange={onChange}
                  value={values[input.name]}
                />
              );
            }
            if (index === 1) {
              return (
                <SelectOption
                  key={input.id}
                  optionsList={input.optionsList}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyValueError}
                  onChange={selectLngHandler}
                  {...input}
                />
              );
            }
          })}
        </FormLayout>
        <UploadImage />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={addBtn}>{t("btn-add")}</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductCategories;
