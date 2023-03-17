import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import UploadImage from "../component/UploadImage";
import BackButton from "./BackButton";
import ErrorMessage from "../component/ErrorMessage";
import ImageDisplayer from "./ImageDisplayer";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductSubcat,
  getSubcategory,
  updateSubcategory,
} from "../actions/productActions";
import { InsertImage2, getSingleInstance } from "../actions/adminActions";
import { v4 as uuidv4 } from "uuid";
import { title, addBtn, changeBtn } from "./AdminCSS";
import {
  PRODUCT_SUBCAT,
  SET_FLAG_ADD_TRUE,
  DELETE_IMAGE_REDUX,
} from "../constants/adminConstans";
import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";
import {
  ADD_PRODUCT_SUBCAT_DELETE,
  EDIT_PRODUCT_SUBCAT_DELETE,
  GET_PRODUCT_SUBCAT_LIST_DELETE,
} from "../constants/productConstans";
import { EDIT } from "../constants/environmentConstans";

function ProductSubcategoriesActivity() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const newId = uuidv4();
  const navigate = useNavigate();

  const params = useParams();
  const activity = params.activity;
  const subcategoryId = Number(params.id);
  const editSubcategoryId = Number(params.idSubCat);

  const [values, setValues] = useState({
    name: "",
  });
  const [addSwitcher, setAddSwitcher] = useState(false);
  const [editSwitcher, setEditSwitcher] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [imageRender, setImageRender] = useState(false);

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const newProductSubCat = useSelector((state) => state.addSubproductCatList);
  const { success } = newProductSubCat;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  const editsubcatProduct = useSelector((state) => state.editSubproductCat);
  const {
    success: successEditsubcatProduct,
    loading: loadingEditsubcatProduct,
    error: errorEditsubcatProduct,
  } = editsubcatProduct;

  const dflag = useSelector((state) => state.flag);
  const { addFlag } = dflag;

  const singleSingleRedux = useSelector((state) => state.getSingleInstance);
  const { result, success: successSingleInstance } = singleSingleRedux;

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity === "add") {
      console.log("zostaje spełniony warunek");
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
      defaultValue:
        activity === "add"
          ? ""
          : successSingleInstance && activity === EDIT
          ? result.name
          : "",
      required: true,
    },
  ];

  //Comment
  //Inside the function, it checks if success is true, and if it is,
  //it schedules two dispatch actions to occur after a specified delay using the setTimeout method.
  //The first dispatched action sets the SET_FLAG_ADD_TRUE flag in the Redux store (it trigger other useEffet which navigate to the main dashoboard),
  //and the second dispatched action triggers a state update to ADD_PRODUCT_SUBCAT_DELETE in the Redux store.
  //If the success state is true, the function dispatches the ADD_PRODUCT_SUBCAT_DELETE action.
  //If the successEditsubcatProduct state is true, the function dispatches the EDIT_PRODUCT_SUBCAT_DELETE action.
  useEffect(() => {
    if (success || successEditsubcatProduct) {
      setTimeout(() => {
        dispatch({ type: SET_FLAG_ADD_TRUE });
        dispatch({ type: GET_PRODUCT_SUBCAT_LIST_DELETE });
        if (success) {
          dispatch({ type: ADD_PRODUCT_SUBCAT_DELETE });
        } else if (successEditsubcatProduct) {
          dispatch({ type: EDIT_PRODUCT_SUBCAT_DELETE });
        }
      }, TIME_SET_TIMEOUT);
    }
  }, [success, successEditsubcatProduct]);

  //Comment
  //navigate to main dashboard
  useEffect(() => {
    if (addFlag) {
      navigate(`/dashboard/product-categories/${subcategoryId}/subcategories`);
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
        subcategoryId: subcategoryId,
      };

      setAddSwitcher(false);
      dispatch(addProductSubcat(insertData));
    }

    if (editSwitcher) {
      const insertData = {
        name: !values.name ? successSingleInstance.name : values.name,
        modifier: userInfo.id,
        uniqueId: uniqueId,
        editSubcategoryId: editSubcategoryId,
      };

      setEditSwitcher(false);

      dispatch(updateSubcategory(insertData));
    }
  }, [addSwitcher, editSwitcher]);

  //Comment
  // This useEffect hook dispatches a Redux action to insert an image if the 'success' or 'successEditsubcatProduct' state variables are true and the 'isImage' variable is also true.
  // It passes the 'imageUpload' and 'uniqueId' values to the InsertImage2 action creator along with the 'type' parameter set to 'PRODUCT_SUBCAT'.
  // If we edit photo we need current uniqueId for the specific
  // If we edit photo we need current unique Id for the specific product Subcategories
  // If we create image for new subcategory we are creating new unique Id
  useEffect(() => {
    if (success || successEditsubcatProduct) {
      if (isImage) {
        dispatch(
          InsertImage2({
            imageUpload: imageUpload,
            uniqueId: success ? uniqueId : successSingleInstance.uniqueId,
            type: PRODUCT_SUBCAT,
          })
        );
      }
    }
  }, [success, successEditsubcatProduct]);

  // Comment
  // Use effect to fetch subcategory data from the database when editing,
  // Only runs once on component mount due to empty dependency array.
  useEffect(() => {
    dispatch({ type: DELETE_IMAGE_REDUX });
    setImageRender(true);
    if (activity === EDIT) {
      dispatch(
        getSingleInstance({
          Id: editSubcategoryId,
          typeActivity: "subcategory",
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
      {success && (
        <ErrorMessage
          msg={t("ProductCategories_msg_add_success")}
          timeOut={TIME_SET_TIMEOUT}
          variant="success"
          success={true}
        />
      )}

      {successEditsubcatProduct && (
        <ErrorMessage
          msg={t("EditSubProductCategories_msg_edit_success")}
          timeOut={TIME_SET_TIMEOUT}
          variant="success"
          success={true}
        />
      )}
      <BackButton />
      {activity === EDIT ? (
        <div style={title}>{t("EditProductSubcategories_title")}</div>
      ) : (
        <div style={title}>{t("AddProductSubcategories_title")}</div>
      )}

      <form onSubmit={handleSubmit}>
        {inputs.map((input) => {
          return (
            <FormInput
              key={input.id}
              onChange={onChange}
              value={values[input.name]}
              {...input}
            />
          );
        })}
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
      </form>
    </div>
  );
}

export default ProductSubcategoriesActivity;
