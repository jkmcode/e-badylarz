import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import BackButton from "./BackButton";
import UploadImage from "../component/UploadImage";
import SelectOption from "./SelectOption";
import language from "../language";
import { getProductCat, getSubproductCat } from "../actions/productActions";
import { addSingleInstance } from "../actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { title, changeBtn, addBtn, FormLayout } from "./AdminCSS";
import {
  EDIT,
  ADD,
  TWO,
  EMPTY_LIST,
  PRODUCT,
} from "../constants/environmentConstans";

function ProductsActivity() {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const activity = params.activity;

  const [values, setValues] = useState({
    name: "",
  });
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  const [selectedLgn, setSelectedLng] = useState(0);
  const [subcategoryId, setSubcategoryId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [currentProductCatList, setCurrentProductCatList] = useState([]);
  const [addSwitcher, setAddSwitcher] = useState(false);
  const [uniqueId, setUniqueId] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCatListRedux = useSelector((state) => state.productCatList);
  const { loading: loadingProductCat, productCatList } = productCatListRedux;

  const subproductSubcatListRedux = useSelector(
    (state) => state.subproductCatList
  );
  const { subproductCatList } = subproductSubcatListRedux;

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity === ADD) {
      setAddSwitcher(true);
      // setUniqueId(newId);
    }

    // if (activity === EDIT) {
    //   setEditSwitcher(true);
    //   setUniqueId(newId);
    // }
  };

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const selectLngHandler = (option) => {
    setSwitcher(true);
    setSelectedLng(option);
    console.log("selectLngHandler", option, typeof option);
    setEmptyValueError(false);
  };

  const selectProductCatHandler = (option) => {
    setSwitcher(true);
    setCategoryId(option);
  };

  const selectProductSubcatHandler = (option) => {
    setSubcategoryId(option);
  };

  //Lists
  const inputs = [
    {
      id: "1",
      name: "name",
      type: "text",
      placeholder: t("ProductsActivity_name_placeholder"),
      errorMessage: t("ProductCategories_name_error_message"),
      label: t("ProductsActivity_name_label"),
      pattern: "^[A-Za-z]{3,16}$",
      //   defaultValue:
      //     activity === "add"
      //       ? ""
      //       : successSingleInstance && activity === EDIT
      //       ? result.name
      //       : "",
      required: true,
    },
    {
      id: "2",
      name: t("ProductsActivity_input_name_language"),
      label: t("ProductsActivity_input_label_language"),
      optionsList: language,
      defaultValue: t("default_option_lng"),
      disabled: values.name.length < 4 && true,
    },
    {
      id: "3",
      name: t("ProductsActivity_input_name_product_cat"),
      label: t("ProductsActivity_input_label_product_cat"),
      optionsList: currentProductCatList,
      defaultValue: t("default_option_product_cat"),
      disabled: !selectedLgn && true,
    },
    {
      id: "4",
      name: t("ProductsActivity_input_name_product_subcat"),
      label: t("ProductsActivity_input_label_product_subcat"),
      optionsList: subproductCatList,
      defaultValue: t("default_option_product_cat"),
      disabled: !categoryId && true,
    },
  ];

  //Comment
  //This code is a React useEffect hook that triggers whenever the value of switcher changes.
  //It defines an insertData object and dispatches an action using the addProductSubcat action creator with insertData as the argument.
  //It also updates the state of switcher to false using setSwitcher(false).
  //When editSwitcher is true, it adds some additional properties to insertData and dispatches an action using the updateSubcategory action creator.
  //It also sets the state of editSwitcher to false. The value for the name property in insertData is determined based on the values.name property
  //, or the successSingleInstance.name property if values.name is falsy.
  useEffect(() => {
    if (addSwitcher) {
      const insertData = {
        name: values.name,
        creator: userInfo.id,
        uniqueId: uniqueId,
        categoryId: categoryId,
        subcategoryId: subcategoryId,
        typeActivity: PRODUCT,
      };

      setAddSwitcher(false);
      dispatch(addSingleInstance(insertData));
    }
  }, [addSwitcher]);

  // fetching list of product categories from DB
  useEffect(() => {
    if (productCatList.length === EMPTY_LIST) {
      dispatch(getProductCat());
    }
  }, [dispatch, productCatList.length]);

  // fetching list of product subcategories from DB
  useEffect(() => {
    if (switcher && categoryId) {
      setSwitcher(false);
      dispatch(getSubproductCat({ categoryId }));
    }
  }, [dispatch, categoryId, switcher]);

  useEffect(() => {
    if (switcher) {
      setSwitcher(false);
      setCurrentProductCatList(
        productCatList.filter((cat) => cat.language === selectedLgn)
      );
    }
  }, [dispatch, switcher]);

  // useEffect(() => {
  //   if (switcher) {
  //     setSwitcher(false);
  //     console.log("działa switcher i jest spełniony warunek");
  //   }
  // }, [dispatch, switcher]);

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        padding: "2rem",
        borderRadius: "0.5rem",
        minHeight: "50vh",
      }}
    >
      <BackButton />
      {activity === EDIT ? (
        <div style={title}>{t("ProductsActivity_edit_title")}</div>
      ) : (
        <div style={title}>{t("ProductsActivity_add_title")}</div>
      )}

      <form onSubmit={handleSubmit}>
        <FormLayout col={TWO}>
          {inputs.map((input, index) => {
            if (index === 0) {
              return (
                <FormInput
                  key={input.id}
                  onChange={onChange}
                  value={values[input.name]}
                  {...input}
                />
              );
            }
            if (index >= 1) {
              return (
                <SelectOption
                  key={input.id}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  optionsList={input.optionsList}
                  disabled={input.disabled}
                  emptyValueError={emptyValueError}
                  onChange={
                    input.name === "language"
                      ? selectLngHandler
                      : input.name === "ProductCategory"
                      ? selectProductCatHandler
                      : selectProductSubcatHandler
                  }
                />
              );
            }
          })}
        </FormLayout>
        <UploadImage />
        {/* {imageRender && activity === EDIT && result.photo !== null && (
          <ImageDisplayer imageSrc={result.photo} />
        )} */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {activity === EDIT ? (
            <button type="submit" style={changeBtn}>
              {t("btn-change")}
            </button>
          ) : (
            <button style={addBtn}>{t("btn-add")}</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductsActivity;
