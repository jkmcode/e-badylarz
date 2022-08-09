import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { Row, Col } from "react-bootstrap";

import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

//images
import { ReactComponent as CogIcon } from "../icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { ReactComponent as BoltIcon } from "../icons/bolt.svg";
import { ReactComponent as Home } from "../icons/Home.svg";
import { ReactComponent as Favorite } from "../icons/Favorite.svg";
import { ReactComponent as Profil } from "../icons/Profil.svg";
import { ReactComponent as Cart } from "../icons/Cart.svg";
import { ReactComponent as Hamburger } from "../icons/Hamburger.svg";
import LogoNavbar from "../images/logoNavbar.png";

function AdminNavbarTop() {
  const { t } = useTranslation();

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
      <img className="testtttt" src={LogoNavbar} />
      {windowWidth > 600 && (
        <>
          <LanguageSwitcher />
          <NavItem icon={<Home />} refe="/" />
          <NavItem icon={<Favorite />} refe="form" />
          <NavItem icon={<Profil />} refe="login-admin" />
          <NavItem icon={<Cart />} refe="/cartScreen" />
        </>
      )}

      <NavItem icon={<Hamburger />} refe="#">
        <DropdownMenu refer="test"></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbarTop">
      <ul className="navbarTop-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <li className="navTop-item">
        <Link
          to={props.refe}
          className="icon-button"
          onClick={() => setOpen(!open)}
        >
          {props.icon}
        </Link>
        {open && props.children}
      </li>
    </ClickAwayListener>
  );
}

function DropdownMenu() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

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

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      // <a
      //   href={props.refer}
      //   className="navTopMenuItem"
      //   onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      // >
      //   <span className="icon-button">{props.leftIcon}</span>
      //   {props.children}
      //   <span className="icon-right">{props.rightIcon}</span>
      // </a>
      <Link
        to={props.refer ? props.refer : "#"}
        className="navTopMenuItem"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </Link>
    );
  }

  return (
    <div
      className="navTopDropdown"
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="navTopMenu">
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            refer="#"
          >
            My Profile
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            UI
          </DropdownItem>
          {windowWidth < 1200 && (
            <DropdownItem
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="adminPanel"
            >
              Admin Panel
            </DropdownItem>
          )}
          {userInfo ? (
            userInfo.IsSuperUser ? (
              <DropdownItem leftIcon={<Profil />} refer="admin">
                Admin
              </DropdownItem>
            ) : null
          ) : null}

          {userInfo ? (
            userInfo.IsAdmin ? (
              <DropdownItem leftIcon={<Cart />}>Admin Shop</DropdownItem>
            ) : null
          ) : null}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="navTopMenu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}></DropdownItem>
          {userInfo ? (
            <DropdownItem leftIcon={<BoltIcon />} refer="logout">
              Logout
            </DropdownItem>
          ) : (
            <DropdownItem leftIcon={<BoltIcon />} refer="login">
              Login
            </DropdownItem>
          )}

          <DropdownItem leftIcon={<BoltIcon />} refer="uploadImage">
            Upload Image
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} refer="searchBox">
            SearchBox
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} refer="carousel">
            Carousel
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} refer="dashboard">
            Dashboard
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "adminPanel"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="navTopMenu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}></DropdownItem>
          {userInfo && (
            <>
              <DropdownItem
                leftIcon={<BoltIcon />}
                refer="/dashboard/district/district"
              >
                District
              </DropdownItem>
              <DropdownItem
                leftIcon={<BoltIcon />}
                refer="/dashboard/shops/shops"
              >
                Shops
              </DropdownItem>
            </>
          )}
        </div>
      </CSSTransition>
    </div>
  );
}

export default AdminNavbarTop;
