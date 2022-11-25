import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CartItem from "./CartItem";
import { useGlobalContext } from "./context";
//import cart from "../../Data/cartData";
import useLocalStorage from "./useLocalStorage";

function CartContainer() {
  const { cart, total } = useGlobalContext();

  //const [value, setValue] = useLocalStorage("key", "initial");

  //testing LocalStorage
  useEffect(() => {
    let totalAmount = cart.reduce((total, item) => {
      return total + item.amount;
    }, 0);
    localStorage.setItem("testAmount", JSON.stringify(totalAmount));
    //setValue(totalAmount);
  }, [cart]);

  //

  //translate
  const { t } = useTranslation();

  //styling
  const cartContainer = {
    minHeight: `calc(100vh - 120px)`,
    width: `90vw`,
    margin: `0 auto`,
    marginTop: "40px",
    padding: `2.5rem 0`,
    maxWidth: "800px",
  };

  const cartHeader = {
    textAlign: "center",
    textTransform: "capitalize",
  };

  const divider = {
    width: "100%",
    height: "1.5px",
    backgroundColor: "grey",
    marginTop: "1rem",
  };

  const cartTotal = {
    textTransform: "capitalize",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    fontSize: "1.5rem",
  };

  return (
    <section style={cartContainer}>
      <header>
        <h2 style={cartHeader}>{t("my_cart")}</h2>
      </header>
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <div style={divider}></div>
        <div style={cartTotal}>
          {t("total_price")} <span>{total} PLN</span>
        </div>
      </footer>
    </section>
  );
}

export default CartContainer;
