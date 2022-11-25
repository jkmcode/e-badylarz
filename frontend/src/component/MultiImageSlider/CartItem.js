import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

function CartItem({
  image,
  text,
  company,
  cartItemWidth,
  cartItemMargin,
  discount,
  price,
  windowWidth,
}) {
  //variables
  const [isHover, setIsHover] = useState(false);
  const [isHoverBtn, setIsHoverBtn] = useState(false);
  const [amountItems, setAmountItems] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  //ref
  const cartItemRef = useRef(null);

  //translate

  const { t } = useTranslation();

  //styling
  const cartItem = {
    position: "relative",
    borderRadius: "0.5rem",
    minWidth: `${cartItemWidth}px`,
    maxWidth: `${cartItemWidth}px`,
    height: windowWidth > 1000 ? "400px" : "280px",
    backgroundColor: "white",
    margin: `${cartItemMargin}px`,
    color: "white",
    cursor: "pointer",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: isHover ? "2px" : "0.5px",
    boxShadow: `-6px 6px 18px -12px rgba(66, 68, 90, 1)`,
    transition: `all 0.3s linear`,
  };

  const productImage = {
    marginTop: "1rem",
    width: windowWidth < 1000 && "50%",
  };

  const productName = {
    fontSize: windowWidth > 1000 ? "14px" : "12px",
    fontWeight: "500",
    display: "block",
    textAlign: "center",
    color: "grey",
  };

  const companyName = {
    fontSize: windowWidth > 1000 ? "16px" : "14px",
    fontWeight: "500",
    display: "block",
    color: "grey",
    textAlign: "center",
    marginBottom: windowWidth > 1000 ? "1rem" : "0.2rem",
    textTransform: "uppercase",
  };

  const productDiscount = {
    backgroundColor: "#f5e5ed",
    color: "#a4004f",
    fontSize: windowWidth > 1000 ? "15px" : "13px",
    fontWeight: "500",
    borderRadius: "0.25rem",
    padding: "0.25rem",
    textTransform: "capitalize",
  };

  const priceProduct = {
    color: "grey",
    fontSize: windowWidth > 1000 ? "16px" : "14px",
  };

  const buyBtn = {
    display: "flex",
    justifyContent: isClicked ? "space-between" : "center",
    alignItems: "center",
    backgroundColor: isHoverBtn ? "#faf88e" : "rgba(253,241,0,255)",
    borderColor: "transparent",
    fontSize: "1rem",
    width: "100%",
    borderRadius: "1rem",
    textTransform: "uppercase",
    fontWeight: "500",
    color: "#A3A272",
  };

  ///Button mechanism
  const handleBuyProduct = () => {
    setIsClicked(true);
  };

  const handleSubtractItems = () => {
    if (amountItems <= 1) {
      setIsClicked(false);
    } else {
      setAmountItems(amountItems - 1);
    }
  };

  return (
    <div
      ref={cartItemRef}
      style={cartItem}
      className="cartItem"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img style={productImage} src={image} />
      </div>
      <span style={companyName}>{company}</span>
      <span style={productName}>{text}</span>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
        }}
      >
        <div style={{ marginLeft: "0.7rem", marginRight: "0.7rem" }}>
          {discount && <div style={productDiscount}>{t("promotion")}</div>}
          <div style={priceProduct}>
            {t("price")}: {price}
          </div>
          {isClicked && (
            <button
              style={buyBtn}
              onMouseEnter={() => setIsHoverBtn(true)}
              onMouseLeave={() => setIsHoverBtn(false)}
            >
              <Icon
                onClick={handleSubtractItems}
                style={{
                  marginRight: "0.25rem",
                  fontSize: "1.25rem",
                }}
                icon="mdi:minus-box"
              />
              {amountItems}
              <Icon
                onClick={() => setAmountItems(amountItems + 1)}
                style={{
                  marginRight: "0.25rem",
                  fontSize: "1.25rem",
                }}
                icon="mdi:plus-box"
              />
            </button>
          )}
          {!isClicked ? (
            <button
              style={buyBtn}
              onMouseEnter={() => setIsHoverBtn(true)}
              onMouseLeave={() => setIsHoverBtn(false)}
              onClick={handleBuyProduct}
            >
              <Icon
                style={{
                  marginRight: "0.25rem",
                  fontSize: "1.25rem",
                }}
                icon="ph:shopping-bag-bold"
                color="#a3a272"
              />
              {t("btn_buy")}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
