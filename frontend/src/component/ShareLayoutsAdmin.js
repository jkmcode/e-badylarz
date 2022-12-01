import React from "react";
import NavbarTopAdmin from "./NavbarTopAdmin";
import DashboardScreen from "../screens/DashboardScreen";
import ContentContainer from "./ContentContainer";
import { Outlet } from "react-router-dom";

function ShareLayoutsAdmin() {
  return (
    <>
      <NavbarTopAdmin />
      <DashboardScreen />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
}

export default ShareLayoutsAdmin;
