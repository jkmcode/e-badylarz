import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./context";
import { links, social } from "../../Data/dataCategoriesSidebar";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import useResponsive from "../useResponsive";

function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  const [index, setIndex] = useState(-1);
  const [subIndex, setSubIndex] = useState(-1);
  const [subSubIndex, setSubSubIndex] = useState(-1);

  const [indexSocial, setIndexSocial] = useState(-1);
  const [hideMainCat, setHideMainCat] = useState(false);
  const [hideSubCat, setHideSubCat] = useState(false);
  const [linkSubCat, setLinkSubCat] = useState(-1);

  const { windowWidth } = useResponsive();

  //

  const sidebar = {
    position: "fixed",
    zIndex: "9999",
    top: "0",
    left: "0",
    width: windowWidth > 676 ? "400px" : "100%",
    height: "100%",
    backgroundColor: "white",
    display: "grid",
    gridTemplateRows: hideMainCat ? `100px 50px 2fr auto` : `100px 2fr auto`,
    rowGap: `1rem`,
    boxShadow: `hsl(360, 67%, 44%)`,
    transition: `all 0.4s linear`,
    transform: isSidebarOpen ? `translate(0%)` : `translate(-100%)`,
    overFlow: `auto`,
  };

  const sidebarHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `0.5rem 0.7rem`,
  };

  const closeBtn = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    backgroundColor: "transparent",
    fontSize: "2rem",
    color: "red",
  };

  const mainLink = {
    display: "flex",
    alignItems: "center",
    textTransform: "capitalize",
    padding: "1rem 1.5rem",
    fontSize: "1.25rem",
    color: "grey",
    letterSpacing: "1px",
  };

  const mainLinkActive = {
    ...mainLink,
    color: "white",
  };

  const subLink = {
    ...mainLink,
    display: "flex",
  };

  const socialIcons = {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "2rem",
  };

  const btnBack = {
    backgroundColor: "transparent",
    borderColor: "transparent",
    display: "flex",
    justifyContent: "flex-start",
    color: "grey",
  };

  const handleLinks = () => {
    setHideMainCat(true);
  };

  const handleDataRemove = () => {
    setHideMainCat(false);
    setHideSubCat(false);

    if (hideMainCat && hideSubCat) {
      setHideMainCat(true);
    }
  };

  const handleSubLinks = (name) => {
    setLinkSubCat(name);
    setHideSubCat(true);
  };

  return (
    <aside style={sidebar}>
      <div style={sidebarHeader}>
        <div>KATEGORIE SKLEPU</div>
        <button className="close-btn" style={closeBtn} onClick={closeSidebar}>
          <Icon icon="mdi:close-thick" />
        </button>
      </div>

      {hideMainCat && (
        <button style={btnBack} onClick={handleDataRemove}>
          <Icon icon="ion:arrow-back-circle" width="48" height="48" />
        </button>
      )}

      {!hideMainCat && (
        <ul>
          {links.map((link, linkIndex) => {
            const { id, url, text, icon } = link;
            return (
              <li
                key={id}
                onMouseEnter={() => setIndex(linkIndex)}
                onClick={() => handleLinks()}
                style={{
                  backgroundColor:
                    linkIndex === index ? "hsl(209, 61%, 16%)" : "white",
                }}
              >
                <Link
                  to="/main-page"
                  style={linkIndex === index ? mainLinkActive : mainLink}
                >
                  {icon} <span style={{ marginLeft: "1rem" }}>{text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {hideMainCat && !hideSubCat ? (
        <ul>
          {links.map((link) => {
            return link.id === index + 1 ? (
              <div key={link.id}>
                {link.sublinks.map((sublink, linkSubIndex) => {
                  return (
                    <li
                      key={sublink.label}
                      onClick={() => handleSubLinks(sublink.label)}
                      onMouseEnter={() => setSubIndex(linkSubIndex)}
                      style={{
                        backgroundColor:
                          linkSubIndex === subIndex
                            ? "hsl(209, 61%, 16%)"
                            : "white",
                      }}
                    >
                      <Link
                        to="/main-page"
                        style={
                          linkSubIndex === subIndex ? mainLinkActive : mainLink
                        }
                      >
                        {sublink.icon} {sublink.label}
                      </Link>
                    </li>
                  );
                })}
              </div>
            ) : null;
          })}
        </ul>
      ) : null}

      {hideMainCat && hideSubCat && (
        <ul>
          {links.map((link) => {
            return (
              link.id === index + 1 && (
                <div key={link.id}>
                  {link.sublinks.map((sublink) => {
                    return (
                      sublink.label === linkSubCat &&
                      sublink.subsublinks.map((subsublink, linkSubSubIndex) => {
                        return (
                          <li
                            key={subsublink.label}
                            onMouseEnter={() => setSubSubIndex(linkSubSubIndex)}
                            style={{
                              backgroundColor:
                                linkSubSubIndex === subSubIndex
                                  ? "hsl(209, 61%, 16%)"
                                  : "white",
                            }}
                          >
                            <Link
                              to="/main-page"
                              style={
                                linkSubSubIndex === subSubIndex
                                  ? mainLinkActive
                                  : mainLink
                              }
                            >
                              {subsublink.icon} {subsublink.label}
                            </Link>
                          </li>
                        );
                      })
                    );
                  })}
                </div>
              )
            );
          })}
        </ul>
      )}

      <ul style={socialIcons}>
        {social.map((socialIcon, indexSocialIcon) => {
          const { id, url, icon } = socialIcon;
          return (
            <li
              key={id}
              style={{
                padding: "1rem",
                fontSize: "1.2rem",
              }}
              onMouseEnter={() => setIndexSocial(indexSocialIcon)}
              onMouseLeave={() => setIndexSocial(-1)}
            >
              <Link
                to="/main-page"
                style={{
                  color:
                    indexSocial === indexSocialIcon
                      ? "black"
                      : "hsl(205, 78%, 60%)",
                  transition: `all 0.4s linear`,
                }}
              >
                {icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
