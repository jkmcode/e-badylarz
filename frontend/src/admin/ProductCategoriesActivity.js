import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import SelectOption from "./SelectOption";
import ErrorMessage from "../component/ErrorMessage";
import UploadImage from "../component/UploadImage";
import ImageDisplayer from "./ImageDisplayer";
import language from "../language";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FormLayout, title, addBtn, changeBtn } from "./AdminCSS";
import { useNavigate, useParams } from "react-router-dom";
import { addProductCat } from "../actions/productActions";
import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";
import {
  SET_FLAG_ADD_TRUE,
  DELETE_IMAGE_REDUX,
  ADD_IMAGE_RESET,
} from "../constants/adminConstans";
import { GET_PRODUCT_CAT_LIST_DELETE } from "../constants/productConstans";
import { v4 as uuidv4 } from "uuid";
import { InsertImage2, getSingleInstance } from "../actions/adminActions";
import {
  TWO,
  EMPTY,
  EDIT,
  ADD,
  PRODUCT_CAT,
} from "../constants/environmentConstans";

function ProductCategoriesActivity() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const newId = uuidv4();
  const activity = params.activity;
  const editSubcategoryId = params.id;

  //Variables
  const [selectedLgn, setSelectedLng] = useState("");
  const [imageUpgrader, setImageUpgrader] = useState(false);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [imageRender, setImageRender] = useState(false);
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

  const addImage = useSelector((state) => state.insertImage);
  const { successInsertImage } = addImage;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  const dflag = useSelector((state) => state.flag);
  const { addFlag } = dflag;

  const singleSingleRedux = useSelector((state) => state.getSingleInstance);
  const { result, success: successSingleInstance } = singleSingleRedux;

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

  // Comment
  // save data to DB
  // switcher variable is changed in handleSubmit function on true, so if user press the ADD/CHANGE button this useEffect will run.
  // inside useEffect switcher will be changed on false. This is nesseserly in case when user change image more than one time.
  // when user change image several times, useEffect gonna be run every time. Otherwise will run only at the beginning
  // because in dependency array we have only switcher variable.
  // If activity is ADD and selectedLgn is EMPTY, then it sets the emptyValueError state to true. It is necessarily for validation (select language is required)
  // Otherwise, it dispatches an addProductCat action with the insertData object.
  // If activity is EDIT, it sets the imageUpgrader state to true and it triggers UseEffect responsible for insert/edit image.
  useEffect(() => {
    if (switcher) {
      const insertData = {
        name: values.name,
        creator: userInfo.id,
        language: values.language,
        uniqueId: uniqueId,
      };

      setSwitcher(false);

      if (activity === ADD) {
        if (selectedLgn === EMPTY) {
          setEmptyValueError(true);
        } else {
          dispatch(addProductCat(insertData));
        }
      } else if (activity === EDIT) {
        setImageUpgrader(true);
      }
    }
  }, [switcher]);

  // Comment
  // State managment
  // dispatch({ type: ADD_IMAGE_RESET }) changes global variable successInsertImage on false.
  // Thanks to this, when user run current component ones again in avoid to navigate to previous page automaticlly without changing image.
  // dispatch({ type: SET_FLAG_ADD_TRUE }) changes global variable addFlag on true. Based on that useEffect responsible for navigate to previous page is activated
  // dispatch({ type: GET_PRODUCT_CAT_LIST_DELETE }) changes global variable productCatList on empty list.
  // It ensures that useEffect resonsible for productCatList in ProductCategories Component is activated in order to fetch new data from DB.
  // variable TIME_SET_TIMEOUT is used in this useEffect and in ErrorMessage Component.
  // Thanks this approach, duration of Error Message appearance is equal to duration execute of below useEffect
  useEffect(() => {
    if (success || successInsertImage) {
      setTimeout(() => {
        dispatch({ type: ADD_IMAGE_RESET });
        dispatch({ type: SET_FLAG_ADD_TRUE });
        dispatch({ type: GET_PRODUCT_CAT_LIST_DELETE });
      }, TIME_SET_TIMEOUT);
    }
  }, [success, successInsertImage]);

  // Comment
  // navigate to the previous page
  useEffect(() => {
    if (addFlag) {
      navigate(-1);
    }
  }, [addFlag]);

  // Comment
  // add/edit photo
  // This code is using the useEffect hook from React to monitor changes in the successAdd and imageUpgrader state variables.
  // When either of these variables changes, the effect function will run.
  // Inside the effect function, there are two conditional statements. First, if successAdd or imageUpgrader is true, imageUpgrader is set to false.
  // Second, if isImage is true, the dispatch function is called with an object that contains the imageUpload, uniqueId, and type properties.
  // using setImageUpgrader(false) ensure us that UseEffect run again when user will change image more than one time.
  // otherwise function InsertImage2 will exsecute only ones.
  useEffect(() => {
    if (successAdd || imageUpgrader) {
      setImageUpgrader(false);
      if (isImage) {
        dispatch(
          InsertImage2({
            imageUpload: imageUpload,
            uniqueId: success ? uniqueId : result.uniqueId,
            type: PRODUCT_CAT,
          })
        );
      }
    }
  }, [successAdd, imageUpgrader]);

  // Comment
  // Fetch single instance from DB
  // If the activity variable is equal to "EDIT",
  // it will dispatch an action to retrieve a single instance of a category based on the editSubcategoryId value.
  // The array of dependencies is an empty array [], which means that this effect will only run once when the component mounts.
  useEffect(() => {
    dispatch({ type: DELETE_IMAGE_REDUX });
    setImageRender(true);
    if (activity === EDIT) {
      dispatch(
        getSingleInstance({
          Id: editSubcategoryId,
          typeActivity: PRODUCT_CAT,
        })
      );
    }
  }, []);

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
      defaultValue:
        activity === ADD ? "" : result && activity === EDIT ? result.name : "",
      disabled: activity === EDIT && true,
    },
    {
      id: "2",
      name: "language",
      label: "language",
      optionsList: language,
      defaultValue:
        activity === ADD
          ? "Select an option"
          : result && activity === EDIT
          ? result.language
          : "",
      disabled: activity === EDIT && true,
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
      {successInsertImage && (
        <ErrorMessage
          msg={t("ProductCategories_msg_image_edit_success")}
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
      {activity === EDIT ? (
        <div style={title}>{t("Product_category_edit_title")}</div>
      ) : (
        <div style={title}>{t("Product_category_add_title")}</div>
      )}

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
        {imageRender && activity === EDIT && result.photo !== null && (
          <ImageDisplayer imageSrc={result.photo} />
        )}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {activity === EDIT ? (
            <button type="submit" style={changeBtn}>
              {t("btn-change")}
            </button>
          ) : (
            <button style={addBtn}>{t("btn-add")}</button>
          )}
        </div>
        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={addBtn}>{t("btn-add")}</button>
        </div> */}
      </form>
    </div>
  );
}

export default ProductCategoriesActivity;
