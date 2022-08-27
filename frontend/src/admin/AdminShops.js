import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getShops } from "../actions/adminActions";
import Loader from "../component/Loader";
import InfoWindow from "../component/infoWindow";
import { unOrActiveList } from "../actions/adminActions";
import {
  SHOP_DESCRIPTION,
  SET_FLAG_SHOP_TRUE,
  GET_SHOP_DELETE,
  SET_FLAG_IMAGE_FALSE,
} from "../constants/adminConstans";

function AdminShops() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
  }, [dispatch, shopList.length, activeShops, shopImageFlag]);

  //  handle function
  const activeHandler = (id) => {
    dispatch(
      unOrActiveList({
        Id: id,
        active: true,
        userId: userInfo.id,
        objType: SHOP_DESCRIPTION,
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
  const btnDelete = {
    backgroundColor: "white",
    border: "none",
    fontWeight: "bold",
  };

  const btnShowShops = {
    border: "none",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "transparent",
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

          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h3 className="text-white text-capitalize text-center ps-3">
                {t("AdminShops_title")}
              </h3>
              <div className="d-flex justify-content-between">
                <Link className="text-white text-capitalize ps-3" to="add">
                  {t("btn_add_shop")}
                </Link>
                <button
                  style={btnShowShops}
                  className="text-sm"
                  onClick={() => showShops()}
                >
                  {activeShops
                    ? t("btn_show_active_shops")
                    : t("btn_show_inactive_shops")}
                </button>
              </div>
            </div>
          </div>
          {error ? (
            <p>{t("No_data")}</p>
          ) : (
            <div className="card-body px-0 pb-2">
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          {t("AdminShops_shop_name")}
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          {t("AdminShops_shop_address")}
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          {t("AdminShops_shop_tax_number")}
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          {t("AdminShops_status")}
                        </th>
                        <th className="text-secondary opacity-7"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {shopList.map((shop) => (
                        <tr key={shop.id}>
                          {activeShops & !shop.is_active ? (
                            <>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <p className="text-xs text-secondary mb-0">
                                      {shop.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {shop.city}
                                </p>
                                <p className="text-xs text-secondary mb-0">
                                  {shop.street} {shop.no_building}
                                </p>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {shop.nip}
                                </p>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className="badge badge-sm bg-gradient-danger">
                                  Inactive
                                </span>
                              </td>
                              <td className="align-middle">
                                <button
                                  style={btnDelete}
                                  className="text-xs text-success"
                                  onClick={() => activeHandler(shop.id)}
                                >
                                  {t("btn_active")}
                                </button>
                              </td>
                              <td className="align-middle">
                                <Link
                                  to={`${shop.id}/edit`}
                                  className="text-xs text-warning"
                                >
                                  {t("btn_edit")}
                                </Link>
                              </td>
                              <td className="align-middle">
                                <Link
                                  to={`${shop.id}/contact`}
                                  className="text-xs text-info"
                                >
                                  {t("btn_contact")}
                                </Link>
                              </td>
                            </>
                          ) : null}
                          {!activeShops & shop.is_active ? (
                            <>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <p className="text-xs text-secondary mb-0">
                                      {shop.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {shop.city}
                                </p>
                                <p className="text-xs text-secondary mb-0">
                                  {shop.street} {shop.no_building}
                                </p>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {shop.nip}
                                </p>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className="badge badge-sm bg-gradient-success">
                                  Active
                                </span>
                              </td>
                              <td className="align-middle">
                                <button
                                  style={btnDelete}
                                  className="text-xs text-danger"
                                  onClick={() => unActiveHandler(shop.id)}
                                >
                                  {t("btn_unactive")}
                                </button>
                              </td>
                              <td className="align-middle">
                                <Link
                                  to={`${shop.id}/edit`}
                                  className="text-xs text-warning"
                                >
                                  {t("btn_edit")}
                                </Link>
                              </td>
                              <td className="align-middle">
                                <Link
                                  to={`${shop.id}/contact`}
                                  className="text-xs text-info"
                                >
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
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AdminShops;
