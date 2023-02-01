import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { title, addProdCatBtn } from "./AdminCSS";
import RadioButtons from "./RadioButtons";
import DotsLoader from "../component/DotsLoader";
import RotateCard from "../component/RotateCard";
import { Link } from "react-router-dom";
import { getProductCat } from "../actions/productActions";
import { ONE, ZERO } from "../constants/environmentConstans";
import { SET_FLAG_ADD_FALSE } from "../constants/adminConstans";
import { ADD_PRODUCT_CAT_DELETE } from "../constants/productConstans";
import { Icon } from "@iconify/react";
import { emptylistTitle, emptyListIcon, unactiveBtn } from "./AdminCSS";

function ProductCategories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const radios = [
    { id: 1, name: t("Radio_true"), value: "1" },
    { id: 2, name: t("Radio_false"), value: "0" },
  ];

  //variables
  const [radioValue, setRadioValue] = useState(ONE);

  //RadioButtons functions
  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
  };

  // data from redux
  const productCatListRedux = useSelector((state) => state.productCatList);
  const {
    loading: loadingProductCat,
    productCatList,
    error: errorLproductCat,
    success: successProductCat,
    successAdd,
  } = productCatListRedux;

  const dflag = useSelector((state) => state.flag);
  const { addFlag } = dflag;

  const newProductCat = useSelector((state) => state.addProduct);
  const { loading, error, success, result } = newProductCat;

  // USEEFFECTS

  // fetching list of shops from DB
  useEffect(() => {
    if (productCatList.length === 0) {
      dispatch(getProductCat());
    }
  }, []);

  // reset global variable after add product category
  useEffect(() => {
    if (addFlag) {
      dispatch({ type: SET_FLAG_ADD_FALSE });
    }

    // ustawienie zmiennej success na undefined.
    // Jeżeli tego nie zrobimy to będzie się renderować komunikat o dodanym product category
    // ponieważ jest spełnia się warunek w AddProductCategories
    if (success) {
      dispatch({ type: ADD_PRODUCT_CAT_DELETE });
    }
  }, [addFlag, success]);

  // List/Frontend data

  const unActiveHandler = () => {
    console.log("działa unActiveHandler");
    //setuniqueID(uniqueId);
  };

  const listOfButtons = [
    {
      id: "1",
      button: (
        <button onClick={() => unActiveHandler()} style={unactiveBtn}>
          {t("btn_unactive")}
        </button>
      ),
    },
  ];

  function StatusProductCatCard({ active }) {
    let currentProductCatList = [];

    if (active === true) {
      currentProductCatList = productCatList.filter(
        (disc) => disc.is_active == true
      );
    }

    if (active === false) {
      currentProductCatList = productCatList.filter(
        (disc) => disc.is_active === false
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
          {productCatList.map((category) => {
            if (category.is_active && radioValue === ONE) {
              return (
                <RotateCard
                  key={category.id}
                  name={category.name}
                  uniqueId={category.uniqueId}
                  listOfButtons={listOfButtons}
                />
              );
            }
          })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {productCatList.map((category) => {
            if (!category.is_active && radioValue === ZERO) {
              return (
                <RotateCard
                  key={category.id}
                  name={category.name}
                  id={category.id}
                  listOfButtons={listOfButtons}
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
      <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />

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
