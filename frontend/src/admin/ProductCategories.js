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
      <div
        style={{ display: "flex", justifyContent: "center", height: "200px" }}
      >
        <RotateCard />
      </div>

      <div style={title}>{t("ProductCategories_title")}</div>
      {loadingProductCat ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DotsLoader />
        </div>
      ) : (
        <>
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
                    <div
                      key={category.id}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        backgroundImage:
                          "linear-gradient(195deg, rgb(66, 66, 74) 0%, rgb(25, 25, 25) 100%)",
                        color: "white",
                        minWidth: "200px",
                        minHeight: "200px",
                        fontSize: "2rem",
                        borderRadius: "1rem",
                        margin: "auto",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        style={{
                          position: "absolute",
                          top: 0,
                          right: "10%",
                          backgroundColor: "transparent",
                          border: "none",
                          padding: "0",
                        }}
                      >
                        <Icon
                          icon="entypo:dots-three-horizontal"
                          color="white"
                        />
                      </button>

                      {category.name}
                    </div>
                  );
                }

                if (!category.is_active && radioValue === ZERO) {
                  return (
                    <button
                      key={category.id}
                      style={{
                        backgroundImage:
                          "linear-gradient(195deg, rgb(66, 66, 74) 0%, rgb(25, 25, 25) 100%)",
                        color: "white",
                        minWidth: "200px",
                        minHeight: "200px",
                        fontSize: "2rem",
                        borderRadius: "1rem",
                        margin: "auto",
                        marginBottom: "1rem",
                        position: "relative",
                      }}
                    >
                      {category.name}
                    </button>
                  );
                }
              })}
            </div>
          </div>
          {radioValue === ONE && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <Link to="add" style={addProdCatBtn}>
                Add Category
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductCategories;
