import React, { useState, useEffect } from "react";
import Divider from "./Divider";
import { useTranslation } from "react-i18next";
import noImage from "../images/noImage.png";
import DateComponentRange from "../component/DateComponentRange"
import ErrorMesageRedux from "./ErrorMesageRedux"
import { useDispatch, useSelector } from "react-redux";
import DotsLoader from "../component/DotsLoader";
import { getMyOffersPrice } from "../actions/productActions";
import TableComponent from "./TableComponent";
import { GET_MYOFFER_DELETE } from "../constants/productConstans"

import {
  tableCell,
  tableCellNoBorderRight,
  styleHeader,
} from "./AdminCSS";

import {
  useKg,
  useArt,
  useLiter
} from "../Data/OfferSearchList";


function InfoOffer({ confirm, context }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const kgList = useKg()
  const artList = useArt()
  const literList = useLiter()

  const [showError, setShowError] = useState(false);
  const [priceList, setPriceList] = useState({});
  const [packagingList, setPackagingList] = useState({});
  const [dataTableList, setDataTableList] = useState({});
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);


  // data from redux
  const getProducsPrice = useSelector((state) => state.getMyOfferPrice);
  const { success, error, loading, result } = getProducsPrice;

  const closeError = () => {
    dispatch({ type: GET_MYOFFER_DELETE });
    setShowError(false)
  };

  // Pobranie szczegółów oferty
  useEffect(() => {
    dispatch(getMyOffersPrice(context.id))
    if (context.barrel_bulk == "kg") { setPackagingList(kgList) }
    else if (context.barrel_bulk == "szt") { setPackagingList(artList) }
    else setPackagingList(literList)
  }, []);

  // console.log('context-->', context)
  // console.log('packagingList-->', packagingList)

  useEffect(() => {
    if (success) {
      setFlag(true)
      setPriceList(result)
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setShowError(true)
    }
  }, [error]);
  useEffect(() => {
    if (packagingList.lenght == 0) {
      if (context.barrel_bulk == "kg") { setPackagingList(kgList) }
      else if (context.barrel_bulk == "szt") { setPackagingList(artList) }
      else setPackagingList(literList)
    }
  }, [packagingList.lenght]);
  useEffect(() => {
    let dataTable = [];
    if (flag) {
      dispatch({ type: GET_MYOFFER_DELETE });
      dataTable = priceList.map((item, index) => ({
        id: item.id,
        Lp: (

          <>
            {index === 0 ? 1 : index === 1 ? 2 : 3}
          </>
        ),
        packaging: (
          <>
            {item.package_size ? packagingList.filter((i) => i.value === item.package_size)[0].name
              : null}
          </>
        ),
        price: (
          <>
            {(item.price).toFixed(2)}{item.currency}
          </>
        ),
        sale: (
          <>
            {(item.sale_price).toFixed(2)}{item.currency}
          </>
        ),
        max: (
          <>
            {(item.price_30_day).toFixed(2)}{item.currency}
          </>
        ),
      }));
      setDataTableList(dataTable)
      setFlag2(true)
    }
  }, [flag, packagingList.lenght, success]);

  //styling
  const mainContainer = {
    position: "relative",
    backgroundColor: "whitesmoke",
    width: "80%",
    maxWidth: "600px",
    height: "550px",
    textAlign: "center",
  };

  const modalOverlay = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "grid",
    placeItems: "center",
    transition: `all 0.3s linear`,
    visibility: "hidden",
    zIndex: "-1",
  };

  const showModalOverlay = {
    ...modalOverlay,
    visibility: "visible",
    zIndex: "10",
  };

  const title = {
    color: "black",
    fontSize: "1.5rem",
    fontWeight: "500",
    marginTop: "1rem",
  };

  const body = {
    textAlign: "left",
    marginLeft: "3rem",
    marginRight: "1rem",
    fontWeight: "500",
    fontSize: "1.0rem",
  };

  const btn = {
    position: "absolute",
    border: "none",
    padding: "0.5rem",
    minWidth: "100px",
    borderRadius: "1rem",
    color: "white",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: "0.9rem",
  };

  const yesBtn = {
    ...btn,
    backgroundImage: `linear-gradient(171deg, rgba(29, 223, 77, 1) 45%, rgba(60, 128, 46, 1) 89%)`,
    bottom: "5%",
    right: "42%",
  };
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
  const tableMyproductStyle = {
    ...tableStyle,
    color: "black",
    backgroundImage: `linear-gradient(183deg, rgb(236, 181, 26) 0%, rgb(217, 196, 33) 100%)`,
  };
  const tableColumns = [
    {
      key: "Lp",
      label: t("MyproductPrice_version"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "packaging",
      label: t("MyproductPrice_packaging"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "price",
      label: t("MyproductPrice_price"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "sale",
      label: t("MyproductPrice_sale"),
      styleTableCell: tableCell,
      styleHeader: styleHeader,
    },
    {
      key: "max",
      label: t("MyproductPrice_max"),
      styleTableCell: tableCellNoBorderRight,
      styleHeader: styleHeader,
    },
  ];



  return (
    <div style={showModalOverlay}>
      <div style={mainContainer}>
        {showError ?
          <ErrorMesageRedux
            confirmYes={closeError}
            error={error}
          /> : null}
        <div style={title}>{t("InfoOffer_title")}</div>
        <Divider backgroundColor="gray" />
        <div style={body}>
          {t("Myproduct_name")} :{ }
          {context.id_my_product.id_product.photo ? (
            <img
              style={{ width: "50px", marginRight: "1rem", marginLeft: "1rem", borderRadius: "10%" }}
              src={context.id_my_product.id_product.photo}
            />
          ) : (
            <img
              style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
              src={noImage}
            />
          )}
          {context.id_my_product.id_product.name}
          {t("Product_country")}
          {context.country_of_origin}
        </div>
        <div style={body}>
          <DateComponentRange
            dateFrom={context.offer_from}
            dateTo={context.offer_to}
          />
        </div>
        <div style={body}>
          {t("Quantity_curent")}
          {context.current_quantity}[{context.barrel_bulk_short}]
          {t("Quantity_start")}
          {context.quantity}[{context.barrel_bulk_short}]
        </div>
        <div style={body}>
          {t("Expiration_date")}{context.term_of_validity}
        </div>

        {loading ?
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DotsLoader />
          </div>
          :
          flag2 ?
            <TableComponent
              data={dataTableList}
              columns={tableColumns}
              tableStyle={tableMyproductStyle}
              mainTableContainer={mainTableContainer}
            />
            : null
        }



        <button style={yesBtn} onClick={(e) => confirm(e)}>
          {t("btn_ok")}
        </button>
      </div>
    </div>
  );
}

export default InfoOffer;




