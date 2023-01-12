import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAreas, getAreaContacts } from "../actions/areaAction";
import { unOrActiveList } from "../actions/adminActions";
import TableComponent from "./TableComponent";
import InfoAlertComponent from "../component/InfoAlertComponent";
import {
  FormLayout,
  activeBadge,
  submitBtn,
  editBtn,
  changeBtn,
} from "./AdminCSS";
import rocket from "../images/rocket.png";
import {
  TWO,
  ONE_TO_TWO,
  TABLE_TYPE_CONTACT,
} from "../constants/environmentConstans";
import { AREA_CONTACT_DESCRIPTION } from "../constants/adminConstans";
import { GET_AREA_CONTACT_LIST_DELETE } from "../constants/areaConstans";

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

  // fech data from Redux
  const areaListRedux = useSelector((state) => state.areaList);
  const { loading, areaList, error, success } = areaListRedux;

  const areaListOfContactRedux = useSelector((state) => state.contactAreaList);
  const { areaListOfContact } = areaListOfContactRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //Handlers
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

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
  };

  //USEEFFECT
  // fetching list of area from DB
  useEffect(() => {
    if (areaList.length === 0) {
      dispatch(getAreas());
    }
  }, [dispatch, areaList.length]);

  useEffect(() => {
    if (areaListOfContact.length === 0) {
      dispatch(getAreaContacts({ Id: areaId }));
    }
  }, [dispatch, areaListOfContact.length]);

  //reset areaListOfContact
  useEffect(() => {
    dispatch({ type: GET_AREA_CONTACT_LIST_DELETE });
  }, []);

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
    }

    setConfirm(false);
  }, [dispatch, confirm, typeTable]);

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
  /************************TABLE PROPS - AREAS *****************************/

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
    status: <span style={activeBadge}>{t("status_active")}</span>,
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
      <button
        style={btnEdit}
        //onClick={() => editHandler(item.id)}
      >
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
        </div>
      </FormLayout>
    </div>
  );
}

export default AreaShowMore;
