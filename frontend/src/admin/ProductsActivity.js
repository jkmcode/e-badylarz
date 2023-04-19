import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import BackButton from "./BackButton";
import UploadImage from "../component/UploadImage";
import SelectOption from "./SelectOption";
import ImageDisplayer from "./ImageDisplayer";
import ErrorMessage from "../component/ErrorMessage";
import language from "../language";
import { getProductCat, getSubproductCat } from "../actions/productActions";
import {
  addSingleInstance,
  updateSingleInstance,
  InsertImage2,
  getSingleInstance,
} from "../actions/adminActions";
import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";
import {
  DELETE_IMAGE_REDUX,
  SET_FLAG_ADD_TRUE,
  ADD_IMAGE_RESET,
  GET_LIST_OF_DATA_DELETE,
  ADD_SINGLE_INSTANCE_DELETE,
  UPDATE_SINGLE_INSTANCE_DELETE
} from "../constants/adminConstans";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { title, changeBtn, addBtn, FormLayout } from "./AdminCSS";
import {
  EDIT,
  ADD,
  TWO,
  EMPTY_LIST,
  PRODUCT,
} from "../constants/environmentConstans";

import {
  LONG_NAME_PATTERN,
} from "../constants/formValueConstans";

function ProductsActivity() {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const activity = params.activity;
  const editProductId = Number(params.id);
  const newId = uuidv4();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
  });
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  const [editSwitcher, setEditSwitcher] = useState(false);
  const [selectedLgn, setSelectedLng] = useState(0);
  const [subcategoryId, setSubcategoryId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [currentProductCatList, setCurrentProductCatList] = useState([]);
  const [addSwitcher, setAddSwitcher] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [imageRender, setImageRender] = useState(false);

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dflag = useSelector((state) => state.flag);
  const { addFlag } = dflag;

  const productCatListRedux = useSelector((state) => state.productCatList);
  const { loading: loadingProductCat, productCatList } = productCatListRedux;

  const subproductSubcatListRedux = useSelector(
    (state) => state.subproductCatList
  );
  const { subproductCatList } = subproductSubcatListRedux;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  const insertImageReducer = useSelector((state) => state.insertImage);
  const { successInsertImage } = insertImageReducer;

  const newProduct = useSelector((state) => state.addSingleInstance);
  const {
    success: successNewProduct,
    result: newProductResult,
    loading: loadingNewProduct } = newProduct;

  const updateProduct = useSelector((state) => state.updateSingleInstance);
  const { success: successUpdateProduct, loading: loadingUpdateProduct } = updateProduct;

  const singleSingleRedux = useSelector((state) => state.getSingleInstance);
  const { result: resultSingleInstance, success: successSingleInstance } =
    singleSingleRedux;

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity === ADD) {
      setAddSwitcher(true);
      setUniqueId(newId);
    }

    if (activity === EDIT) {
      setEditSwitcher(true);
      setUniqueId(newId);
    }
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
      pattern: LONG_NAME_PATTERN,
      defaultValue:
        activity === ADD
          ? ""
          : successSingleInstance && activity === EDIT
            ? resultSingleInstance.name
            : "",
      required: true,
    },
    {
      id: "2",
      name: t("ProductsActivity_input_name_language"),
      label: t("ProductsActivity_input_label_language"),
      optionsList: language,
      defaultValue:
        activity === ADD
          ? t("default_option_lng")
          : successSingleInstance && activity === EDIT
            ? resultSingleInstance.id_product_subtype.id_product_type.language
            : "",
      disabled: activity === ADD && values.name.length < 4 && true,
      disabled: activity === EDIT,
    },
    {
      id: "3",
      name: t("ProductsActivity_input_name_product_cat"),
      label: t("ProductsActivity_input_label_product_cat"),
      optionsList: currentProductCatList.filter((i) => i.is_active === true),
      defaultValue:
        activity === ADD
          ? t("default_option_product_cat")
          : successSingleInstance && activity === EDIT
            ? resultSingleInstance.id_product_subtype.id_product_type.name
            : "",
      disabled: activity === ADD && !selectedLgn && true,
      disabled: activity === EDIT,
    },
    {
      id: "4",
      name: t("ProductsActivity_input_name_product_subcat"),
      label: t("ProductsActivity_input_label_product_subcat"),
      optionsList: subproductCatList.filter((i) => i.is_active === true),
      defaultValue:
        activity === ADD
          ? t("default_option_product_cat")
          : successSingleInstance && activity === EDIT
            ? resultSingleInstance.id_product_subtype.name
            : "",
      disabled: activity === ADD && !categoryId && true,
      disabled: activity === EDIT,
    },
  ];

  //Comment
  //Inside the function, it checks if success is true, and if it is,
  //it schedules two dispatch actions to occur after a specified delay using the setTimeout method.
  //The first dispatched action sets the SET_FLAG_ADD_TRUE flag in the Redux store (it trigger other useEffet which navigate to the main dashoboard),
  useEffect(() => {
    dispatch({ type: DELETE_IMAGE_REDUX });
    if (successInsertImage) {
      setTimeout(() => {
        dispatch({ type: SET_FLAG_ADD_TRUE });
        dispatch({ type: ADD_IMAGE_RESET });
        dispatch({ type: GET_LIST_OF_DATA_DELETE });
      }, TIME_SET_TIMEOUT);
    }
    if (successNewProduct) {
      setTimeout(() => {
        dispatch({ type: GET_LIST_OF_DATA_DELETE });
        dispatch({ type: ADD_SINGLE_INSTANCE_DELETE });
        navigate(`/dashboard/products`);
      }, TIME_SET_TIMEOUT)
    }
    if (successUpdateProduct) {
      setTimeout(() => {
        dispatch({ type: GET_LIST_OF_DATA_DELETE });
        dispatch({ type: UPDATE_SINGLE_INSTANCE_DELETE });
        navigate(`/dashboard/products`);
      }, TIME_SET_TIMEOUT)
    }
  }, [successInsertImage, successNewProduct, successUpdateProduct]);

  //Comment
  //navigate to main dashboard
  useEffect(() => {
    if (addFlag) {
      navigate(`/dashboard/products`);
    }
  }, [addFlag]);

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

    if (editSwitcher) {
      const insertData = {
        name: values.name,
        modifier: userInfo.id,
        Id: editProductId,
      };
      setEditSwitcher(false);
      dispatch(updateSingleInstance(insertData));
    }
  }, [addSwitcher, editSwitcher]);

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

  //Comment
  // This useEffect hook dispatches a Redux action to insert an image if the 'successNewProduct' state variables are true and the 'isImage' variable is also true.
  // It passes the 'imageUpload' and 'uniqueId' values to the InsertImage2 action creator along with the 'type' parameter set to 'PRODUCT'.
  // If we create image for new product we are creating, our uniqueId is id from created product (newProductResult).
  useEffect(() => {
    if (successNewProduct || successSingleInstance) {
      if (isImage) {
        dispatch(
          InsertImage2({
            imageUpload: imageUpload,
            uniqueId: successNewProduct
              ? newProductResult.id
              : resultSingleInstance.id,
            type: PRODUCT,
          })
        );
      }
    }
  }, [successNewProduct, successSingleInstance, editSwitcher]);

  // Comment
  // Use effect to fetch subcategory data from the database when editing,
  // Only runs once on component mount due to empty dependency array.
  useEffect(() => {
    dispatch({ type: DELETE_IMAGE_REDUX });
    setImageRender(true);
    if (activity === EDIT) {
      dispatch(
        getSingleInstance({
          Id: editProductId,
          typeActivity: "PRODUCT",
        })
      );
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        padding: "2rem",
        borderRadius: "0.5rem",
        minHeight: "50vh",
      }}
    >
      {successNewProduct && (
        <ErrorMessage
          msg={t("ProductCategories_msg_add_success")}
          timeOut={TIME_SET_TIMEOUT}
          variant="success"
          success={true}
        />
      )}
      {successInsertImage && (
        <ErrorMessage
          msg={t("EditSubProduct_msg_edit_success")}
          timeOut={TIME_SET_TIMEOUT}
          variant="success"
          success={true}
        />
      )}
      {successUpdateProduct && (
        <ErrorMessage
          msg={t("EditSubProduct_msg_edit_success")}
          timeOut={TIME_SET_TIMEOUT}
          variant="success"
          success={true}
        />
      )}

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
        {imageRender && activity === EDIT && resultSingleInstance.photo && (
          <ImageDisplayer imageSrc={resultSingleInstance.photo} />
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
      </form>
    </div>
  );
}

export default ProductsActivity;
