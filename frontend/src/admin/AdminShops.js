import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getShops } from "../actions/adminActions";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import InfoWindow from "../component/infoWindow";
import { unOrActiveList } from "../actions/adminActions";
import {
  SHOP_DESCRIPTION,
  SET_FLAG_SHOP_TRUE,
  GET_SHOP_DELETE,
  SET_FLAG_IMAGE_FALSE,
  GET_CONTACT_LIST_DELETE,
} from "../constants/adminConstans";
import { Icon } from "@iconify/react";
import useResponsive from "../component/useResponsive";
import useBackToLogin from "../component/useBackToLogin";

function AdminShops() {
  useBackToLogin();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { windowWidth } = useResponsive();

  const [activeShops, setActiveShops] = useState(false);
  const [active, setActive] = useState(false);

  // fech data from Redux
  const shopListRedux = useSelector((state) => state.shopList);
  const { loading, shopList, error } = shopListRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const shopFlagVar = useSelector((state) => state.flag);
  const { shopFlag } = shopFlagVar;

  const getShopRedux = useSelector((state) => state.getShop);
  const { shopDetails } = getShopRedux;

  const imageFlag = useSelector((state) => state.flag);
  const { shopImageFlag } = imageFlag;

  const contactListRedux = useSelector((state) => state.contactList);
  const { ListOfContact } = contactListRedux;

  // fetching list of shops from DB
  useEffect(() => {
    if (shopList.length === 0) {
      dispatch(getShops());
    }

    // delete current data shop in order to edit general data
    // we need to delete them because form in ShopActivity take defaultValue from the old one
    if (shopDetails) {
      dispatch({ type: GET_SHOP_DELETE });
    }

    // change shopImageFlag to Flase while every render. We need that to able open edit/add shop.
    // Otherwise in ShopActivity the condition (successAdd && !isImage) will come true

    if (shopImageFlag) {
      dispatch({ type: SET_FLAG_IMAGE_FALSE });
    }

    if (ListOfContact.length !== 0) {
      dispatch({ type: GET_CONTACT_LIST_DELETE });
    }
  }, [
    dispatch,
    shopList.length,
    activeShops,
    shopImageFlag,
    ListOfContact.lengt,
  ]);

  //  handle function
  const activeHandler = (id) => {
    dispatch(
      unOrActiveList({
        Id: id,
        active: true,
        userId: userInfo.id,
        objType: SHOP_DESCRIPTION,
        kind: "Inactive shop",
      })
    );
    setActive(true);
    dispatch({ type: SET_FLAG_SHOP_TRUE });
  };

  const unActiveHandler = (id) => {
    dispatch(
      unOrActiveList({
        Id: id,
        active: false,
        userId: userInfo.id,
        objType: SHOP_DESCRIPTION,
        kind: "Active shop",
      })
    );
    setActive(false);
    dispatch({ type: SET_FLAG_SHOP_TRUE });
  };

  /// toggle active and inactive shops
  const showShops = () => {
    setActiveShops(!activeShops);
  };

  // style

  const btnUnactive = {
    backgroundColor: "white",
    border: "none",
    fontWeight: "bold",
    fontSize: "0.75rem",
  };

  const headerContainer = {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    position: "relative",
  };

  const formHeader = {
    position: "absolute",
    top: "-3rem",
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: `1fr 2fr 1fr`,
    width: windowWidth < 1200 ? "95%" : "80%",
    backgroundImage: `linear-gradient(195deg, #EC407A 0%, #D81B60 100%)`,
    boxShadow: `0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)`,
    borderRadius: `0.5rem`,
    padding: `1rem 0.5rem`,
  };

  const headerTitle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    color: "white",
    fontWeight: "500",
    fontSize: `calc(1rem + 0.7vw)`,
  };

  const columnTitle = {
    padding: "1.2rem 0rem",
    margin: "0",
    textTransform: "uppercase",
    color: "grey",
    fontSize: "0.65rem",
    fontWeight: "700",
  };

  const firstColumnTitle = {
    ...columnTitle,
    padding: "0.8rem 0.5rem",
  };

  const statusColumnTitle = {
    ...columnTitle,
    textAlign: "center",
  };

  const mainTableContainer = {
    width: "100%",
    minWidth: "800px",
    alignItems: "center",
    verticalAlign: "top",
  };

  const tableContentContainer = {
    padding: "1rem 0rem",
    borderBottom: "solid 1px #A0A0A0",
  };

  const tableActiveLinkContainer = {
    ...tableContentContainer,
    textAlign: "center",
  };

  const tableLinkContainer = {
    textAlign: "center",
    width: "10%",
    paddingLeft: "1.25rem",
    borderBottom: "solid 1px #A0A0A0",
  };

  const tableContent = {
    lineHeight: "1.25",
    fontWeight: "400",
    margin: "0",
    fontSize: "0.75rem",
  };

  const tableBadge = {
    display: "block",
    padding: "0.35rem 0.65rem",
    fontSize: `calc(0.5rem + 0.35vw)`,
    fontWeight: "700",
    lineHeight: "1.25",
    textTransform: "uppercase",
    width: "fit-content",
    color: "white",
    borderRadius: "0.25rem",
    backgroundImage: `linear-gradient(195deg, #EF5350 0%, #E53935 100%)`,
  };

  const shopAddLink = {
    display: "flex",
    alignItems: "center",
    color: "white",
    marginRight: "0.5rem",
    fontSize: `calc(0.8rem + 0.3vw)`,
  };

  const btnShowShops = {
    border: "none",
    backgroundColor: "transparent",
    color: "white",
    fontWeight: "500",
    display: "flex",
    justifyContent: "flex-end",
    fontSize: `calc(0.8rem + 0.3vw)`,
  };

  const btn = {
    backgroundColor: "white",
    border: "none",
    fontWeight: "bold",
    fontSize: `calc(0.5rem + 0.35vw)`,
  };

  const btnSuccess = {
    ...btn,
    color: `#4CAF50`,
  };

  const btnWarning = {
    ...btn,
    color: `#f5f54e`,
  };

  const btnInfo = {
    ...btn,
    color: "#007fff",
  };

  const btnDanger = {
    ...btn,
    color: "#cc0000",
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {shopFlag ? (
            <InfoWindow
              title={t("Window_title")}
              body={
                active
                  ? t("AdminShops_activate_shop_InfoWindow_body")
                  : t("AdminShops_inactivate_shop_InfoWindow_body")
              }
              type="shop"
            />
          ) : null}
          {error ? <ErrorMessage msg={error} timeOut={4000} /> : null}

          <div style={headerContainer}>
            <div style={formHeader}>
              <Link style={shopAddLink} to="add">
                <Icon icon="ic:baseline-plus" color="white" />
                {t("btn_add_shop")}
              </Link>
              <span style={headerTitle}>{t("AdminShops_title")}</span>
              <button
                style={btnShowShops}
                onClick={() => setActiveShops(!activeShops)}
              >
                {activeShops
                  ? t("btn_show_active_shops")
                  : t("btn_show_inactive_shops")}
              </button>
            </div>
          </div>
          {error ? (
            <p>{t("No_data")}</p>
          ) : (
            <div
              style={{
                backgroundColor: "white",
                padding: "1rem",
                paddingTop: "3rem",
              }}
            >
              <div style={{ height: "65vh", overflowY: "auto" }}>
                <table style={mainTableContainer}>
                  <thead style={{ borderBottom: "solid 2px" }}>
                    <tr>
                      <th style={firstColumnTitle}>
                        {t("AdminShops_shop_name")}
                      </th>
                      <th style={columnTitle}>
                        {t("AdminShops_shop_address")}
                      </th>
                      <th style={columnTitle}>
                        {t("AdminShops_shop_tax_number")}
                      </th>
                      <th style={statusColumnTitle}>
                        {t("AdminShops_status")}
                      </th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {shopList.map((shop) => (
                      <tr key={shop.id}>
                        {activeShops & !shop.is_active ? (
                          <>
                            <td style={tableContentContainer}>
                              <p style={tableContent}>{shop.name}</p>
                            </td>
                            <td style={tableContentContainer}>
                              <p style={tableContent}>{shop.city}</p>
                              <p style={tableContent}>
                                {shop.street} {shop.no_building}
                              </p>
                            </td>
                            <td style={tableContentContainer}>
                              <p style={tableContent}>{shop.nip}</p>
                            </td>
                            <td style={tableActiveLinkContainer}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <span style={tableBadge}>
                                  {t("status_inactive")}
                                </span>
                              </div>
                            </td>
                            <td style={tableLinkContainer}>
                              <button
                                style={btnSuccess}
                                onClick={() => activeHandler(shop.id)}
                              >
                                {t("btn_active")}
                              </button>
                            </td>
                            <td style={tableLinkContainer}>
                              <Link to={`${shop.id}/edit`} style={btnWarning}>
                                {t("btn_edit")}
                              </Link>
                            </td>
                            <td style={tableLinkContainer}>
                              <Link to={`${shop.id}/contact`} style={btnInfo}>
                                {t("btn_contact")}
                              </Link>
                            </td>
                          </>
                        ) : null}
                        {!activeShops & shop.is_active ? (
                          <>
                            <td style={tableContentContainer}>
                              <p style={tableContent}>{shop.name}</p>
                            </td>
                            <td style={tableContentContainer}>
                              <p style={tableContent}>{shop.city}</p>
                              <p style={tableContent}>
                                {shop.street} {shop.no_building}
                              </p>
                            </td>
                            <td style={tableContentContainer}>
                              <p style={tableContent}>{shop.nip}</p>
                            </td>
                            <td style={tableActiveLinkContainer}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <span style={tableBadge}>
                                  {t("status_inactive")}
                                </span>
                              </div>
                            </td>
                            <td style={tableLinkContainer}>
                              <button
                                style={btnDanger}
                                onClick={() => unActiveHandler(shop.id)}
                              >
                                {t("btn_unactive")}
                              </button>
                            </td>
                            <td style={tableLinkContainer}>
                              <Link to={`${shop.id}/edit`} style={btnWarning}>
                                {t("btn_edit")}
                              </Link>
                            </td>
                            <td style={tableLinkContainer}>
                              <Link to={`${shop.id}/contact`} style={btnInfo}>
                                {t("btn_contact")}
                              </Link>
                            </td>
                          </>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AdminShops;
