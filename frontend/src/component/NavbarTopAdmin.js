import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useResponsive from "./useResponsive";
import { useLocation } from "react-router-dom";
import {
  navItems,
  navLinksItem,
  navLinksSettings,
  navLinksAdminPanel,
} from "../Data/NavTopAdminData";
import { HAMBURGER, LOGOUT } from "../constants/adminConstans";
import { logout } from "../actions/userAction";
import LogoNavbar from "../images/logoNavbar.png";

function AdminNavbarTop() {
  const { windowWidth } = useResponsive();
  const [openDropDown, setOpenDropDown] = useState(true);

  /************************STYLE*****************************/
  const navContainer = {
    backgroundImage: `linear-gradient(90deg, rgba(248, 248, 248, 1) 6%, rgba(36, 37, 38, 1) 43%)`,
    height: "4rem",
  };

  const ulContainer = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "0",
  };

  const logo = {
    marginRight: "auto",
    height: "4rem",
    marginLeft: "1rem",
  };

  const contentCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  /************************SUBFUNCTION COMPONENTS*****************************/
  function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60px",
            }}
          >
            <Link to={props.refe} onClick={() => setOpen(!open)}>
              {props.icon}
            </Link>
            {open && props.children}
          </li>
        </ClickAwayListener>
      </>
    );
  }

  function DropdownMenu() {
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const [activeMenu, setActiveMenu] = useState("main");
    const dispatch = useDispatch();
    const currentLocation = useLocation();

    // set primary height
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, []);

    // set current height of element (el)
    const calcHeight = (el) => {
      const height = el.offsetHeight;
      setMenuHeight(height);
    };

    const handleLogout = () => {
      dispatch(logout());
    };

    const submenuContainer = {
      height: menuHeight,
      position: "absolute",
      zIndex: "100",
      top: "60px",
      width: "300px",
      transform: `translateX(-40%)`,
      backgroundColor: "#242526",
      borderRadius: "0.5rem",
      overflow: "hidden",
    };

    const navlinkItem = {
      borderRadius: "0.5rem",
      color: "#dadce1",
      height: "50px",
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      marginBottom: "0.5rem",
    };

    return (
      <>
        <div style={submenuContainer} ref={dropdownRef}>
          <div>
            {/* main */}
            <CSSTransition
              in={activeMenu === "main"}
              timeout={500}
              classNames="menu-primary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div className="navTopMenu">
                {navLinksItem.map((navLink) => {
                  const { id, icon, path, name, goToMenu } = navLink;
                  if (name !== "Logout") {
                    return (
                      <Link
                        key={id}
                        to={path ? path : currentLocation}
                        className="hoverMenuItem"
                        style={navlinkItem}
                        onClick={() =>
                          goToMenu ? setActiveMenu(goToMenu) : null
                        }
                      >
                        <div style={{ marginRight: "0.8rem" }}>{icon}</div>
                        {name}
                      </Link>
                    );
                  } else if (name === LOGOUT) {
                    return (
                      <Link
                        key={id}
                        to={path}
                        className="hoverMenuItem"
                        style={navlinkItem}
                        onClick={handleLogout}
                      >
                        <div style={{ marginRight: "0.8rem" }}>{icon}</div>
                        {name}
                      </Link>
                    );
                  }
                })}
              </div>
            </CSSTransition>
            {/* settings */}
            <CSSTransition
              in={activeMenu === "settings"}
              timeout={500}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div className="navTopMenu">
                {navLinksSettings.map((navLink) => {
                  const { id, icon, path, name, goToMenu } = navLink;
                  return (
                    <Link
                      key={id}
                      to={path ? path : currentLocation}
                      className="hoverMenuItem"
                      style={navlinkItem}
                      onClick={() =>
                        goToMenu ? setActiveMenu(goToMenu) : null
                      }
                    >
                      <div style={{ marginRight: "0.8rem" }}>{icon}</div>
                      {name}
                    </Link>
                  );
                })}
              </div>
            </CSSTransition>
            {/* Admin Panel */}
            <CSSTransition
              in={activeMenu === "admin-panel"}
              timeout={500}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div className="navTopMenu">
                {navLinksAdminPanel.map((navLink) => {
                  const { id, icon, path, name, goToMenu } = navLink;
                  return (
                    <Link
                      key={id}
                      to={path ? path : currentLocation}
                      className="hoverMenuItem"
                      style={navlinkItem}
                      onClick={() =>
                        goToMenu ? setActiveMenu(goToMenu) : null
                      }
                    >
                      <div style={{ marginRight: "0.8rem" }}>{icon}</div>
                      {name}
                    </Link>
                  );
                })}
              </div>
            </CSSTransition>
          </div>
        </div>
      </>
    );
  }

  return (
    <nav style={navContainer}>
      <ul style={ulContainer}>
        <img style={logo} src={LogoNavbar} />
        <>
          <li style={contentCenter}>
            <LanguageSwitcher bg_icon="white" />
          </li>

          {navItems.map((item) => {
            const { id, icon, path, name } = item;
            return (
              <div key={id}>
                {windowWidth > 600 && name !== HAMBURGER && (
                  <NavItem icon={icon} refe={path} name={name} />
                )}
                {name == HAMBURGER && (
                  <NavItem icon={icon} refe={path}>
                    <DropdownMenu />
                  </NavItem>
                )}
              </div>
            );
          })}
        </>
      </ul>
    </nav>
  );
}

export default AdminNavbarTop;
