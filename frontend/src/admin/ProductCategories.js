import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { title, addProdCatBtn } from "./AdminCSS";
import RadioButtons from "./RadioButtons";
import DotsLoader from "../component/DotsLoader";
import RotateCard from "../component/RotateCard";
import InfoAlertComponent from "../component/InfoAlertComponent";
import BtnHoverAnimation from "../component/BtnHoverAnimation";
import { unOrActiveList } from "../actions/adminActions";
import { Link } from "react-router-dom";
import { getProductCat } from "../actions/productActions";
import { ONE, ZERO } from "../constants/environmentConstans";
import {
  SET_FLAG_ADD_FALSE,
  PRODUCT_CAT_DESCRIPTION,
  UNACTIVE,
} from "../constants/adminConstans";
import { ADD_PRODUCT_CAT_DELETE } from "../constants/productConstans";
import { Icon } from "@iconify/react";
import {
  emptylistTitle,
  emptyListIcon,
  unactiveBtn,
  editBtn,
} from "./AdminCSS";

function ProductCategories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  const unActiveHandler = (id) => {
    setCatObj(id);
    setShowAlert(true);
    setUpdateStatus(UNACTIVE);
    // dispatch(
    //   unOrActiveList({
    //     Id: discObj,
    //     active: false,
    //     userId: userInfo.id,
    //     objType: PRODUCT_CAT_DESCRIPTION,
    //     kind: "",
    //   })
    // );
  };

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
  };

  const objects = productCatList.map((cat) => ({
    id: cat.id,
    buttonUnactive: (
      <button onClick={() => unActiveHandler(cat.id)} style={unactiveBtn}>
        {t("btn_unactive")}
      </button>
    ),
    // buttonEdit: (
    //   <button onClick={() => unActiveHandler(cat.id)} style={editBtn}>
    //     {t("btn_edit")}
    //   </button>
    // ),
  }));

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
                  id={category.id}
                  objects={objects}
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
                  objects={objects}
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
  }, [confirm, dispatch, updateStatus]);

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
      <BtnHoverAnimation name={"XXX"} />
      {showAlert && updateStatus === UNACTIVE && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("Confirmation_alert_unactive_product_category")}
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
