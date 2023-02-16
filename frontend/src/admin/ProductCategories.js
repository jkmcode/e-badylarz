import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { title, addProdCatBtn } from "./AdminCSS";
import RadioButtons from "./RadioButtons";
import DotsLoader from "../component/DotsLoader";
import RotateCard from "../component/RotateCard";
import InfoAlertComponent from "../component/InfoAlertComponent";
import SelectOption from "./SelectOption";
import language from "../language";
import { unOrActiveList } from "../actions/adminActions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProductCat, sortByLng } from "../actions/productActions";
import { ONE, ZERO, EMPTY } from "../constants/environmentConstans";
import {
  SET_FLAG_ADD_FALSE,
  PRODUCT_CAT_DESCRIPTION,
  UNACTIVE,
  ACTIVE,
  ACTIVE_DESCRIPTION_DELETE,
} from "../constants/adminConstans";
import {
  ADD_PRODUCT_CAT_DELETE,
  GET_PRODUCT_CAT_LIST_DELETE,
} from "../constants/productConstans";
import { Icon } from "@iconify/react";
import {
  emptylistTitle,
  emptyListIcon,
  unactiveBtn,
  activeBtn,
  subcategoryBtn,
} from "./AdminCSS";

function ProductCategories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

  //variables
  const [radioValue, setRadioValue] = useState(ONE);
  const [catObj, setCatObj] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [selectedLgn, setSelectedLng] = useState(0);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [switcher, setSwitcher] = useState(false);

  //RadioButtons functions
  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
  };

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCatListRedux = useSelector((state) => state.productCatList);
  const {
    loading: loadingProductCat,
    productCatList,
    error: errorLproductCat,
    success: successProductCat,
    successAdd,
  } = productCatListRedux;

  const sortetProductCatListRedux = useSelector(
    (state) => state.sortedProductCatList
  );
  const { sortedProductCatList } = sortetProductCatListRedux;

  const dflag = useSelector((state) => state.flag);
  const { addFlag } = dflag;

  const newProductCat = useSelector((state) => state.addProduct);
  const { loading, error, success, result } = newProductCat;

  const unOrActive = useSelector((state) => state.unOrActiveDescription);
  const {
    loading: loadingUnOrActive,
    success: successUnOrActive,
    error: errorUnOrActive,
  } = unOrActive;

  // USEEFFECTS

  // fetching list of product categories from DB
  useEffect(() => {
    if (productCatList.length === 0) {
      dispatch(getProductCat());
    }
  }, [dispatch, productCatList.length]);

  // reset global variable after add product category
  useEffect(() => {
    if (addFlag) {
      dispatch({ type: SET_FLAG_ADD_FALSE });
    }

    // ustawienie zmiennej success na undefined.
    // Jeżeli tego nie zrobimy to będzie się renderować komunikat o dodanym product category
    // ponieważ spełnia się warunek w AddProductCategories
    if (success) {
      dispatch({ type: ADD_PRODUCT_CAT_DELETE });
    }

    if (successUnOrActive) {
      dispatch({ type: GET_PRODUCT_CAT_LIST_DELETE });
      //dispatch({ type: ACTIVE_DESCRIPTION_DELETE });
    }
  }, [addFlag, success, successUnOrActive]);

  // dispatch function for active and unactive product category
  useEffect(() => {
    if (confirm && updateStatus === UNACTIVE) {
      dispatch(
        unOrActiveList({
          Id: catObj,
          active: false,
          userId: userInfo.id,
          objType: PRODUCT_CAT_DESCRIPTION,
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
          objType: PRODUCT_CAT_DESCRIPTION,
          kind: "",
        })
      );
    }
    setConfirm(false);
  }, [dispatch, confirm, updateStatus]);

  // List/Frontend data
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

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
  };

  // input
  const input = {
    id: "1",
    name: "language",
    label: "language",
    optionsList: language,
    defaultValue: "Select an option",
  };

  const selectLngHandler = (option) => {
    setSwitcher(true);
    setSelectedLng(option);
    setEmptyValueError(false);
  };

  // save data to DB
  useEffect(() => {
    if (switcher) {
      const insertData = {
        creator: userInfo.id,
        language: selectedLgn,
      };

      setSwitcher(false);

      if (selectedLgn === EMPTY) {
        setEmptyValueError(true);
      } else {
        dispatch(sortByLng(insertData));
      }
    }
  }, [dispatch, switcher]);

  // sub Category

  const subcategoryProduct = (id) => {
    navigate("subcategories");
  };

  const objects = productCatList.map((cat) => ({
    id: cat.id,
    buttons: [
      {
        id: 1,
        btn: (
          <button onClick={() => unActiveHandler(cat.id)} style={unactiveBtn}>
            {t("btn_unactive")}
          </button>
        ),
        btnActive: true,
      },
      {
        id: 2,
        btn: (
          <button onClick={() => activeHandler(cat.id)} style={activeBtn}>
            {t("btn_active")}
          </button>
        ),
        btnActive: false,
      },
      {
        id: 3,
        btn: (
          <button
            onClick={() => subcategoryProduct(cat.id)}
            style={subcategoryBtn}
          >
            {t("btn_subcategory")}
          </button>
        ),
        btnActive: false,
      },
    ],
  }));

  function StatusProductCatCard({ active }) {
    let currentProductCatList = [];

    if (active === true && sortedProductCatList.length === 0) {
      currentProductCatList = productCatList.filter(
        (disc) => disc.is_active == true
      );
    }

    if (active === true && sortedProductCatList.length !== 0) {
      currentProductCatList = sortedProductCatList.filter(
        (disc) => disc.is_active == true
      );
    }

    if (active === false) {
      currentProductCatList = productCatList.filter(
        (disc) => disc.is_active === false
      );
    }

    if (active === false && sortedProductCatList.length !== 0) {
      currentProductCatList = sortedProductCatList.filter(
        (disc) => disc.is_active == false
      );
    }

    if (currentProductCatList.length === 0) {
      return (
        <>
          <div style={emptylistTitle}>
            <div style={{ marginTop: "3rem" }}>{t("Table_empty_list")}</div>
          </div>
          <div style={emptyListIcon}>
            <Icon icon="ic:outline-featured-play-list" />
          </div>
        </>
      );
    }

    return (
      <div
        style={{
          padding: "1rem",
          borderRadius: "1rem",
          border: "3px solid rgb(66, 66, 74)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {sortedProductCatList.length === 0
            ? productCatList.map((category) => {
                if (category.is_active && radioValue === ONE) {
                  return (
                    <RotateCard
                      key={category.id}
                      name={category.name}
                      id={category.id}
                      objects={objects}
                      isActive={true}
                    />
                  );
                }
              })
            : sortedProductCatList.map((category) => {
                if (category.is_active && radioValue === ONE) {
                  return (
                    <RotateCard
                      key={category.id}
                      name={category.name}
                      id={category.id}
                      objects={objects}
                      isActive={true}
                    />
                  );
                }
              })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {sortedProductCatList.length === 0
            ? productCatList.map((category) => {
                if (!category.is_active && radioValue === ZERO) {
                  return (
                    <RotateCard
                      key={category.id}
                      name={category.name}
                      id={category.id}
                      objects={objects}
                      isActive={false}
                    />
                  );
                }
              })
            : sortedProductCatList.map((category) => {
                if (!category.is_active && radioValue === ZERO) {
                  return (
                    <RotateCard
                      key={category.id}
                      name={category.name}
                      id={category.id}
                      objects={objects}
                      isActive={false}
                    />
                  );
                }
              })}
        </div>
        {active === true && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="add" style={addProdCatBtn}>
              Add Category
            </Link>
          </div>
        )}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SelectOption
            key={input.id}
            label={input.label}
            defaultValue={input.defaultValue}
            optionsList={input.optionsList}
            emptyValueError={emptyValueError}
            onChange={selectLngHandler}
          />
        </div>
      </div>

      {showAlert && updateStatus === UNACTIVE && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("Confirmation_alert_unactive_product_category")}
        />
      )}

      {showAlert && updateStatus === ACTIVE && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("Confirmation_alert_active_product_category")}
        />
      )}

      <div style={title}>{t("ProductCategories_title")}</div>
      {loadingProductCat ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DotsLoader />
        </div>
      ) : (
        <>
          {radioValue === ONE && <StatusProductCatCard active={true} />}
          {radioValue === ZERO && <StatusProductCatCard active={false} />}
        </>
      )}
    </div>
  );
}

export default ProductCategories;
