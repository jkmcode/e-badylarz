import React from "react";
import { Outlet } from "react-router-dom";
import NavbarTopUser from "./NavbarTopUser";
import ToTheTopButton from "./ToTheTopButton";
import Cookie from "./Cookie";

function ShareLayouts() {
  return (
    <>
      <NavbarTopUser />
      <ToTheTopButton />
      <Cookie />
      <Outlet />
    </>
  );
}

export default ShareLayouts;
