import React from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { adminCategory } from "../Data/dashboardData";
import useResponsive from "../component/useResponsive";
import useBackToLogin from "../component/useBackToLogin";
import ContentContainer from "../component/ContentContainer";
import AdminScreenDistrict from "../admin/AdminScreenDistrict";

import { navLinksAdminPanel } from "../Data/NavTopAdminData";

function DashboardScreen() {
  const { t } = useTranslation();
  const { windowWidth } = useResponsive();
  useBackToLogin();

  const divider = {
    marginTop: "1rem",
    backgroundImage: `linear-gradient(90deg, rgb(216, 27, 96), #fff, rgba(255, 255, 255, 0))`,
    backgroundColor: "transparent",
    display: "flex",
    height: "0.9px",
    margin: "1rem 0.7rem",
  };

  const textCenter = {
    marginLeft: "0.7rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const sidebarHeader = {
    display: "flex",
    alignItems: "center",
    margin: "1rem",
    paddingBottom: "1rem",
  };

  const sidebarTitle = {
    marginLeft: "0.8rem",
    fontWeight: "500",
    color: "white",
  };

  const sidebarContainer = {
    backgroundImage: `linear-gradient(195deg, #42424a 0%, #191919 100%)`,
    display: "block",
    position: "fixed",
    top: "0",
    bottom: "0",
    width: "100%",
    maxWidth: `14.625rem`,
    overflowY: "auto",
    padding: "0",
    boxShadow: "none",
    margin: "6rem 0rem 1rem 1rem",
    borderRadius: "0.75rem",
  };

  return (
    <>
      {windowWidth > 1200 && (
        <aside style={sidebarContainer}>
          <div>
            <div style={sidebarHeader}>
              <Icon
                icon="charm:layout-dashboard"
                color="white"
                width="32"
                height="32"
              />
              <span style={sidebarTitle}>
                {t("DashboardScreen_sidebar_title")}
              </span>
            </div>
          </div>
          <div style={divider} />
          <ul>
            {navLinksAdminPanel.map((category) => {
              const { id, path, name, icon } = category;
              if (name !== "") {
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
                      {icon}
                      <span style={textCenter}>{name}</span>
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
        </aside>
      )}
    </>
  );
}

export default DashboardScreen;
