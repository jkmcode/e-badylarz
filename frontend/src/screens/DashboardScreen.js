import React from "react";
import { useTranslation } from "react-i18next";
import Main from "../images/logo-ct.png";
import { NavLink } from "react-router-dom";
import { adminCategory } from "../Data/dashboardData";
import BackToLogin from "../admin/BackToLogin";
import useResponsive from "../component/useResponsive";

function DashboardScreen() {
  const { t } = useTranslation();
  const { windowWidth } = useResponsive();

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
              {adminCategory.map((category) => {
                const { id, path, name } = category;
                return (
                  <li key={id}>
                    <NavLink
                      to={path}
                      style={({ isActive }) => {
                        return {
                          backgroundColor: isActive ? "#D81B60" : "transparent",
                          color: "white",
                          display: "flex",
                          justifyContent: "flex-start",
                          textAlign: "center",
                          padding: "12px 16px",
                          margin: "0 16px 1.5px",
                          borderRadius: "0.375rem",
                        };
                      }}
                    >
                      <img
                        src={Main}
                        className="navbar-brand-img h-100"
                        alt="main_logo"
                      ></img>
                      <span className="nav-link-text ms-1">{name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}

export default DashboardScreen;
