import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { FormLayout, title, addBtn } from "./AdminCSS";
import { TWO } from "../constants/environmentConstans";
import FormInput from "./FormInput";
import SelectOption from "./SelectOption";
import language from "../language";

function AddProductCategories() {
  const { t } = useTranslation();

  //Variables
  const [selectedLgn, setSelectedLng] = useState(0);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [values, setValues] = useState({
    name: "",
    language: "",
  });

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLgn === 0) {
      setEmptyValueError(true);
    }
  };

  const selectLngHandler = (option) => {
    setSelectedLng(Number(option));
    setEmptyValueError(false);
  };

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  //Lists

  // const languages = [
  //   { id: 1, name: "PL" },
  //   { id: 2, name: "EN" },
  // ];

  const inputs = [
    {
      id: "1",
      name: "name",
      type: "text",
      placeholder: t("AddDistrict_name_placeholder"),
      errorMessage: t("AddDistrict_name_error_message"),
      label: t("AddDistrict_label_name"),
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={addBtn}>{t("btn-add")}</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductCategories;
