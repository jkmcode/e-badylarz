import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import AddDescription from "./AddDescription";
import { Row, Col, Button, Form } from "react-bootstrap";
import { addProductType } from "../actions/adminActions";
import InfoWindow from "../component/infoWindow";
import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";
import {
  PRODUCT_TYPE_DESCRIPTION,
  SET_WINDOW_FLAG_DELETE,
} from "../constants/adminConstans";

function AddProductType() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const data = useSelector((state) => state.addProductType);
  const { loading, error, success, result } = data;

  // const successDesc = useSelector((state) => state.addDistrictDesc);
  // const { success: successDescription } = successDesc;

  const d2flag = useSelector((state) => state.windowFlag);
  const { windowFlag } = d2flag;

  const [idNewTypeProduct, setIdNewTypeProduct] = useState("");
  const [addDescription, setAddDescription] = useState(false);

  useEffect(() => {
    console.log("przed if");
    if (success) {
      console.log("w if");
      setTimeout(() => {
        setIdNewTypeProduct(result.id);
        setAddDescription(true);
        console.log("w setTimeOut");
      }, TIME_SET_TIMEOUT);
    }
  }, [success]);

  const onSubmit = (data) => {
    const insertData = {
      name: data.productTypeName,
      creator: userInfo.id,
    };
    dispatch(addProductType(insertData));
  };

  // useEffect(() => {
  //   if (successDescription) {
  //     dispatch({ type: SET_WINDOW_FLAG_DELETE });
  //   }
  // }, [successDescription]);

  console.log("success", success);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? (
            <ErrorMessage msg={error} timeOut={TIME_SET_TIMEOUT} />
          ) : null}
          {addDescription ? (
            <InfoWindow
              title={t("Window_title")}
              body={t("AddCity_body_window")}
            />
          ) : null}
          <Row className="align-items-center">
            <Col>
              <Link
                to={`/dashboard/productsType/products-type`}
                className="text-secondary"
              >
                {t("btn-return")}
              </Link>
            </Col>
          </Row>
          <div className="d-flex justify-content-center display-6">
            {t("AddProductType_title")}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="productTypeName">
              <Form.Label className="form-msg-style ms-2">
                {t("AddProductType_label_name")}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t("AdminAddProducts_name_placeholder")}
                {...register("productTypeName", {
                  required: t("Form_field_required"),
                  pattern: {
                    value: /^[A-Za-z1-9ąćĆęłŁńóżŻźŹ]+$/,
                    message: t("Form_blank_space_is_not_allow"),
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
                  trigger("productTypeName");
                }}
                name="productTypeName"
              ></Form.Control>
              {errors.productTypeName && (
                <div className="text-danger form-msg-style">
                  {errors.productTypeName.message}
                </div>
              )}
            </Form.Group>
            <div className="d-flex justify-content-end">
              {/* {windowFlag ? (
              ) : null} */}

              <Button type="submit" variant="success" className="rounded my-3 ">
                {t("btn-add")}
              </Button>
            </div>
          </Form>
          {windowFlag ? (
            <AddDescription
              objId={idNewTypeProduct}
              descType={PRODUCT_TYPE_DESCRIPTION}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default AddProductType;
