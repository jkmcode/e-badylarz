import React from "react";
import LogoNavbar from "../images/logoNavbar.png";
import Account from "../images/account.png";
import ShopList from "../images/shopList.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { Icon } from "@iconify/react";

function UserNavbarTop() {
  const NavbarLogo = {
    marginRight: "auto",
  };

  const btnNavbar = {
    backgroundColor: "transparent",
    border: "none",
  };

  return (
    <Navbar>
      <img className="py-1" style={NavbarLogo} src={LogoNavbar} />
      <LanguageSwitcher />
      <button style={btnNavbar}>
        <img className="py-1" src={ShopList} />
      </button>
      <button style={btnNavbar}>
        <img className="py-1" src={Account} />
      </button>
    </Navbar>
  );

  function Navbar(props) {
    return (
      <nav className="navBarTopUser">
        <ul className="navbarTop-nav px-5">{props.children}</ul>
      </nav>
    );
  }
}

export default UserNavbarTop;
