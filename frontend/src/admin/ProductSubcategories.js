import React, { useState, useEffect } from "react";
import RadioButtons from "./RadioButtons";
import TableComponent from "./TableComponent";
import DotsLoader from "../component/DotsLoader";
import ImageError404 from "../imageSVG/ImageError404";
import BackButton from "./BackButton";
import InfoAlertComponent from "../component/InfoAlertComponent";
import { useTranslation } from "react-i18next";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ONE, EMPTY_LIST, EMPTY } from "../constants/environmentConstans";
import { getSubproductCat } from "../actions/productActions";
import { unOrActiveList } from "../actions/adminActions";
import {
  UNACTIVE,
  ACTIVE,
  PRODUCT_SUBCAT_DESCRIPTION,
  SET_FLAG_ADD_FALSE,
} from "../constants/adminConstans";
import { GET_PRODUCT_SUBCAT_LIST_DELETE } from "../constants/productConstans";
import {
  activeBadge,
  inactiveBadge,
  btnUnactive,
  btnActive,
  btnEdit,
  tableCellNoBorderRight,
  styleHeader,
  title,
} from "./AdminCSS";

function ProductSubcategories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = Number(params.id);

  const [radioValue, setRadioValue] = useState(ONE);
  const [currentSubproductList, setCurrentSubproductList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [catObj, setCatObj] = useState({});

  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subproductSubcatListRedux = useSelector(
    (state) => state.subproductCatList
  );
  const { loading, subproductCatList, error, success } =
    subproductSubcatListRedux;

  const editsubcatProduct = useSelector((state) => state.editSubproductCat);
  const {
    success: successEditsubcatProduct,
    loading: loadingEditsubcatProduct,
    error: errorEditsubcatProduct,
  } = editsubcatProduct;

  const unOrActive = useSelector((state) => state.unOrActiveDescription);
  const {
    loading: loadingUnOrActive,
    success: successUnOrActive,
    error: errorUnOrActive,
  } = unOrActive;

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

  //Handlers

  //RadioButtons functions
  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
  };

  const unActiveHandler = (id) => {
    setCatObj(id);
    setShowAlert(true);
    setUpdateStatus(UNACTIVE);
  };

  const activeHandler = (id) => {
    setCatObj(id);
    setShowAlert(true);
    setUpdateStatus(ACTIVE);
  };

  const editHandler = (id) => {
    navigate(`${id}/edit`);
  };

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
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

  const dataSubcategoryTable = currentSubproductList.map((item) => ({
    id: item.id,
    name: item.name,
    status: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <>
          {radioValue === ONE ? (
            <span style={{ ...activeBadge, color: "black" }}>
              {t("status_active")}
            </span>
          ) : (
            <span style={inactiveBadge}>{t("status_inactive")}</span>
          )}
        </>

        <div>
          {radioValue === ONE && (
            <button
              style={{ ...btnEdit, marginRight: "1rem" }}
              onClick={() => editHandler(item.id)}
            >
              {t("btn_edit")}
            </button>
          )}
          {radioValue === ONE ? (
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

  // Comment
  // This useEffect hook ensures that the subproductCatList array is populated with data by dispatching
  // the getSubproductCat() action if the length of the array is EMPTY_LIST.
  // This helps to avoid displaying an empty or incomplete list to the user and improves the overall shopping experience.
  // The hook is triggered by changes to both the dispatch and subproductCatList.length state variables.
  useEffect(() => {
    if (subproductCatList.length === EMPTY_LIST) {
      dispatch(getSubproductCat({ categoryId }));
    }
  }, [dispatch, subproductCatList.length]);

  //Comment
  //When the successUnOrActive value is truthy,
  //the component will dispatch an action of type GET_PRODUCT_SUBCAT_LIST_DELETE (clean a subproductCatList)
  //it triggers other useEffect which fetch the newest subproductCatList.
  useEffect(() => {
    if (successUnOrActive) {
      dispatch({ type: GET_PRODUCT_SUBCAT_LIST_DELETE });
    }
  }, [successUnOrActive]);

  // Comment
  // This useEffect hook updates the current subproduct list based on the selected radio button value.
  // If the subproductCatList array is not empty, the hook filters and sets the list to display
  // either active or inactive subcategories based on the selected radio button value. If the subproductCatList array is empty,
  // the hook sets the current subproduct list to the empty subproductCatList array.
  // This helps to avoid errors and ensures that the subproduct list is properly displayed to the user.
  // The hook is triggered by changes to both the radioValue and subproductCatList state variables.
  useEffect(() => {
    if (subproductCatList) {
      if (radioValue === ONE) {
        setCurrentSubproductList(
          subproductCatList.filter((subcat) => subcat.is_active === true)
        );
      } else {
        setCurrentSubproductList(
          subproductCatList.filter((subcat) => subcat.is_active === false)
        );
      }
    } else {
      setCurrentSubproductList(subproductCatList);
    }
  }, [radioValue, subproductCatList]);

  //Comment
  // dispatch function for active and unactive product category
  useEffect(() => {
    if (confirm && updateStatus === UNACTIVE) {
      dispatch(
        unOrActiveList({
          Id: catObj,
          active: false,
          userId: userInfo.id,
          objType: PRODUCT_SUBCAT_DESCRIPTION,
          kind: "",
        })
      );
    }

    if (confirm && updateStatus === ACTIVE) {
      dispatch(
        unOrActiveList({
          Id: catObj,
          active: true,
          userId: userInfo.id,
          objType: PRODUCT_SUBCAT_DESCRIPTION,
          kind: "",
        })
      );
    }
    setConfirm(false);
  }, [dispatch, confirm, updateStatus]);

  //Comment
  // The dispatch function updates the state with the SET_FLAG_ADD_FALSE action type.
  // It unable to run UseEffect in ProductSubcategoriesActivity to navigate to this component.
  useEffect(() => {
    dispatch({ type: SET_FLAG_ADD_FALSE });
  }, []);

  // error rendering
  if (error) {
    return (
      <div
        style={{
          backgroundColor: "whitesmoke",
          borderRadius: "0.5rem",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            fontSize: "calc(1.3rem + 0.7vw)",
            textAlign: "center",
            padding: "2rem",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {t("Error_404_title")}
        </div>
        <ImageError404 />
      </div>
    );
  }

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
      {showAlert && updateStatus === UNACTIVE && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("Confirmation_alert_unactive_product_subcategory")}
        />
      )}

      {showAlert && updateStatus === ACTIVE && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("Confirmation_alert_active_product_subcategory")}
        />
      )}
      <BackButton />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
        </div>
        <Link
          to="add"
          style={{
            display: "flex",
            alignItems: "center",
            border: "none",
            borderRadius: "0.2rem",
            backgroundColor: "#26A65B",
            padding: "0.5rem",
            color: "white",
          }}
        >
          {t("Products_add_subproduct_btn")}
        </Link>
      </div>
      <div style={title}>{t("ProductSubcategories_title")}</div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DotsLoader />
        </div>
      ) : (
        <TableComponent
          data={dataSubcategoryTable}
          columns={tableConatctcolumns}
          tableStyle={tableSubcatProductStyle}
          mainTableContainer={mainTableContainer}
        />
      )}
    </div>
  );
}

export default ProductSubcategories;
