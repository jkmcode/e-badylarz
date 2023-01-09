import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAreas, getAreaContacts } from "../actions/areaAction";
import TableComponent from "./TableComponent";
import {
  FormLayout,
  activeBadge,
  submitBtn,
  editBtn,
  changeBtn,
} from "./AdminCSS";
import rocket from "../images/rocket.png";
import { TWO, ONE_TO_TWO } from "../constants/environmentConstans";

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

  // fech data from Redux
  const areaListRedux = useSelector((state) => state.areaList);
  const { loading, areaList, error, success } = areaListRedux;

  const areaListOfContactRedux = useSelector((state) => state.contactAreaList);
  const { areaListOfContact } = areaListOfContactRedux;

  console.log("areaListOfContact", areaListOfContact);

  //Handlers
  const editAreaHandler = () => {
    navigate(`/dashboard/areas/edit/${areaId}`);
  };

  const newHendler = () => {
    setEditContactObj({});
    setEditContact(false);
    setNewContact(!newContact);
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

  /************************TABLE PROPS - AREAS *****************************/

  let currentStatusContactList = [];

  const activeAreasList = areaList.filter((item) => item.is_active === true);

  const unactiveAreasList = areaList.filter((item) => item.is_active === false);

  if (activeAreas) {
    currentStatusContactList = activeAreasList;
  } else {
    currentStatusContactList = unactiveAreasList;
  }

  //   const dataAreasTable = currentStatusContactList.map((item) => ({
  //     id: item.id,
  //     name: item.name,
  //     phone: item.phone,
  //     email: item.email,
  //     status: <span style={activeBadge}>{t("status_active")}</span>,
  //     btnStatusChanger: activeContact ? (
  //       <button style={btnUnactive} onClick={() => unActiveHandler(item.id)}>
  //         {t("btn_unactive")}
  //       </button>
  //     ) : (
  //       <button style={btnActive} onClick={() => activeHandler(item.id)}>
  //         {t("btn_active")}
  //       </button>
  //     ),
  //     btnEdit: activeContact && (
  //       <button style={btnEdit} onClick={() => editHandler(item.id)}>
  //         {t("btn_edit")}
  //       </button>
  //     ),
  //   }));

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
            {/* <TableComponent
              data={dataContactTable}
              columns={tableConatctcolumns}
              tableStyle={tableContactStyle}
              mainTableContainer={mainTableContainer}
            /> */}
          </>
        </div>
      </FormLayout>
    </div>
  );
}

export default AreaShowMore;
