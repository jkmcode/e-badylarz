import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Main from "../images/logo-ct.png";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BackToLogin from "../admin/BackToLogin";

function DashboardScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const shopsParam = params.shopsParam;
  const districtParam = params.districtParam;
  const citiesParam = params.citiesParam;
  const productsParam = params.productsParam;
  const productTypeParam = params.productsTypeParam;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const detectSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowWidth]);

  return (
    <>
      <BackToLogin />
      {windowWidth > 1200 && (
        <aside
          className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 mt-6 fixed-start ms-3 bg-gradient-dark"
          id="sidenav-main"
        >
          <div className="sidenav-header">
            <i
              className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
              aria-hidden="true"
              id="iconSidenav"
            ></i>
            <a
              className="navbar-brand m-0"
              href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
              target="_blank"
            >
              <img
                src={Main}
                className="navbar-brand-img h-100"
                alt="main_logo"
              ></img>
              <span className="ms-1 font-weight-bold text-white">
                {t("DashboardScreen_sidebar_title")}
              </span>
            </a>
          </div>
          <hr className="horizontal light mt-0 mb-2"></hr>
          <div
            className="collapse navbar-collapse  w-auto "
            id="sidenav-collapse-main"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/dashboard/district/district"
                  className={
                    districtParam === "district"
                      ? "nav-link text-white active bg-gradient-primary"
                      : "nav-link text-white"
                  }
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_1")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dashboard/shops/shops"
                  className={
                    shopsParam === "shops"
                      ? "nav-link text-white active bg-gradient-primary"
                      : "nav-link text-white"
                  }
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_2")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dashboard/cities/cities"
                  className={
                    citiesParam === "cities"
                      ? "nav-link text-white active bg-gradient-primary"
                      : "nav-link text-white"
                  }
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">Cities</span>
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/dashboard/products/products"
                  className={
                    productsParam === "products"
                      ? "nav-link text-white active bg-gradient-primary"
                      : "nav-link text-white"
                  }
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_3")}
                    </span>
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/dashboard/productsType/products-type"
                  className={
                    productTypeParam === "productsType"
                      ? "nav-link text-white active bg-gradient-primary"
                      : "nav-link text-white"
                  }
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_3a")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  href="../pages/virtual-reality.html"
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <img
                      src={Main}
                      className="navbar-brand-img h-100"
                      alt="main_logo"
                    ></img>
                    <span className="nav-link-text ms-1">
                      {t("DashboardScreen_sidebar_subtitle_4")}
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      )}

      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div className="w-95 py-4 ps-6">
          <div className="row">
            <div className="col-12">
              <div
                className={
                  districtParam === "district"
                    ? "card-shadow"
                    : "card my-4 card-shadow"
                }
              >
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardScreen;
