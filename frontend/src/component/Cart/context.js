import React, { useEffect, useContext, useReducer } from "react";
import cartItems from "../../Data/cartData";
import reducer from "./reducer";

//const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const getLocalStorage = () => {
  let cartData = JSON.parse(localStorage.getItem("cartProducts"));
  return cartData;
};

const AppProvider = ({ children }) => {
  const InitialState = {
    loading: false,
    cart: getLocalStorage(),
    total: 1000,
    amount: 0,
  };
  const [state, dispatch] = useReducer(reducer, InitialState);

  const amountItemsIncrease = (id) => {
    dispatch({ type: "INCREASE_ITEM", payload: id });
  };

  const amountItemsDecrease = (id) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
  };

  const removeProduct = (id) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        amountItemsIncrease,
        amountItemsDecrease,
        removeProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
