import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import BackButton from "./BackButton";
import UploadImage from "../component/UploadImage";
import SelectOption from "./SelectOption";
import language from "../language";
import { getProductCat, getSubproductCat } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { title, changeBtn, addBtn, FormLayout } from "./AdminCSS";
import { EDIT, TWO, EMPTY_LIST } from "../constants/environmentConstans";

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
  const [currentProductCatList, setCurrentProductCatList] = useState([]);

  const productCatListRedux = useSelector((state) => state.productCatList);
  const { loading: loadingProductCat, productCatList } = productCatListRedux;

  const subproductSubcatListRedux = useSelector(
    (state) => state.subproductCatList
  );
  const { subproductCatList } = subproductSubcatListRedux;

  console.log("subproductCatList", subproductCatList);

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("działa handleSubmit");
    // if (activity === "add") {
    //   console.log("zostaje spełniony warunek");
    //   setAddSwitcher(true);
    //   setUniqueId(newId);
    // }

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
    setEmptyValueError(false);
  };

  const selectProductCatHandler = (option) => {
    setSwitcher(true);
    setSubcategoryId(option);
  };

  const selectProductSubcatHandler = (option) => {
    console.log("działa selectProductSubcatHandler", option);
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
      name: "language",
      label: "language",
      optionsList: language,
      defaultValue: t("default_option_lng"),
    },
    {
      id: "3",
      name: "ProductCategory",
      label: "Product category",
      optionsList: currentProductCatList,
      defaultValue: t("default_option_product_cat"),
    },
    {
      id: "4",
      name: "Product subcategory",
      label: "Product subcategory",
      optionsList: subproductCatList,
      defaultValue: t("default_option_product_cat"),
    },
  ];

  // fetching list of product categories from DB
  useEffect(() => {
    if (productCatList.length === EMPTY_LIST) {
      dispatch(getProductCat());
    }
  }, [dispatch, productCatList.length]);

  // fetching list of product subcategories from DB
  useEffect(() => {
    if (switcher && subcategoryId) {
      setSwitcher(false);
      dispatch(getSubproductCat({ subcategoryId }));
    }
  }, [dispatch, subcategoryId, switcher]);

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
