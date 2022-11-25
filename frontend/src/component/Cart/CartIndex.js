import React from "react";
import CartContainer from "./CartContainer";
import NavbarTopUser from "../NavbarTopUser";
import { AppProvider } from "./context";

function CartIndex() {
  return (
    <AppProvider>
      <CartContainer />
    </AppProvider>
  );
}

export default CartIndex;
