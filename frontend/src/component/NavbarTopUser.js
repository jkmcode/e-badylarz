import React, { useState, useEffect, useRef } from "react";
import LogoNavbar from "../images/logoNavbar.png";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchBox from "./SearchBox";
import SearchBar from "./SearchBar";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { links } from "../Data/dataNavbar";
import useLocalStorageGetter from "../component/useLocalStorageGetter";
import useResponsive from "./useResponsive";

//redux
import { useSelector } from "react-redux";

function UserNavbarTop() {
  const [toggle, setToggle] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const [index, setIndex] = useState(-1);
  const [isHoverProfile, setIsHoverProfile] = useState(false);
  const [isHoverCart, setIsHoverCart] = useState(false);

  useLocalStorageGetter();
  const { windowWidth } = useResponsive();

  // data from redux
  const totalProductAmount = useSelector((state) => state.cartReducer);
  const { productAmount } = totalProductAmount;

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (toggle) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = `0px`;
    }
  }, [toggle]);

  //styling
  const navbarLogo = {
    marginRight: "auto",
  };

  const navSearcher = {
    position: "absolute",
    top: "50%",
    left: "40%",
    transform: "translate(-50%, -50%)",
  };

  const navItem = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconButtonUser = {
    margin: "2px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const profileIconActive = {
    ...iconButtonUser,
    color: "#e9f5e9",
  };

  const profileIconUnactive = {
    ...iconButtonUser,
    color: "black",
  };

  const cartIconActive = {
    ...iconButtonUser,
    color: "#e9f5e9",
  };

  const cartIconUnactive = {
    ...iconButtonUser,
    color: "black",
    position: "relative",
  };

  const amountContainer = {
    position: "absolute",
    bottom: "-0.15rem",
    right: "0.1rem",
    backgroundColor: "rgb(253, 241, 0)",
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const navBarTopUser = {
    position: "relative",
    height: "10vh",
    minHeight: "50px",
    backgroundColor: "#c6ebd7",
    borderBottom: "#c6ebd7",
    zIndex: "1000",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  };

  const totalAmount = {
    marginBottom: "0",
    fontWeight: "500",
  };

  const navbarTopNav = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const navToggle = {
    backgroundColor: "transparent",
    borderColor: "transparent",
  };

  const linksContainer = {
    position: "absolute",
    zIndex: "999",
    height: windowWidth > 800 ? "0" : "auto !important",
    overflow: "hidden",
    backgroundColor: "#c6ebd7",
    width: "100%",
    transition: `all 0.3s linear`,
  };

  const linkCategory = {
    fontSize: "1.1rem",
    textTransform: "capitalize",
    paddingTop: "0.7rem",
    paddingBottom: "0.7rem",
    paddingLeft: "0.5rem",
  };

  const unactiveLink = {
    ...linkCategory,
    color: "black",
    transition: `all 0.3s linear`,
  };

  const activeLink = {
    ...linkCategory,
    color: "white",
    backgroundColor: "#87edb6",
    width: "100%",
    paddingLeft: "1rem",
    transition: `all 0.3s linear`,
  };

  return (
    <>
      <Navbar>
        <img style={navbarLogo} src={LogoNavbar} alt="LOGO" />
        {windowWidth > 800 ? (
          <li style={navSearcher}>
            <SearchBox />
          </li>
        ) : null}
        <li style={navItem}>
          <LanguageSwitcher />
        </li>
        {windowWidth > 800 ? (
          <>
            <li style={navItem}>
              <Link
                to="cart"
                style={isHoverCart ? cartIconActive : cartIconUnactive}
              >
                <Icon
                  icon="clarity:list-solid-badged"
                  width="32"
                  height="32"
                  onMouseEnter={() => setIsHoverCart(true)}
                  onMouseLeave={() => setIsHoverCart(false)}
                />
              </Link>
            </li>
            <li style={navItem}>
              <Link
                to="profile"
                style={isHoverProfile ? profileIconActive : profileIconUnactive}
              >
                <Icon
                  icon="gg:profile"
                  width="32"
                  height="32"
                  onMouseEnter={() => setIsHoverProfile(true)}
                  onMouseLeave={() => setIsHoverProfile(false)}
                />
              </Link>
            </li>
            <li style={navItem}>
              <Link to="cart" style={cartIconUnactive}>
                <Icon
                  icon="material-symbols:shopping-cart-outline"
                  width="32"
                  height="32"
                  style={{ transform: `rotateY(180deg)` }}
                />

                {productAmount !== 0 && productAmount !== undefined ? (
                  <div style={amountContainer}>
                    <p style={totalAmount}>{productAmount}</p>
                  </div>
                ) : null}
              </Link>
            </li>
          </>
        ) : (
          <button style={navToggle} onClick={() => setToggle(!toggle)}>
            <Icon icon="charm:menu-hamburger" width="32" height="32" />
          </button>
        )}
      </Navbar>
      <SearchBar />
      <div style={linksContainer} ref={linksContainerRef}>
        <ul ref={linksRef}>
          {links.map((link, linkIndex) => {
            const { id, url, text } = link;
            return (
              <li
                key={id}
                style={linkIndex === index ? activeLink : unactiveLink}
                onMouseEnter={() => setIndex(linkIndex)}
              >
                <Link
                  style={{ color: linkIndex === index ? "white" : "black" }}
                  to={url}
                  onClick={() => setToggle(false)}
                >
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );

  function Navbar(props) {
    return (
      <nav style={navBarTopUser}>
        <ul style={navbarTopNav}>{props.children}</ul>
      </nav>
    );
  }
}

export default UserNavbarTop;
