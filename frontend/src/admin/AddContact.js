import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Table } from "react-bootstrap";
import { addContact } from "../actions/adminActions";
import { FormLayout, activeBadge, submitBtn, editBtn } from "./AdminCSS";
import FormInput from "./FormInput";
import TextareaWithValidation from "./TextareaWithValidation";
import useResponsive from "../component/useResponsive";
import Divider from "./Divider";
import {
  getShopContacts,
  getShops,
  getShopSpots,
} from "../actions/adminActions";
import { unOrActiveList } from "../actions/adminActions";
import { Icon } from "@iconify/react";
import InfoWindow from "../component/infoWindow";
import rocket from "../images/rocket.png";
import {
  SHOP_CONTACT_DESCRIPTION,
  SHOP_SPOT_DESCRIPTION,
  GET_CONTACT_LIST_DELETE,
  GET_SOPTS_LIST_DELETE,
  GET_SHOP_DELETE,
  SET_WINDOW_FLAG_DELETE,
} from "../constants/adminConstans";

import { TWO, ONE_TO_TWO } from "../constants/environmentConstans";

import {
  NUMBERS_AND_NATIONAL_LETTERS,
  ONLY_NUMBER,
  EMAIL_FORMAT,
} from "../constants/formValueConstans";

function AddContact() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const containerRef = useRef(null);

  const { t } = useTranslation();
  const { windowWidth } = useResponsive();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const shopId = Number(params.id);

  const [space, setSpace] = useState("  ");

  const [newContact, setNewContact] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [idContact, setIdContact] = useState();
  const [idContactActive, setIdContactActive] = useState();
  const [activeContact, setActiveContact] = useState(true);

  const [newSpot, setNewSpot] = useState(false);
  const [editSpot, setEditSpot] = useState(false);
  const [idSpot, setIdSpot] = useState();
  const [idSpotActive, setIdSpotActive] = useState();
  const [activeSpot, setActiveSpot] = useState(true);

  const [infoWindowFlag, setInfoWindowFlag] = useState(false);
  // if contactOrSpot is true -> contact else - spot
  const [contactOrSpot, setContactOrSpot] = useState(true);

  // data from redux
  const contactListRedux = useSelector((state) => state.contactList);
  const { ListOfContact, loading, error } = contactListRedux;

  const contactActivRedux = useSelector((state) => state.unOrActiveDescription);
  const {
    loading: activeLoading,
    error: activeError,
    success,
  } = contactActivRedux;

  const shopListRedux = useSelector((state) => state.shopList);
  const {
    shopList,
    loading: shopListLoading,
    error: shopListError,
  } = shopListRedux;

  const spotListRedux = useSelector((state) => state.shopSpotsList);
  const {
    shopSpotList,
    successAdd,
    loading: spotListLoading,
    error: spotListError,
  } = spotListRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const shopFlagVar = useSelector((state) => state.windowFlag);
  const { windowFlag } = shopFlagVar;

  const unActiveHandler = (id) => {
    setInfoWindowFlag(true);
    setIdContactActive(id);
    setContactOrSpot(true);
  };

  const unActiveSpotHandler = (id) => {
    setInfoWindowFlag(true);
    setIdSpotActive(id);
    setContactOrSpot(false);
  };

  const activeHandler = (id) => {
    setInfoWindowFlag(true);
    setIdContactActive(id);
    setContactOrSpot(true);
  };

  const activeSpotHandler = (id) => {
    setInfoWindowFlag(true);
    setIdSpotActive(id);
    setContactOrSpot(false);
  };

  const newHendler = () => {
    setEditContact(false);
    setNewContact(!newContact);
    reset({});
  };

  const newHendlerSpot = () => {
    navigate(`/dashboard/shops/spot/${shopId}/add`);
  };

  const editShopHandler = () => {
    navigate(`/dashboard/shops/${shopId}/edit`);
  };

  const editSpotHandler = (id) => {
    navigate(`/dashboard/shops/spot/${shopId}/edit/${id}`);
  };

  const editHandler = (id) => {
    setNewContact(true);
    setEditContact(true);
    ListOfContact.map((i) => {
      if (i.id === id) {
        setIdContact(id);
        reset({
          firstName: i.name,
          surname: i.surname,
          email: i.email,
          phone: i.phone,
          description: i.description,
        });
      }
    });
  };
  // Change status contact & spot and close infoWindow
  useEffect(() => {
    if (contactOrSpot) {
      if ((windowFlag === true) & activeContact) {
        console.log(
          "windowFlag --> ",
          windowFlag,
          "activeContact-->",
          activeContact
        );
        dispatch(
          unOrActiveList({
            Id: idContactActive,
            shop_id: shopId,
            active: false,
            userId: userInfo.id,
            objType: SHOP_CONTACT_DESCRIPTION,
            kind: "Inactive contact",
          })
        );
      }
      if ((windowFlag === true) & !activeContact) {
        console.log(
          "windowFlag --> ",
          windowFlag,
          "activeContact-->",
          activeContact
        );
        dispatch(
          unOrActiveList({
            Id: idContactActive,
            shop_id: shopId,
            active: true,
            userId: userInfo.id,
            objType: SHOP_CONTACT_DESCRIPTION,
            kind: "Active contact",
          })
        );
      }
    } else {
      if ((windowFlag === true) & !activeSpot) {
        console.log(
          "windowFlag --> ",
          windowFlag,
          "activeSpot-->",
          activeContact
        );
        dispatch(
          unOrActiveList({
            Id: idSpotActive,
            shop_id: shopId,
            active: true,
            userId: userInfo.id,
            objType: SHOP_SPOT_DESCRIPTION,
            kind: "Active spot",
          })
        );
      }
      if ((windowFlag === true) & activeSpot) {
        console.log(
          "windowFlag --> ",
          windowFlag,
          "activeSpot-->",
          activeContact
        );
        dispatch(
          unOrActiveList({
            Id: idSpotActive,
            shop_id: shopId,
            active: false,
            userId: userInfo.id,
            objType: SHOP_SPOT_DESCRIPTION,
            kind: "Inactive spot",
          })
        );
      }
    }

    setInfoWindowFlag(false);
  }, [dispatch, windowFlag]);

  // Delete contact list after activation or deactivation
  useEffect(() => {
    if (success) {
      dispatch({ type: GET_CONTACT_LIST_DELETE });
      dispatch({ type: SET_WINDOW_FLAG_DELETE });
      dispatch({ type: GET_SOPTS_LIST_DELETE });
    }
  }, [dispatch, success]);

  //   // Delete spots list after activation or deactivation
  // useEffect(() => {

  //       dispatch({ type: GET_CONTACT_LIST_DELETE });

  // }, []);

  // fetching list of contact & spots from DB
  useEffect(() => {
    if (ListOfContact.length === 0) {
      dispatch(getShopContacts({ Id: shopId }));
    }
    if (shopSpotList.length === 0) {
      dispatch(getShopSpots({ Id: shopId }));
    }
  }, [dispatch, ListOfContact.length, shopSpotList.length]);

  // fetching shop from DB
  useEffect(() => {
    if (shopList.length === 0) {
      dispatch(getShops());
    }
  }, [dispatch, shopList.length]);

  useEffect(() => {
    dispatch({ type: GET_SOPTS_LIST_DELETE });
    dispatch({ type: GET_CONTACT_LIST_DELETE });
  }, []);

  const onSubmit = (data) => {
    if (editContact) {
      const insertData = {
        shop_id: shopId,
        Id: idContact,
        editing: true,
        firstName: values.firstName,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        description: values.description,
        creator: userInfo.id,
        modifier: userInfo.id,
      };
      setEditContact(false);
      setNewContact(false);
      dispatch(addContact(insertData));
    } else {
      const insertData = {
        shop_id: shopId,
        editing: false,
        firstName: data.firstName,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        description: data.description,
        creator: userInfo.id,
        modifier: userInfo.id,
      };
      setNewContact(false);
      setEditContact(false);
      dispatch(addContact(insertData));
    }
  };

  // style

  const mainContainer = {
    backgroundImage: `linear-gradient(145deg, rgba(219, 219, 219, 1) 0%, rgba(149, 149, 149, 1) 100%)`,
    marginTop: "1rem",
    padding: "2rem 0.5rem",
    borderRadius: "0.25rem",
  };

  const contactContainer = {
    ...mainContainer,
    height: "500px",
  };

  const listContainer = {
    ...mainContainer,
    overflowX: "auto",
  };

  const subtitle = {
    color: "#6c757d",
    fontSize: "calc(0.925rem + 0.1vw)",
    fontWeight: "500",
  };

  const mainDataSection = {
    color: "#212529",
    fontSize: `calc(1.1rem + 0.1vw)`,
    fontWeight: "500",
  };

  const changeBtn = {
    width: "40%",
    minWidth: "300px",
    borderRadius: "0.5rem",
    border: "none",
    padding: "0.5rem",
    marginTop: "1rem",
    backgroundImage: `linear-gradient(183deg, rgb(236, 181, 26) 0%, rgb(217, 196, 33) 100%)`,
    color: "white",
    fontWeight: "500",
  };

  const btn = {
    fontSize: "0.8rem",
    fontWeight: "700",
    border: "none",
    borderRadius: "0.25rem",
    padding: "0.5rem",
    minWidth: "100px",
  };

  const btnNewContact = {
    ...btn,
    color: "green",
  };

  const btnShowUnactive = {
    ...btn,
    color: "red",
  };

  const table = {
    width: "100%",
    backgroundImage: `linear-gradient(183deg, rgb(236, 181, 26) 0%, rgb(217, 196, 33) 100%)`,
    borderCollapse: `collapse`,
  };

  const tableHeader = {
    borderBottom: `3px solid rgb(219, 219, 219)`,
    padding: "1rem",
  };

  const tableCell = {
    padding: "0.75rem",
    verticalAlign: "middle",
    borderTop: "2px solid rgb(219, 219, 219)",
    borderRight: "2px solid rgb(219, 219, 219)",
  };

  const tableCellNoBorderRight = {
    ...tableCell,
    borderRight: "none",
  };

  const btnTable = {
    backgroundColor: "white",
    border: "none",
    fontWeight: 600,
    borderRadius: "0.25rem",
    fontSize: "0.85rem",
  };

  const btnUnactive = {
    ...btnTable,
    color: "red",
  };

  const btnEdit = {
    ...btnTable,
    color: "#dec314",
  };

  const btnActive = {
    ...btnTable,
    color: "green",
  };

  const [values, setValues] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    description: "",
  });

  const inputs = [
    {
      id: "1",
      name: "firstName",
      type: "text",
      placeholder: t("AddContact_name_placeholder"),
      errorMessage: t("AddContact_name_error_message"),
      label: t("AddContact_label_name"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,20}$",
      required: true,
    },
    {
      id: "2",
      name: "surname",
      type: "text",
      placeholder: t("AddContact_surname_placeholder"),
      errorMessage: t("AddContact_surname_error_message"),
      label: t("AddContact_label_surname"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,20}$",
      required: true,
    },
    {
      id: "3",
      name: "email",
      type: "text",
      placeholder: t("AddContact_email_placeholder"),
      errorMessage: t("AddContact_email_error_message"),
      label: t("AddContact_label_email"),
      pattern:
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[.][a-zA-Z]{2,3}",
      required: true,
    },
    {
      id: "4",
      name: "phone",
      type: "tel",
      placeholder: t("AddContact_phone_placeholder"),
      errorMessage: t("AddContact_phone_error_message"),
      label: t("AddContact_label_phone"),
      pattern: "^(?:(\\+\\d{2})\\s?)?\\d{3}\\s?\\d{3}\\s?\\d{3}$",
      required: true,
    },
    {
      id: "5",
      name: "description",
      placeholder: t("AddContact_description_placeholder"),
      errorMessage: t("AddContact_description_error_message"),
      label: t("AddContact_description"),
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeTextArea = (descValue) => {
    setValues({ ...values, description: descValue });
  };

  return (
    <div
      ref={containerRef}
      style={{
        backgroundImage: `url(${rocket})`,
        backgroundPosition: "center",
        backgroundSize: "80%",
        height: "auto",
        padding: "1rem",
      }}
    >
      {loading || activeLoading || shopListLoading || spotListLoading ? (
        <Loader />
      ) : (
        <>
          {infoWindowFlag & contactOrSpot ? (
            <InfoWindow
              title={t("Window_title")}
              body={
                !activeContact
                  ? t("AdminShops_activate_shop_InfoWindow_body")
                  : t("AdminShops_inactivate_shop_InfoWindow_body")
              }
            />
          ) : null}
          {infoWindowFlag & !contactOrSpot ? (
            <InfoWindow
              title={t("Window_title")}
              body={
                !activeSpot
                  ? t("AdminShops_activate_shop_InfoWindow_body")
                  : t("AdminShops_inactivate_shop_InfoWindow_body")
              }
            />
          ) : null}
          <FormLayout col={TWO} ratio={ONE_TO_TWO}>
            {/* Main Data About Company */}
            <div style={contactContainer}>
              {error ? (
                <ErrorMessage msg={error} timeOut={4000} />
              ) : activeError ? (
                <ErrorMessage msg={activeError} timeOut={4000} />
              ) : shopListError ? (
                <ErrorMessage msg={shopListError} timeOut={4000} />
              ) : spotListError ? (
                <ErrorMessage msg={spotListError} timeOut={4000} />
              ) : null}

              {/* Main Data */}
              <>
                <Link to="/dashboard/shops/" style={{ color: "black" }}>
                  <Icon icon="ion:arrow-back" />
                  {t("btn-return")}
                </Link>
                <div
                  style={{ textAlign: "center", fontSize: `calc(1rem + 1vw)` }}
                >
                  <div style={{ paddingLeft: "1rem", paddingRigth: "1rem" }}>
                    {t("AddContact_main_data")}
                  </div>
                </div>
                {shopList.length !== 0 &&
                  shopList.map((shop) => {
                    if (shop.id === shopId) {
                      return (
                        <div>
                          <div style={subtitle}>
                            {t("AddContact_name")}:
                            <div style={mainDataSection}>{shop.name}</div>
                          </div>
                          <div style={subtitle}>
                            {t("AddContact_nip")}:
                            <div style={mainDataSection}>{shop.nip}</div>
                          </div>
                          <div style={subtitle}>
                            {t("AddContact_address")}:
                            <div style={mainDataSection}>
                              {shop.city} {shop.no_building}, {shop.post_code}{" "}
                              {shop.post}
                            </div>
                          </div>
                          <div style={subtitle}>
                            {t("AddContact_GPS")}:
                            <div style={mainDataSection}>
                              {shop.latitude}, {shop.longitude}
                            </div>
                          </div>
                          <div style={subtitle}>
                            {t("AddContact_bank")}:
                            <div style={mainDataSection}>
                              {shop.bank_account}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              style={changeBtn}
                              onClick={() => editShopHandler()}
                            >
                              {t("btn-change")}
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
              </>
            </div>

            <div style={listContainer}>
              {/* Contact table */}
              <>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: `calc(1rem + 0.7vw)`,
                  }}
                >
                  <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                    {t("AddContact_contactList")}
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button style={btnNewContact} onClick={() => newHendler()}>
                    {!newContact
                      ? t("AddContact_btn_add")
                      : editContact
                      ? t("AddContact_btn_close_edit")
                      : t("AddContact_btn_close")}
                  </button>

                  <button
                    style={btnShowUnactive}
                    onClick={() => setActiveContact(!activeContact)}
                  >
                    {activeContact
                      ? t("AddContact_show_unactive")
                      : t("AddContact_show_active")}
                  </button>
                </div>
                <div
                  style={{
                    overflowY: "auto",
                    height: "200px",
                    marginTop: "1rem",
                  }}
                >
                  <table style={table}>
                    <thead>
                      <tr>
                        <th style={tableHeader}>{t("AddContact_name")}</th>
                        <th style={tableHeader}>{t("AddContact_phone")}</th>
                        <th style={tableHeader}>{t("AddContact_email")}</th>
                        <th style={tableHeader}>{t("AdminShops_status")}</th>
                        <th style={tableHeader}></th>
                        <th style={tableHeader}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ListOfContact.length !== 0 ? (
                        ListOfContact.map((contact) => (
                          <tr key={contact.id}>
                            {contact.is_active & activeContact ? (
                              <>
                                <td style={tableCell}>
                                  {contact.name} {contact.surname}
                                </td>
                                <td style={tableCell}>{contact.phone}</td>
                                <td style={tableCell}>{contact.email}</td>
                                <td style={tableCellNoBorderRight}>
                                  <span style={activeBadge}>
                                    {t("status_active")}
                                  </span>
                                </td>
                                <td style={tableCellNoBorderRight}>
                                  <button
                                    style={btnUnactive}
                                    onClick={() => unActiveHandler(contact.id)}
                                  >
                                    {t("btn_unactive")}
                                  </button>
                                </td>
                                <td style={tableCellNoBorderRight}>
                                  <button
                                    style={btnEdit}
                                    onClick={() => editHandler(contact.id)}
                                  >
                                    {t("btn_edit")}
                                  </button>
                                </td>
                              </>
                            ) : null}
                            {!contact.is_active & !activeContact ? (
                              <>
                                <td style={tableCell}>
                                  {contact.name} {contact.surname}
                                </td>
                                <td style={tableCell}>{contact.phone}</td>
                                <td style={tableCell}>{contact.email}</td>
                                <td style={tableCellNoBorderRight}>
                                  <span style={activeBadge}>
                                    {t("status_inactive")}
                                  </span>
                                </td>
                                <td style={tableCellNoBorderRight}>
                                  <button
                                    style={btnActive}
                                    onClick={() => activeHandler(contact.id)}
                                  >
                                    {t("btn_active")}
                                  </button>
                                </td>
                              </>
                            ) : null}
                          </tr>
                        ))
                      ) : (
                        <tr
                          style={{
                            margin: "1rem",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {t("No_data")}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>

              {/* Contact form */}
              {newContact ? (
                <>
                  <Divider backgroundColor="grey" />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "1rem",
                      }}
                    >
                      <button
                        style={{ border: "none", borderRadius: "0.25rem" }}
                        onClick={() => setNewContact(!newContact)}
                      >
                        <Icon
                          icon="mdi:close-thick"
                          width="32"
                          height="32"
                          color="red"
                        />
                      </button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      <div className="px-3">
                        {editContact
                          ? t("AddContact_edit_title")
                          : t("AddContact_new_title")}
                      </div>
                    </div>
                    <FormLayout col={TWO}>
                      {inputs.map((input, index) => {
                        if (index <= 3) {
                          return (
                            <FormInput
                              key={input.id}
                              {...input}
                              onChange={onChange}
                            />
                          );
                        }
                      })}
                    </FormLayout>
                    {inputs.map((input, index) => {
                      if (index === 4) {
                        return (
                          <TextareaWithValidation
                            key={input.id}
                            {...input}
                            defaultValue=""
                            onChange={onChangeTextArea}
                          />
                        );
                      }
                    })}

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {editContact ? (
                        <button style={editBtn} type="submit">
                          {t("btn-change")}
                        </button>
                      ) : (
                        <button style={submitBtn} type="submit">
                          {t("btn-add")}
                        </button>
                      )}
                    </div>
                  </form>
                </>
              ) : null}
              <Divider backgroundColor="grey" />

              {/* Spot List */}
              <>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: `calc(1.2rem + 0.7vw)`,
                  }}
                >
                  <div>{t("AddContact_spots_title")}</div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    style={btnNewContact}
                    onClick={() => newHendlerSpot()}
                  >
                    {!newSpot
                      ? t("AddContact_btn_add_spot")
                      : editSpot
                      ? t("AddContact_btn_close_edit_spot")
                      : t("AddContact_btn_close_spot")}
                  </button>

                  <button
                    style={btnShowUnactive}
                    onClick={() => setActiveSpot(!activeSpot)}
                  >
                    {activeSpot
                      ? t("AddContact_show_unactive_spot")
                      : t("AddContact_show_active_spot")}
                  </button>
                </div>
                <div
                  style={{
                    overflowY: "auto",
                    height: "200px",
                    marginTop: "1rem",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      color: "white",
                      backgroundImage: `linear-gradient(178deg, rgba(19, 19, 19, 1) 0%, rgba(105, 105, 106, 1) 89%)`,
                      marginTop: "1rem",
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={tableHeader}>{t("AddContact_name")}</th>
                        <th style={tableHeader}>
                          {t("AddContact_spots_address")}
                        </th>
                        <th style={tableHeader}>{t("AdminShops_status")}</th>
                        <th style={tableHeader}></th>
                        <th style={tableHeader}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {shopSpotList.length !== 0
                        ? shopSpotList.map((spot) => (
                            <tr key={spot.id}>
                              {spot.is_active & activeSpot ? (
                                <>
                                  <td style={tableCell}>{spot.name}</td>
                                  <td style={tableCell}>
                                    <span>
                                      {spot.city.name}, {spot.street}{" "}
                                      {spot.no_building}
                                    </span>
                                  </td>
                                  <td style={tableCellNoBorderRight}>
                                    <span style={activeBadge}>
                                      {t("status_active")}
                                    </span>
                                  </td>
                                  <td style={tableCellNoBorderRight}>
                                    <button
                                      style={btnUnactive}
                                      onClick={() =>
                                        unActiveSpotHandler(spot.id)
                                      }
                                    >
                                      {t("btn_unactive")}
                                    </button>
                                  </td>
                                  <td style={tableCellNoBorderRight}>
                                    <button
                                      style={btnEdit}
                                      onClick={() => editSpotHandler(spot.id)}
                                    >
                                      {t("btn_edit")}
                                    </button>
                                  </td>
                                </>
                              ) : null}
                              {!spot.is_active & !activeSpot ? (
                                <>
                                  <td>{spot.name}</td>
                                  <td>
                                    {spot.city.name},{space}
                                    {spot.street}
                                    {space}
                                    {spot.no_building}
                                  </td>
                                  <td className="align-middle text-center text-sm">
                                    <span className="badge badge-sm bg-gradient-success">
                                      {t("status_inactive")}
                                    </span>
                                  </td>
                                  <td className="align-middle">
                                    <button
                                      style={btnActive}
                                      className="text-xs text-danger"
                                      onClick={() => activeSpotHandler(spot.id)}
                                    >
                                      {t("btn_active")}
                                    </button>
                                  </td>
                                </>
                              ) : null}
                            </tr>
                          ))
                        : t("No_data")}
                    </tbody>
                  </table>
                </div>
              </>
            </div>
          </FormLayout>
        </>
      )}
    </div>
  );
}

export default AddContact;
