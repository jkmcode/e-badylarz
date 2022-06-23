import React, { useEffect } from "react";
import Main from "../images/logo-ct.png";
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DashboardScreen() {
  const params = useParams();
  const navigate = useNavigate();

  const shopsParam = params.shopsParam;
  const districtParam = params.districtParam;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success } = userLogin;

  useEffect(() => {
    if (!success) {
      navigate("/login-admin");
    }
  }, [success]);

  return (
    <>
      <aside
        class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 mt-6 fixed-start ms-3 bg-gradient-dark"
        id="sidenav-main"
      >
        <div class="sidenav-header">
          <i
            class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <a
            class="navbar-brand m-0"
            href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
            target="_blank"
          >
            <img
              src={Main}
              class="navbar-brand-img h-100"
              alt="main_logo"
            ></img>
            <span class="ms-1 font-weight-bold text-white">Admin panel</span>
          </a>
        </div>
        <hr class="horizontal light mt-0 mb-2"></hr>
        <div
          class="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link
                to="/dashboard/district/district"
                className={
                  districtParam === "district"
                    ? "nav-link text-white active bg-gradient-primary"
                    : "nav-link text-white"
                }
              >
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <img
                    src={Main}
                    class="navbar-brand-img h-100"
                    alt="main_logo"
                  ></img>
                  <span class="nav-link-text ms-1">District</span>
                </div>
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/dashboard/shops/shops"
                className={
                  shopsParam === "shops"
                    ? "nav-link text-white active bg-gradient-primary"
                    : "nav-link text-white"
                }
              >
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <img
                    src={Main}
                    class="navbar-brand-img h-100"
                    alt="main_logo"
                  ></img>
                  <span class="nav-link-text ms-1">Shops</span>
                </div>
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white " href="../pages/billing.html">
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <img
                    src={Main}
                    class="navbar-brand-img h-100"
                    alt="main_logo"
                  ></img>
                  <span class="nav-link-text ms-1">Products</span>
                </div>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-white "
                href="../pages/virtual-reality.html"
              >
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <img
                    src={Main}
                    class="navbar-brand-img h-100"
                    alt="main_logo"
                  ></img>
                  <span class="nav-link-text ms-1">Other</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div class="w-95 py-4 ps-6">
          <div class="row">
            <div class="col-12">
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
