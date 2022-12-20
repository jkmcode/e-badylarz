import React, { useState, useEffect } from "react";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import useBackToLogin from "../component/useBackToLogin";

import {
  Table,
  Button,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function AdminAddProducts() {
  useBackToLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [categoryRequired, setCategoryRequired] = useState("");
  const zero = "0";

  const loading = false;
  const error = false;

  const onSubmit = (data) => {
    console.log("działa", data.productCategory);
    console.log("productName", data.productName);
    if (data.productCategory === zero) {
      setCategoryRequired("Pole wymagane");
    }
  };

  const selectHandler = () => {
    console.log("wybrana katgoria");
  };

  const uploadFilesHandler = () => {
    console.log("wybrane zdjęcie");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <div className="d-flex justify-content-center display-6">
            {t("AdminAddProducts_title")}
          </div>
          <Form
            className="container bg-container mt-3 mb-3 p-4 rounded"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group>
              <Form.Label className="form-msg-style ms-2">
                {t("AdminAddProducts_label_productCategory")}
              </Form.Label>
              <Form.Select
                name="productCategory"
                {...register("productCategory")}
                onChange={selectHandler}
              >
                <option key="1">Warzywa</option>
                <option key="2">Owoce</option>
                <option key="3">Mięso</option>
              </Form.Select>
              {categoryRequired ? <p>{categoryRequired}</p> : null}
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-msg-style ms-2">
                {t("AdminAddProducts_label_productCategory")}
              </Form.Label>
              <Form.Select
                name="productCategory"
                {...register("productCategory")}
                onChange={selectHandler}
              >
                <option key="1">Warzywa</option>
                <option key="2">Owoce</option>
                <option key="3">Mięso</option>
              </Form.Select>
              {categoryRequired ? <p>{categoryRequired}</p> : null}
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-msg-style ms-2">
                {t("AdminAddProducts_label_productCategory")}
              </Form.Label>
              <Form.Select
                name="productCategory"
                {...register("productCategory")}
                onChange={selectHandler}
              >
                <option key="1">Warzywa</option>
                <option key="2">Owoce</option>
                <option key="3">Mięso</option>
              </Form.Select>
              {categoryRequired ? <p>{categoryRequired}</p> : null}
            </Form.Group>
            {/* <Form.Group controlId="productName">
              <Form.Label className="form-msg-style ms-2">
                {t("AdminAddProducts_label_name")}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t("AdminAddProducts_name_placeholder")}
                {...register("productName", {
                  required: t("Form_field_required"),
                  pattern: {
                    value: /^[A-Za-z1-9ąćĆęłŁńóżŻźŹ ]+$/,
                    message: t("Form_letters_pl_and_digits"),
                  },
                  minLength: {
                    value: 6,
                    message: t("Form_minLength_6"),
                  },
                  maxLength: {
                    value: 30,
                    message: t("Form_maxLength_30"),
                  },
                })}
                onKeyUp={() => {
                  trigger("productName");
                }}
                name="productName"
              ></Form.Control>
              {errors.productName && (
                <div className="text-danger form-msg-style">
                  {errors.productName.message}
                </div>
              )}
            </Form.Group> */}
            <Form.Group controlId="desc">
              <Form.Label className="form-msg-style ms-2">
                {t("AdminAddProducts_label_desc")}
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder={t("DistrictAddDescription_placeholder_desc")}
                {...register("desc", {
                  maxLength: {
                    value: 255,
                    message: t("Form_maxLength_255"),
                  },
                })}
                onKeyUp={() => {
                  trigger("desc");
                }}
                name="desc"
              ></Form.Control>
              {errors.desc && (
                <div className="text-danger form-msg-style">
                  {errors.desc.message}
                </div>
              )}
            </Form.Group>

            <Form.Group
              controlId="formFileMultiple"
              className="btn-img-upload rounded mb-3"
              onChange={uploadFilesHandler}
            >
              <Form.Label>
                {t("AdminAddProducts_label_choose_photos")}
              </Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="success" className="rounded my-3 ">
                {t("btn-add")}
              </Button>
            </div>
          </Form>
        </>
      )}
    </>
  );
}

export default AdminAddProducts;
