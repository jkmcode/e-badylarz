import React, { useState, useEffect } from "react";
import { Nav, NavDropdown, Button } from "react-bootstrap";
import i18next from "i18next";
import Flags from "country-flag-icons/react/3x2";
import cookies from "js-cookie";
import GlobeIcon from "../icons/globeIcon";

function LanguageSwitcher_supp(props) {
  const Flag = Flags[props.country_flag];

  return <Flag className="flag" />;
}

function LanguageSwitcher() {
  const [currentLanguageCode, setCurrentLanguageCode] = useState(
    cookies.get("i18next") || "en"
  );

  const language = [
    {
      code: "en",
      name: "English",
      country: "GB",
    },

    {
      code: "pl",
      name: "Polski",
      country: "PL",
    },
  ];

  const currentLanguage = language.find((l) => l.code === currentLanguageCode);

  const handleChangeLng = (countryCode) => {
    i18next.changeLanguage(countryCode);
    setCurrentLanguageCode(countryCode);
  };

  return (
    <Nav>
      <LanguageSwitcher_supp country_flag={currentLanguage.country} />
      <NavDropdown title={<GlobeIcon />}>
        {language.map(({ code, name, country }) => (
          <div key={code}>
            <NavDropdown.Item
              key={country}
              onClick={() => handleChangeLng(code)}
              disabled={currentLanguage.code === code}
            >
              <LanguageSwitcher_supp country_flag={country} />
              {name}
            </NavDropdown.Item>
          </div>
        ))}
      </NavDropdown>
    </Nav>
  );
}

export default LanguageSwitcher;
