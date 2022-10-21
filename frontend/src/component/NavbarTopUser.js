import React, { useState, useEffect } from "react";
import LogoNavbar from "../images/logoNavbar.png";
import Account from "../images/account.png";
import ShopList from "../images/shopList.png";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchBox from "./SearchBox";
import SearchBar from "./SearchBar";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function UserNavbarTop() {
  const NavbarLogo = {
    marginRight: "auto",
  };

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
    <Navbar>
      <img className="py-1" style={NavbarLogo} src={LogoNavbar} />
      {windowWidth > 800 ? (
        <li className="search-nav">
          <SearchBox />
        </li>
      ) : null}

      <li className="navTop-item">
        <LanguageSwitcher bg_icon="black" />
      </li>

      <li className="navTop-item">
        <Link to="cart" className="icon-button-user">
          <Icon
            icon="clarity:list-solid-badged"
            width="32"
            height="32"
            color="black"
          />
        </Link>
      </li>
      <li className="navTop-item">
        <Link to="profile" className="icon-button-user">
          <Icon icon="gg:profile" width="32" height="32" color="black" />
        </Link>
      </li>
    </Navbar>
  );

  function Navbar(props) {
    return (
      <nav className="navBarTopUser">
        <ul className="navbarTop-nav px-2">{props.children}</ul>
      </nav>
    );
  }
}

export default UserNavbarTop;
