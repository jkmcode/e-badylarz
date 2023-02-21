import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import UploadImage from "../component/UploadImage";
import BackButton from "./BackButton";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addProductSubcat } from "../actions/productActions";
import { InsertImage2 } from "../actions/adminActions";
import { v4 as uuidv4 } from "uuid";
import { title, addBtn } from "./AdminCSS";
import { PRODUCT_SUBCAT } from "../constants/adminConstans";

function AddProductSubcategories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const newId = uuidv4();
  const params = useParams();
  const subcategoryId = Number(params.id);

  const [values, setValues] = useState({
    name: "",
  });
  const [switcher, setSwitcher] = useState(false);
  const [uniqueId, setUniqueId] = useState("");

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const newProductSubCat = useSelector((state) => state.addSubproductCatList);
  const { success } = newProductSubCat;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setSwitcher(true);
    setUniqueId(newId);
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
      required: true,
    },
  ];

  //Comment
  //This code is a React useEffect hook that triggers whenever the value of switcher changes.
  //It defines an insertData object and dispatches an action using the addProductSubcat action creator with insertData as the argument.
  //It also updates the state of switcher to false using setSwitcher(false).
  useEffect(() => {
    if (switcher) {
      const insertData = {
        name: values.name,
        creator: userInfo.id,
        uniqueId: uniqueId,
        subcategoryId: subcategoryId,
      };

      setSwitcher(false);

      dispatch(addProductSubcat(insertData));
    }
  }, [switcher]);

  // add/edit photo
  useEffect(() => {
    if (success) {
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
  }, [success]);

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
      <div style={title}>{t("AddProductSubcategories_title")}</div>

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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={addBtn}>{t("btn-add")}</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductSubcategories;
