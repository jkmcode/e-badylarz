import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import TableComponent from "./TableComponent";
import { addContact } from "../actions/adminActions";
import useResponsive from "../component/useResponsive";
import AddDescription from "./AddDescription";
import {
  FormLayout,
  activeBadge,
  inactiveBadge,
  submitBtn,
  editBtn,
} from "./AdminCSS";
import FormInput from "./FormInput";
import TextareaWithValidation from "./TextareaWithValidation";
import InfoAlertComponent from "../component/InfoAlertComponent";
import Divider from "./Divider";
import {
  getShopContacts,
  getShops,
  getShopSpots,
} from "../actions/adminActions";
import { unOrActiveList } from "../actions/adminActions";
import { Icon } from "@iconify/react";
import rocket from "../images/rocket.png";
import {
  SHOP_CONTACT_DESCRIPTION,
  SHOP_SPOT_DESCRIPTION,
  SHOP_DESCRIPTION,
  GET_CONTACT_LIST_DELETE,
  GET_SOPTS_LIST_DELETE,
  SET_WINDOW_FLAG_DELETE,
  SET_CITY_FLAG_DESC_TRUE
} from "../constants/adminConstans";

import { TWO, ONE_TO_TWO } from "../constants/environmentConstans";

import { TIME_SET_TIMEOUT } from "../constants/errorsConstants";

function AddContact() {
  const containerRef = useRef(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { windowWidth } = useResponsive();

  const shopId = Number(params.id);

  const tableRef = useRef(null);
  const btnMinWidth = 70;

  const [newContact, setNewContact] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [idContact, setIdContact] = useState();
  const [idContactActive, setIdContactActive] = useState();
  const [activeContact, setActiveContact] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [helper, setHelper] = useState("");
  const [objId, setObjId] = useState("");

  const [newSpot, setNewSpot] = useState(false);
  const [editSpot, setEditSpot] = useState(false);
  const [idSpot, setIdSpot] = useState();
  const [idSpotActive, setIdSpotActive] = useState();
  const [activeSpot, setActiveSpot] = useState(true);
  const [editContactObj, setEditContactObj] = useState({});
  const [editContactObjSuccess, setEditContactObjSuccess] = useState(false);

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

  const infoFlagRedux = useSelector((state) => state.flag);
  const { cityDescFlag } = infoFlagRedux;

  //Handlers

  const infoHandler = (i) => {
    console.log('Info--->>>', i)
  }

  const descriptionHandler = (i) => {
    dispatch({ type: SET_CITY_FLAG_DESC_TRUE });
    setHelper(i.name);
    setObjId(i.id);
    console.log('Opis--->>>', i)
  };

  const unActiveHandler = (id) => {
    setShowAlert(true);
    setIdContactActive(id);
    setContactOrSpot(true);
  };

  const activeHandler = (id) => {
    setShowAlert(true);
    setIdContactActive(id);
    setContactOrSpot(true);
  };

  const unActiveSpotHandler = (id) => {
    setShowAlert(true);
    setIdSpotActive(id);
    setContactOrSpot(false);
  };

  const activeSpotHandler = (id) => {
    setShowAlert(true);
    setIdSpotActive(id);
    setContactOrSpot(false);
  };

  const newHendler = () => {
    setEditContactObj({});
    setEditContact(false);
    setNewContact(!newContact);
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
        setEditContactObj(i);
        setIdContact(i.id);
      }
    });
  };

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editContact) {
      const insertData = {
        shop_id: shopId,
        Id: idContact,
        editing: true,
        firstName: !values.firstName ? editContactObj.name : values.firstName,
        surname: !values.surname ? editContactObj.surname : values.surname,
        email: !values.email ? editContactObj.email : values.email,
        phone: !values.phone ? editContactObj.phone : values.phone,
        description: !values.description
          ? editContactObj.description
          : values.description,
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
        firstName: values.firstName,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        description: values.description,
        creator: userInfo.id,
        modifier: userInfo.id,
      };
      setNewContact(false);
      setEditContact(false);
      dispatch(addContact(insertData));
    }
  };

  // Ensure that useState editContactObj assign edit object in Time.
  // UseSate is async which means is possible that condition in Inputs array will be executed elier than useState editContactObj
  useEffect(() => {
    setEditContactObjSuccess(true);
    return () => {
      setEditContactObjSuccess(false);
    };
  }, [editContactObj]);

  // Change status contact & spot
  useEffect(() => {
    if (contactOrSpot) {
      if (confirm) {
        dispatch(
          unOrActiveList({
            Id: idContactActive,
            shop_id: shopId,
            active: activeContact ? false : true,
            userId: userInfo.id,
            objType: SHOP_CONTACT_DESCRIPTION,
            kind: activeContact ? "Inactive contact" : "Active contact",
          })
        );
      }
    } else {
      if (confirm) {
        dispatch(
          unOrActiveList({
            Id: idSpotActive,
            shop_id: shopId,
            active: activeSpot ? false : true,
            userId: userInfo.id,
            objType: SHOP_SPOT_DESCRIPTION,
            kind: activeSpot ? "Inactive spot" : "Active spot",
          })
        );
      }
    }

    setConfirm(false);
  }, [dispatch, confirm]);

  // Delete contact list after activation or deactivation
  useEffect(() => {
    if (success) {
      dispatch({ type: GET_CONTACT_LIST_DELETE });
      //dispatch({ type: SET_WINDOW_FLAG_DELETE });
      dispatch({ type: GET_SOPTS_LIST_DELETE });
    }
  }, [dispatch, success]);

  // fetching list of contact & spots from DB
  useEffect(() => {
    if (ListOfContact.length === 0) {
      dispatch(getShopContacts({ Id: shopId }));
    }
    if (shopSpotList.length === 0) {
      dispatch(getShopSpots({ Id: shopId }));
    }
  }, [dispatch, ListOfContact.length, shopSpotList.length]);

  //fetching shop from DB
  useEffect(() => {
    if (shopList.length === 0) {
      dispatch(getShops());
    }
  }, [dispatch, shopList.length]);

  useEffect(() => {
    dispatch({ type: GET_SOPTS_LIST_DELETE });
    dispatch({ type: GET_CONTACT_LIST_DELETE });
  }, []);

  /************************STYLE*****************************/

  const mainContainer = {
    backgroundImage: `linear-gradient(145deg, rgba(219, 219, 219, 1) 0%, rgba(149, 149, 149, 1) 100%)`,
    marginTop: "1rem",
    padding: "2rem 0.5rem",
    borderRadius: "0.25rem",
  };

  const contactContainer = {
    ...mainContainer,
    height: "700px",
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

  /************************FORM*****************************/
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
      defaultValue:
        editContactObjSuccess && editContactObj && editContactObj.name,
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
      defaultValue:
        editContactObjSuccess && editContactObj && editContactObj.surname,
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
      defaultValue:
        editContactObjSuccess && editContactObj && editContactObj.email,
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
      defaultValue:
        editContactObjSuccess && editContactObj && editContactObj.phone,
      required: true,
    },
    {
      id: "5",
      name: "description",
      placeholder: t("AddContact_description_placeholder"),
      errorMessage: t("AddContact_description_error_message"),
      label: t("AddContact_description"),
      defaultValue:
        editContactObjSuccess && editContactObj && editContactObj.description,
      required: false,
    },
  ];

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const onChangeTextArea = (descValue) => {
    setValues({ ...values, description: descValue });
  };

  /************************TABLE STYLE *****************************/
  const mainTableContainer = {
    overflowY: "auto",
    height: "200px",
    marginTop: "1rem",
  };

  const tableStyle = {
    width: "100%",
    color: "white",
    backgroundImage: `linear-gradient(178deg, rgba(89, 131, 252, 1) 35%, rgba(41, 53, 86, 1) 100%)`,
    marginTop: "1rem",
  };

  const styleHeader = {
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
  const shopsBtn = {
    fontSize: "0.7rem",
    fontWeight: "700",
    background: "transparent",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    padding: "0.4rem",
    minWidth: windowWidth < 800 ? null : `${btnMinWidth}px`,
  };
  const btnDescription = {
    ...shopsBtn,
    backgroundImage: `linear-gradient(90deg, rgba(203, 197, 48, 1) 0%, rgba(151, 142, 12, 1) 100%)`,
  };

  const btnInfo = {
    ...shopsBtn,
    paddingLeft: "0.2rem",
    backgroundImage: `linear-gradient(171deg, rgba(34, 95, 165, 1) 45%, rgba(42, 51, 113, 1) 89%)`,
  };

  /************************TABLE PROPS - SPOT *****************************/

  const tableSpotStyle = {
    ...tableStyle,
    color: "white",
    backgroundImage: `linear-gradient(178deg, rgba(89, 131, 252, 1) 35%, rgba(41, 53, 86, 1) 100%)`,
  };

  let currentStatusSpotList = [];

  const activeSpotList = shopSpotList.filter((item) => item.is_active === true);
  const unactiveSpotList = shopSpotList.filter(
    (item) => item.is_active === false
  );

  if (activeSpot) {
    currentStatusSpotList = activeSpotList;
  } else {
    currentStatusSpotList = unactiveSpotList;
  }

  const tableSpotscolumns = [
    {
      key: "name",
      label: t("AddContact_name"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "adress",
      label: t("AddContact_spots_address"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "status",
      label: t("AdminShops_status"),
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
    {
      key: "btnStatusChanger",
      label: "",
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
    {
      key: "btnEdit",
      label: "",
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
  ];

  const dataSpotsTable = currentStatusSpotList.map((item) => ({
    id: item.id,
    name: item.name,
    adress: `${item.city.name}, ${item.street} ${item.no_building}`,
    status: activeSpot ? (
      <span style={activeBadge}>{t("status_active")}</span>
    ) : (
      <span style={inactiveBadge}>{t("status_inactive")}</span>
    ),
    btnStatusChanger: activeSpot ? (
      <button style={btnUnactive} onClick={() => unActiveSpotHandler(item.id)}>
        {t("btn_unactive")}
      </button>
    ) : (
      <button style={btnActive} onClick={() => activeSpotHandler(item.id)}>
        {t("btn_active")}
      </button>
    ),
    btnEdit: activeSpot && (
      <button style={btnEdit} onClick={() => editSpotHandler(item.id)}>
        {t("btn_edit")}
      </button>
    ),
  }));

  /************************TABLE PROPS - CONTACT *****************************/

  const tableContactStyle = {
    ...tableStyle,
    color: "black",
    backgroundImage: `linear-gradient(183deg, rgb(236, 181, 26) 0%, rgb(217, 196, 33) 100%)`,
  };

  let currentStatusContactList = [];

  const activeContactList = ListOfContact.filter(
    (item) => item.is_active === true
  );

  const unactiveContactList = ListOfContact.filter(
    (item) => item.is_active === false
  );

  if (activeContact) {
    currentStatusContactList = activeContactList;
  } else {
    currentStatusContactList = unactiveContactList;
  }

  const tableConatctcolumns = [
    {
      key: "name",
      label: t("AddContact_name"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "phone",
      label: t("AddContact_phone"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "email",
      label: t("AddContact_email"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "status",
      label: t("AdminShops_status"),
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
    {
      key: "btnStatusChanger",
      label: "",
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
    {
      key: "btnEdit",
      label: "",
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
  ];

  const dataContactTable = currentStatusContactList.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email,
    status: activeContact ? (
      <span style={activeBadge}>{t("status_active")}</span>
    ) : (
      <span style={inactiveBadge}>{t("status_inactive")}</span>
    ),
    btnStatusChanger: activeContact ? (
      <button style={btnUnactive} onClick={() => unActiveHandler(item.id)}>
        {t("btn_unactive")}
      </button>
    ) : (
      <button style={btnActive} onClick={() => activeHandler(item.id)}>
        {t("btn_active")}
      </button>
    ),
    btnEdit: activeContact && (
      <button style={btnEdit} onClick={() => editHandler(item.id)}>
        {t("btn_edit")}
      </button>
    ),
  }));

  /*****************************************************/

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
          {showAlert && contactOrSpot && (
            <InfoAlertComponent
              confirmYes={confirmYes}
              confirmNo={confirmNo}
              context={
                !activeContact
                  ? t("AdminShops_activate_shop_InfoWindow_body")
                  : t("AdminShops_inactivate_shop_InfoWindow_body")
              }
            />
          )}

          {showAlert && !contactOrSpot ? (
            <InfoAlertComponent
              confirmYes={confirmYes}
              confirmNo={confirmNo}
              context={
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
                <ErrorMessage msg={error} timeOut={TIME_SET_TIMEOUT} />
              ) : activeError ? (
                <ErrorMessage msg={activeError} timeOut={TIME_SET_TIMEOUT} />
              ) : shopListError ? (
                <ErrorMessage msg={shopListError} timeOut={TIME_SET_TIMEOUT} />
              ) : spotListError ? (
                <ErrorMessage msg={spotListError} timeOut={TIME_SET_TIMEOUT} />
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
                        <div key={shop.id}>
                          <Divider backgroundColor="grey" />
                          <button
                            style={btnDescription}
                            onClick={() => descriptionHandler(shop)}
                          >
                            {t("btn_description")}
                          </button>
                          <button style={btnInfo} onClick={() => infoHandler(shop)}>
                            {t("btn_info")}
                          </button>
                          {helper === shop.name && cityDescFlag && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                // width: `calc(0.00001% + ${tableRef.current.offsetWidth}px)`,
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#4d4d4d",
                                  padding: "0.4rem",
                                  width: "80%",
                                  margin: "0.4rem",
                                }}
                              >
                                <AddDescription
                                  objId={objId}
                                  descType={SHOP_DESCRIPTION}
                                  return={true}
                                />
                              </div>
                            </div>
                          )}


                          <Divider backgroundColor="grey" />
                          <div style={subtitle}>
                            {t("AdminShops_status")}:
                            <div style={mainDataSection}>
                              {shop.is_active ? t("status_active") : t("status_inactive")}
                            </div>
                          </div>
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
                          <Divider backgroundColor="grey" />
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
                <TableComponent
                  data={dataContactTable}
                  columns={tableConatctcolumns}
                  tableStyle={tableContactStyle}
                  mainTableContainer={mainTableContainer}
                />
              </>

              {/* Contact form */}
              {newContact ? (
                <>
                  <Divider backgroundColor="grey" />
                  <form onSubmit={handleSubmit}>
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
                      <div>
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
                            defaultValue={input.defaultValue}
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

              {/* Spot Table */}
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
                <TableComponent
                  data={dataSpotsTable}
                  columns={tableSpotscolumns}
                  tableStyle={tableSpotStyle}
                  mainTableContainer={mainTableContainer}
                />
              </>
            </div>
          </FormLayout>
        </>
      )}
    </div>
  );
}

export default AddContact;
