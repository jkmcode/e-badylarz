import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

function ToTheTopButton() {
  const [backToButton, setBackToButton] = useState(false);

  const checkscrollY = () => {
    if (window.scrollY > 100) {
      setBackToButton(true);
    } else {
      setBackToButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkscrollY);

    return () => {
      window.removeEventListener("scroll", checkscrollY);
    };
  });

  const btnStyle = {
    position: "fixed",
    bottom: "30px",
    right: "10px",
    zIndex: "1000",
    border: "transparent",
    fontSize: "3.5rem",
    backgroundColor: "transparent",
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {backToButton && (
        <button style={btnStyle} onClick={scrollUp}>
          <Icon icon="ph:arrow-fat-line-up-fill" color="#b82b21" />
        </button>
      )}
    </>
  );
}

export default ToTheTopButton;
