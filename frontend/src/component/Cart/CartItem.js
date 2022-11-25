import React from "react";
import { Icon } from "@iconify/react";
import { useGlobalContext } from "./context";

function CartItem({ id, img, title, price, amount }) {
  const { amountItemsIncrease, amountItemsDecrease, removeProduct } =
    useGlobalContext();

  const cartItem = {
    backgroundColor: "white",
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: `auto 1fr auto auto`,
    padding: "1rem",
    borderBottomStyle: "solid",
    borderBottomColor: "grey",
    borderBottomWidth: "1.5px",
  };

  const cartImg = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  };

  const itemTitle = {
    fontSize: `calc(0.8rem + 0.3vw)`,
    fontWeight: "500",
  };

  const itemPrice = {
    fontSize: `calc(0.8rem + 0.3vw)`,
    color: "#617d98",
  };

  const removeItem = {
    backgroundColor: "transparent",
    borderColor: "transparent",
    fontSize: `1.5rem`,
    color: "red",
  };

  const amontBtn = {
    ...removeItem,
    color: "black",
    padding: "0",
  };

  const amountItems = {
    marginBottom: "0",
    textAlign: "right",
    lineHeight: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <article style={cartItem}>
      <img style={cartImg} src={img} alt={title} />
      <div>
        <div style={itemTitle}>{title}</div>
        <div style={itemPrice}>${price}</div>
      </div>
      <div style={{ textAlign: "right", marginRight: "0.5rem" }}>
        <div style={{}}>
          <button style={amontBtn} onClick={() => amountItemsIncrease(id)}>
            <Icon icon="ic:round-keyboard-arrow-up" />
          </button>
          <p style={amountItems}>{amount}</p>
          <button style={amontBtn} onClick={() => amountItemsDecrease(id)}>
            <Icon icon="material-symbols:keyboard-arrow-down" />
          </button>
        </div>
      </div>

      <div>
        <button style={removeItem} onClick={() => removeProduct(id)}>
          <Icon icon="material-symbols:delete-outline" />
        </button>
      </div>
    </article>
  );
}

export default CartItem;
