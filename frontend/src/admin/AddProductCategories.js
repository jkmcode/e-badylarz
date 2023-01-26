import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FormLayout, title, addBtn } from "./AdminCSS";
import FormInput from "./FormInput";
import SelectOption from "./SelectOption";
import ErrorMessage from "../component/ErrorMessage";
import language from "../language";
import { useNavigate } from "react-router-dom";
import { addProductCat } from "../actions/productActions";
import { TWO, EMPTY } from "../constants/environmentConstans";
import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";
import { SET_FLAG_ADD_TRUE } from "../constants/adminConstans";
import { ADD_PRODUCT_CAT_DELETE } from "../constants/productConstans";

function AddProductCategories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Variables
  const [selectedLgn, setSelectedLng] = useState(0);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [values, setValues] = useState({
    name: "",
    language: "",
  });

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const newProductCat = useSelector((state) => state.addProduct);
  const { loading, error, success, result } = newProductCat;

  const dflag = useSelector((state) => state.flag);
  const { addFlag } = dflag;

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const insertData = {
      name: values.name,
      creator: userInfo.id,
      language: values.language,
    };

    if (selectedLgn === EMPTY) {
      setEmptyValueError(true);
    } else {
      dispatch(addProductCat(insertData));
    }
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

  // fetching list of shops from DB
  useEffect(() => {
    //if (shopList.length === 0) {
    //dispatch(getShops());
    //}
    // delete current data shop in order to edit general data
    // we need to delete them because form in ShopActivity take defaultValue from the old one
    // if (shopDetails) {
    //   dispatch({ type: GET_SHOP_DELETE });
    // }
    // change shopImageFlag to Flase while every render. We need that to able open edit/add shop.
    // Otherwise in ShopActivity the condition (successAdd && !isImage) will come true
    // if (shopImageFlag) {
    //   dispatch({ type: SET_FLAG_IMAGE_FALSE });
    // }
    // if (ListOfContact.length !== 0) {
    //   dispatch({ type: GET_CONTACT_LIST_DELETE });
    // }
  }, []);

  //
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: SET_FLAG_ADD_TRUE });
        dispatch({ type: ADD_PRODUCT_CAT_DELETE });
      }, TIME_SET_TIMEOUT);
    }
  }, [success]);

  // navigate to main dashboard
  useEffect(() => {
    if (addFlag) {
      navigate("/dashboard/product-categories");
    }
  }, [addFlag]);

  //Lists
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={addBtn}>{t("btn-add")}</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductCategories;
