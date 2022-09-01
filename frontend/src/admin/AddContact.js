import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { addContact } from "../actions/adminActions";
import { getShopContacts } from "../actions/adminActions";
import { Icon } from "@iconify/react";
import Rocket from "../images/rocket.png";

function AddContact() {
  // TESTOWANIE 123

  // Komentarz KUBA !!!!!!!!!!!!!!!!!!!!!!
  /// takie moje komentarze !!!!!


  // mój komentarz bez commit'a

  // pisze totalne bzdury


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

  const shopId = Number(params.id);

  const loading = false;
  const error = false;

  // data from redux
  const contactListRedux = useSelector((state) => state.contactList);
  const { ListOfContact } = contactListRedux;

  const shopListRedux = useSelector((state) => state.shopList);
  const { shopList, loading: shopLoading, error: shopError } = shopListRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // fetching list of contact from DB
  useEffect(() => {
    if (ListOfContact.length === 0) {
      dispatch(getShopContacts({ Id: shopId }));
    }
  }, [dispatch, ListOfContact.length]);

  const onSubmit = (data) => {
    const insertData = {
      shop_id: shopId,
      firstName: data.firstName,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      creator: userInfo.id,
      modifier: userInfo.id,
    };
    dispatch(addContact(insertData));
  };

  return (
    <div className="full-screen">
      {loading ? (
        <Loader />
      ) : (
        <Row className="gx-0 ">
          <Col lg={6}>
            <div className="mx-2 bg-container mt-5 p-4 rounded">
              {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
              <Link to="/dashboard/shops/shops" className="text-dark h6">
                <Icon icon="ion:arrow-back" />
                {t("btn-return")}
              </Link>
              <div className="d-flex justify-content-center display-6">
                <div className="px-3">{t("AddContact_title")}</div>
                {shopList.length === 0
                  ? null
                  : shopList.filter((shop) => shop.id === shopId)[0].name}
              </div>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={12} lg={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label className="form-msg-style ms-2">
                        {t("AddContact_label_name")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={errors.firstName ? "formInvalid" : null}
                        placeholder={t("AddContact_name_placeholder")}
                        {...register("firstName", {
                          required: t("Form_field_required"),
                          pattern: {
                            value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ ]+$/,
                            message: t("Form_letters_pl_and_digits"),
                          },
                          minLength: {
                            value: 3,
                            message: t("Form_minLength_3"),
                          },
                          maxLength: {
                            value: 50,
                            message: t("Form_maxLength_50"),
                          },
                        })}
                        onKeyUp={() => {
                          trigger("firstName");
                        }}
                        name="firstName"
                      ></Form.Control>
                      {errors.firstName && (
                        <div className="text-danger form-msg-style">
                          {errors.firstName.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={6}>
                    <Form.Group controlId="surname">
                      <Form.Label className="form-msg-style ms-2">
                        {t("AddContact_label_surname")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={errors.surname ? "formInvalid" : null}
                        placeholder={t("AddContact_surname_placeholder")}
                        {...register("surname", {
                          required: t("Form_field_required"),
                          pattern: {
                            value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ ]+$/,
                            message: t("Form_letters_pl_and_digits"),
                          },
                          minLength: {
                            value: 5,
                            message: t("Form_minLength_5"),
                          },
                          maxLength: {
                            value: 50,
                            message: t("Form_maxLength_50"),
                          },
                        })}
                        onKeyUp={() => {
                          trigger("surname");
                        }}
                        name="surname"
                      ></Form.Control>
                      {errors.surname && (
                        <div className="text-danger form-msg-style">
                          {errors.surname.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} lg={6}>
                    <Form.Group controlId="email">
                      <Form.Label className="form-msg-style ms-2">
                        {t("AddContact_label_email")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={errors.email ? "formInvalid" : null}
                        placeholder={t("AddContact_email_placeholder")}
                        {...register("email", {
                          required: t("Form_field_required"),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t("Form_inproper_pattern_email"),
                          },
                        })}
                        onKeyUp={() => {
                          trigger("email");
                        }}
                        name="email"
                      ></Form.Control>
                      {errors.email && (
                        <div className="text-danger form-msg-style">
                          {errors.email.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={6}>
                    <Form.Group controlId="phone">
                      <Form.Label className="form-msg-style ms-2">
                        {t("AddContact_label_phone")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={errors.phone ? "formInvalid" : null}
                        placeholder={t("AddContact_phone_placeholder")}
                        {...register("phone", {
                          required: t("Form_field_required"),
                          pattern: {
                            value: /^[0-9+]+$/,
                            message: t("Form_phone_number"),
                          },
                          minLength: {
                            value: 9,
                            message: t("Form_minLength_9"),
                          },
                          maxLength: {
                            value: 14,
                            message: t("Form_maxLength_14"),
                          },
                        })}
                        onKeyUp={() => {
                          trigger("phone");
                        }}
                        name="phone"
                      ></Form.Control>
                      {errors.phone && (
                        <div className="text-danger form-msg-style">
                          {errors.phone.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    variant="success"
                    className="rounded my-3"
                  >
                    {t("btn-add")}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
          <Col lg={6}>
            <div className="bg-container mt-5 p-4 mx-2 rounded">
              {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
              <div className="d-flex justify-content-center h4">
                <div className="px-3">{t("AddContact_contactList")}</div>
              </div>
              <Table striped hover responsive className="table-sm mt-2">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {ListOfContact.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.surname}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
      <img className="img-contact" src={Rocket}></img>
    </div>
  );
}

export default AddContact;
