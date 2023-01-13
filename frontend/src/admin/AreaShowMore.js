import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAreas, getAreaContacts, getAreaSpots } from "../actions/areaAction";
import { unOrActiveList } from "../actions/adminActions";
import TableComponent from "./TableComponent";
import InfoAlertComponent from "../component/InfoAlertComponent";
import Divider from "./Divider";
import FormInput from "./FormInput";
import TextareaWithValidation from "./TextareaWithValidation";
import { addAreaContact } from "../actions/areaAction";
import {
  FormLayout,
  activeBadge,
  inactiveBadge,
  submitBtn,
  editBtn,
  changeBtn,
} from "./AdminCSS";
import rocket from "../images/rocket.png";
import {
  TWO,
  ONE_TO_TWO,
  TABLE_TYPE_CONTACT,
  TABLE_TYPE_SPOT,
} from "../constants/environmentConstans";
import {
  AREA_CONTACT_DESCRIPTION,
  AREA_SPOT_DESCRIPTION,
} from "../constants/adminConstans";
import {
  GET_AREA_CONTACT_LIST_DELETE,
  GET_AREA_SOPTS_LIST_DELETE,
} from "../constants/areaConstans";

function AreaShowMore() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const areaId = Number(params.id);

  //variables
  const [editContactObj, setEditContactObj] = useState({});
  const [editContact, setEditContact] = useState(false);
  const [newContact, setNewContact] = useState(false);
  const [activeAreas, setActiveAreas] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [idContactActive, setIdContactActive] = useState();
  const [typeTable, setTypeTable] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [idContact, setIdContact] = useState();
  const [editContactObjSuccess, setEditContactObjSuccess] = useState(false);
  const [newSpot, setNewSpot] = useState(false);
  const [editSpot, setEditSpot] = useState(false);
  const [activeSpot, setActiveSpot] = useState(true);
  const [idSpotActive, setIdSpotActive] = useState();

  // fech data from Redux
  const areaListRedux = useSelector((state) => state.areaList);
  const { loading, areaList, error, success } = areaListRedux;

  const areaSpotListRedux = useSelector((state) => state.areaSpot);
  const { areaSpotList } = areaSpotListRedux;

  const areaListOfContactRedux = useSelector((state) => state.contactAreaList);
  const { areaListOfContact } = areaListOfContactRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const contactActivRedux = useSelector((state) => state.unOrActiveDescription);
  const {
    loading: activeLoading,
    error: activeError,
    success: activeSuccess,
    result: satusChangeResult,
  } = contactActivRedux;

  //Handlers
  const editHandler = (id) => {
    setNewContact(true);
    setEditContact(true);

    areaListOfContact.map((i) => {
      if (i.id === id) {
        setEditContactObj(i);
        setIdContact(i.id);
      }
    });
  };

  const editAreaHandler = () => {
    navigate(`/dashboard/areas/edit/${areaId}`);
  };

  const newHendler = () => {
    setEditContactObj({});
    setEditContact(false);
    setNewContact(!newContact);
  };

  const unActiveHandler = (id) => {
    setShowAlert(true);
    setIdContactActive(id);
    setTypeTable(TABLE_TYPE_CONTACT);
  };

  const activeHandler = (id) => {
    setShowAlert(true);
    setIdContactActive(id);
    setTypeTable(TABLE_TYPE_CONTACT);
  };

  const unActiveSpotHandler = (id) => {
    setShowAlert(true);
    setIdSpotActive(id);
    setTypeTable(TABLE_TYPE_SPOT);
  };

  const activeSpotHandler = (id) => {
    setShowAlert(true);
    setIdSpotActive(id);
    setTypeTable(TABLE_TYPE_SPOT);
  };

  const editSpotHandler = (id) => {
    navigate(`/dashboard/areas/spot/${areaId}/edit/${id}`);
  };

  const newHendlerSpot = () => {
    navigate(`/dashboard/areas/spot/${areaId}/add`);
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
        area_id: areaId,
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
      dispatch(addAreaContact(insertData));
    } else {
      const insertData = {
        area_id: areaId,
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
      dispatch(addAreaContact(insertData));
    }
  };

  //USEEFFECT
  // fetching list of area from DB
  useEffect(() => {
    if (areaList.length === 0) {
      dispatch(getAreas());
    }
  }, [dispatch, areaList.length]);

  // fetching spot and contact of area
  useEffect(() => {
    if (areaListOfContact.length === 0) {
      dispatch(getAreaContacts({ Id: areaId }));
    }

    if (areaSpotList.length === 0) {
      dispatch(getAreaSpots({ Id: areaId }));
    }
  }, [dispatch, areaListOfContact.length, areaSpotList.length]);

  //reset areaListOfContact
  useEffect(() => {
    dispatch({ type: GET_AREA_CONTACT_LIST_DELETE });
  }, []);

  // Delete contact list after activation or deactivation
  useEffect(() => {
    if (activeSuccess && satusChangeResult === AREA_CONTACT_DESCRIPTION) {
      dispatch({ type: GET_AREA_CONTACT_LIST_DELETE });
    }

    if (activeSuccess && satusChangeResult === AREA_SPOT_DESCRIPTION) {
      dispatch({ type: GET_AREA_SOPTS_LIST_DELETE });
    }
  }, [dispatch, activeSuccess, satusChangeResult]);

  // Change status contact & spot
  useEffect(() => {
    if (typeTable === TABLE_TYPE_CONTACT) {
      if (confirm) {
        dispatch(
          unOrActiveList({
            Id: idContactActive,
            id_area: areaId,
            active: activeAreas ? false : true,
            userId: userInfo.id,
            objType: AREA_CONTACT_DESCRIPTION,
            kind: activeAreas ? "Inactive contact" : "Active contact",
          })
        );
      }
    } else {
      if (confirm) {
        dispatch(
          unOrActiveList({
            Id: idSpotActive,
            shop_id: areaId,
            active: activeSpot ? false : true,
            userId: userInfo.id,
            objType: AREA_SPOT_DESCRIPTION,
            kind: activeSpot ? "Inactive spot" : "Active spot",
          })
        );
      }
    }

    setConfirm(false);
  }, [dispatch, confirm, typeTable]);

  // Ensure that useState editContactObj assign edit object in Time.
  // UseSate is async which means is possible that condition in Inputs array will be executed elier than useState editContactObj
  useEffect(() => {
    setEditContactObjSuccess(true);
  }, [editContactObj]);

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

  /************************STYLE*****************************/

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

  const tableStyle = {
    width: "100%",
    color: "white",
    backgroundImage: `linear-gradient(178deg, rgba(89, 131, 252, 1) 35%, rgba(41, 53, 86, 1) 100%)`,
    marginTop: "1rem",
  };

  const tableAreaStyle = {
    ...tableStyle,
    color: "grey",
    backgroundImage: `linear-gradient(125deg, rgba(244, 244, 244, 1) 0%, rgba(211, 211, 211, 1) 100%)`,
  };

  const mainTableContainer = {
    overflowY: "auto",
    height: "200px",
    marginTop: "1rem",
  };

  const styleHeader = {
    borderBottom: `2px solid #404040`,
    padding: "1rem",
  };

  const tableCell = {
    padding: "0.75rem",
    verticalAlign: "middle",
    color: "black",
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

  /************************TABLE PROPS - SPOT *****************************/

  let currentStatusSpotList = [];

  const activeSpotAreasList = areaSpotList.filter(
    (item) => item.is_active === true
  );

  const unactiveSpotAreasList = areaSpotList.filter(
    (item) => item.is_active === false
  );

  if (activeSpot) {
    currentStatusSpotList = activeSpotAreasList;
  } else {
    currentStatusSpotList = unactiveSpotAreasList;
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
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "btnStatusChanger",
      label: "",
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "btnEdit",
      label: "",
      styleTableCell: tableCell,
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

  /************************TABLE PROPS - AREA CONTACTS *****************************/

  let currentStatusContactList = [];

  const activeAreasList = areaListOfContact.filter(
    (item) => item.is_active === true
  );

  const unactiveAreasList = areaListOfContact.filter(
    (item) => item.is_active === false
  );

  if (activeAreas) {
    currentStatusContactList = activeAreasList;
  } else {
    currentStatusContactList = unactiveAreasList;
  }

  const tableAreascolumns = [
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
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "btnStatusChanger",
      label: "",
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "btnEdit",
      label: "",
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
  ];

  const dataAreasTable = currentStatusContactList.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email,
    status: activeAreas ? (
      <span style={activeBadge}>{t("status_active")}</span>
    ) : (
      <span style={inactiveBadge}>{t("status_inactive")}</span>
    ),
    btnStatusChanger: activeAreas ? (
      <button style={btnUnactive} onClick={() => unActiveHandler(item.id)}>
        {t("btn_unactive")}
      </button>
    ) : (
      <button style={btnActive} onClick={() => activeHandler(item.id)}>
        {t("btn_active")}
      </button>
    ),
    btnEdit: activeAreas && (
      <button style={btnEdit} onClick={() => editHandler(item.id)}>
        {t("btn_edit")}
      </button>
    ),
  }));

  return (
    <div
      style={{
        backgroundImage: `url(${rocket})`,
        backgroundPosition: "center",
        backgroundSize: "80%",
        height: "auto",
        padding: "1rem",
      }}
    >
      {showAlert && typeTable === TABLE_TYPE_CONTACT && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={
            !activeAreas
              ? t("activate_staus_InfoWindow_body")
              : t("inactivate_status_InfoWindow_body")
          }
        />
      )}

      {showAlert && typeTable === TABLE_TYPE_SPOT && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={
            !activeAreas
              ? t("activate_staus_InfoWindow_body")
              : t("inactivate_status_InfoWindow_body")
          }
        />
      )}

      <FormLayout col={TWO} ratio={ONE_TO_TWO}>
        {/* Main Data */}
        <div style={contactContainer}>
          <Link
            to="/dashboard/areas/"
            style={{ color: "black", fontWeight: 500 }}
          >
            <Icon icon="ion:arrow-back" />
            {t("btn-return")}
          </Link>
          <div style={{ textAlign: "center", fontSize: `calc(1rem + 1vw)` }}>
            <div style={{ paddingLeft: "1rem", paddingRigth: "1rem" }}>
              {t("main_data_title")}
            </div>
          </div>
          {areaList.length !== 0 &&
            areaList.map((area) => {
              if (area.id === areaId) {
                return (
                  <div key={area.id}>
                    <div style={subtitle}>
                      {t("AddContact_name")}:
                      <div style={mainDataSection}>{area.name}</div>
                    </div>
                    <div style={subtitle}>
                      {t("AddContact_nip")}:
                      <div style={mainDataSection}>{area.nip}</div>
                    </div>
                    <div style={subtitle}>
                      {t("AddContact_address")}:
                      <div style={mainDataSection}>
                        {area.city} {area.no_building}, {area.post_code}{" "}
                        {area.post}
                      </div>
                    </div>
                    <div style={subtitle}>
                      {t("AddContact_GPS")}:
                      <div style={mainDataSection}>
                        {area.latitude}, {area.longitude}
                      </div>
                    </div>
                    <div style={subtitle}>
                      {t("AddContact_bank")}:
                      <div style={mainDataSection}>{area.bank_account}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <button
                        style={{ ...changeBtn, width: "80%" }}
                        onClick={() => editAreaHandler()}
                      >
                        {t("btn-change")}
                      </button>
                    </div>
                  </div>
                );
              }
            })}
        </div>

        <div style={listContainer}>
          {/* Contact Table */}
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button style={btnNewContact} onClick={() => newHendler()}>
                {!newContact
                  ? t("AddContact_btn_add")
                  : editContact
                  ? t("AddContact_btn_close_edit")
                  : t("AddContact_btn_close")}
              </button>

              <button
                style={btnShowUnactive}
                onClick={() => setActiveAreas(!activeAreas)}
              >
                {activeAreas
                  ? t("AddContact_show_unactive")
                  : t("AddContact_show_active")}
              </button>
            </div>
            <TableComponent
              data={dataAreasTable}
              columns={tableAreascolumns}
              tableStyle={tableAreaStyle}
              mainTableContainer={mainTableContainer}
            />
          </>
          {/* Contact form */}
          {newContact && (
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
          )}

          {/* Spot Table */}
          <>
            <div
              style={{
                textAlign: "center",
                fontSize: `calc(1.2rem + 0.7vw)`,
                marginTop: "1rem",
              }}
            >
              <div>{t("spots_table_title")}</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button style={btnNewContact} onClick={() => newHendlerSpot()}>
                  {t("btn_add_spot")}
                </button>

                <button
                  style={btnShowUnactive}
                  onClick={() => setActiveSpot(!activeSpot)}
                >
                  {activeSpot ? t("show_unactive_spot") : t("show_active_spot")}
                </button>
              </div>
            </div>
            <TableComponent
              data={dataSpotsTable}
              columns={tableSpotscolumns}
              tableStyle={tableAreaStyle}
              mainTableContainer={mainTableContainer}
            />
          </>
        </div>
      </FormLayout>
    </div>
  );
}

export default AreaShowMore;
