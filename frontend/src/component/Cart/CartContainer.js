import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CartItem from "./CartItem";
import { useGlobalContext } from "./context";

//redux
import { useDispatch } from "react-redux";
import { setTotalAmount } from "../../actions/cartAction";

function CartContainer() {
  const { cart, total } = useGlobalContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart !== null) {
      const totalAmount = cart.reduce((total, item) => {
        return total + item.amount;
      }, 0);
      localStorage.setItem("testAmount", JSON.stringify(cart));
      dispatch(setTotalAmount(totalAmount));
    }
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

  const empyCartInfo = {
    textAlign: "center",
    fontSize: "1.3rem",
    fontWeight: "400",
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

  if (cart === null || cart.length === 0) {
    return (
      <section style={cartContainer}>
        <header>
          <h2 style={cartHeader}>{t("my_cart")}</h2>
          <p style={empyCartInfo}>{t("cart_currently_empty")}</p>
        </header>
      </section>
    );
  }

  return (
    <section style={cartContainer}>
      <header>
        <h2 style={cartHeader}>{t("my_cart")}</h2>
      </header>
      <div>
        {cart.map((item, index) => {
          return (
            <>
              <CartItem
                key={item.id}
                {...item}
                length={cart.length}
                index={index}
              />
            </>
          );
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
