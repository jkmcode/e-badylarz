import React, { useState } from "react";
import { useGlobalContext } from "./context";
import { useTranslation } from "react-i18next";

function Home() {
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [btnIsHover, setBtnIsHover] = useState(false);

  const { t } = useTranslation();

  const btnCategory = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "green",
    fontSize: "14px",
    fontWeight: "500",
    backgroundColor: btnIsHover ? "#e4f5e6" : "#f5e9ee",
    borderColor: "transparent",
    height: "40px",
    padding: "0 24px",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "1rem",
    borderRadius: "900px",
    boxShadow: `0 0 5px 0 rgb(0 0 0 / 14%)`,
    transition: `all 0.3s linear`,
  };

  return (
    <main>
      <button
        onClick={openSidebar}
        style={btnCategory}
        className="sidebar-toggle"
        onMouseEnter={() => setBtnIsHover(true)}
        onMouseLeave={() => setBtnIsHover(false)}
      >
        {t("btn_products_category")}
      </button>
    </main>
  );
}

export default Home;
