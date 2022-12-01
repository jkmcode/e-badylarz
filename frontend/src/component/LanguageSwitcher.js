import React, { useState, useEffect } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import i18next from "i18next";
import Flags from "country-flag-icons/react/3x2";
import cookies from "js-cookie";
import language from "../language";
import { Icon } from "@iconify/react";

function LanguageSwitcherSupp(props) {
  const Flag = Flags[props.country_flag];

  return <Flag className="flag" />;
}

function LanguageSwitcher() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isHover, setIsHover] = useState(false);

  const detectSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowWidth]);

  const [currentLanguageCode, setCurrentLanguageCode] = useState(
    cookies.get("i18next") || "en"
  );

  const currentLanguage = language.find((l) => l.code === currentLanguageCode);

  const handleChangeLng = (countryCode) => {
    i18next.changeLanguage(countryCode);
    setCurrentLanguageCode(countryCode);
  };

  const activeIcon = {
    color: "#e9f5e9",
    transition: `all 0.7s linear`,
  };

  const unactiveIcon = {
    color: "black",
    transition: `all 0.7s linear`,
  };

  return (
    <Nav>
      <NavDropdown
        title={
          <Icon
            icon="grommet-icons:language"
            width="32"
            height="32"
            style={isHover ? activeIcon : unactiveIcon}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          />
        }
      >
        {language.map(({ code, name, country }) => (
          <div key={code} style={{ padding: "1rem !important" }}>
            <NavDropdown.Item
              key={country}
              onClick={() => handleChangeLng(code)}
              disabled={currentLanguage.code === code}
            >
              <LanguageSwitcherSupp country_flag={country} />
              <span style={{ paddingLeft: "0.8rem" }}>{name}</span>
            </NavDropdown.Item>
          </div>
        ))}
      </NavDropdown>
    </Nav>
  );
}

export default LanguageSwitcher;
