import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ONE } from "../constants/environmentConstans";
import language from "../language";
import RadioButtons from "./RadioButtons";
import TableComponent from "./TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { getSubproductCat } from "../actions/productActions";
import { subproductCatList } from "../Data/dataProductCategories";
import {
  activeBadge,
  inactiveBadge,
  btnUnactive,
  btnActive,
  btnEdit,
  tableCell,
  tableCellNoBorderRight,
  styleHeader,
  title,
} from "./AdminCSS";

function ProductSubcategories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [radioValue, setRadioValue] = useState(ONE);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  const [selectedLgn, setSelectedLng] = useState(0);
  const [activeSubcontact, setActiveSubcontact] = useState(false);

  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

  // data from redux
  // const subproductSubcatListRedux = useSelector(
  //   (state) => state.subproductCatList
  // );
  // const { loading, subproductCatList, error, success } =
  //   subproductSubcatListRedux;

  //RadioButtons functions
  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
  };

  const selectLngHandler = (option) => {
    setSwitcher(true);
    setSelectedLng(option);
    setEmptyValueError(false);
  };

  // input SelectOption
  const input = {
    id: "1",
    name: "language",
    label: "language",
    optionsList: language,
    defaultValue: "Select an option",
  };

  // USEEFFECTS

  // fetching list of product categories from DB
  // useEffect(() => {
  //   if (subproductCatList.length === 0) {
  //     dispatch(getSubproductCat());
  //   }
  // }, [dispatch, subproductCatList.length]);

  const mainTableContainer = {
    overflowY: "auto",
    maxHeight: "50vh",
    marginTop: "1rem",
  };

  const tableStyle = {
    width: "100%",
    marginTop: "1rem",
  };

  const tableSubcatProductStyle = {
    ...tableStyle,
    color: "black",
    backgroundImage: `linear-gradient(90deg, rgba(186, 189, 193, 1) 0%, rgba(160, 162, 166, 1) 100%)`,
  };

  const unActiveHandler = (id) => {
    console.log("działa unActiveHandler");
  };

  const activeHandler = (id) => {
    console.log("działa activeHandler");
  };

  const editHandler = (id) => {
    console.log("działa editHandler");
  };

  const tableConatctcolumns = [
    {
      key: "name",
      label: t("AddContact_name"),
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
    {
      key: "status",
      label: t("AdminShops_status"),
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
  ];

  const dataSubcategoryTable = subproductCatList.map((item) => ({
    id: item.id,
    name: item.name,
    status: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{}}>
          {activeSubcontact ? (
            <span style={{ ...activeBadge, color: "black" }}>
              {t("status_active")}
            </span>
          ) : (
            <span style={inactiveBadge}>{t("status_inactive")}</span>
          )}
        </div>

        <div>
          {activeSubcontact && (
            <button
              style={{ ...btnEdit, marginRight: "1rem" }}
              onClick={() => editHandler(item.id)}
            >
              {t("btn_edit")}
            </button>
          )}
          {activeSubcontact ? (
            <button
              style={{ ...btnUnactive }}
              onClick={() => unActiveHandler(item.id)}
            >
              {t("btn_unactive")}
            </button>
          ) : (
            <button style={btnActive} onClick={() => activeHandler(item.id)}>
              {t("btn_active")}
            </button>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        marginTop: "1rem",
        padding: "2rem",
        borderRadius: "0.5rem",
        minHeight: "50vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
        </div>
      </div>
      <div style={title}>{t("ProductSubcategories_title")}</div>
      {/* <button onClick={() => setActiveSpot(!activeSpot)}>
        {activeSpot ? t("show_unactive_spot") : t("show_active_spot")}
      </button> */}
      <TableComponent
        data={dataSubcategoryTable}
        columns={tableConatctcolumns}
        tableStyle={tableSubcatProductStyle}
        mainTableContainer={mainTableContainer}
      />
    </div>
  );
}

export default ProductSubcategories;
