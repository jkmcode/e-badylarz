import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTotalAmount } from "../actions/cartAction";
import { INTERVAL_BAG } from "../constants/cartConstans";

const getLocalStorage = () => {
  let cartData = JSON.parse(localStorage.getItem("cartProducts"));
  return cartData;
};

const getLastChangeCart = () => {
  let lastChangeDate = JSON.parse(localStorage.getItem("lastChangeCart"));
  let currentDate = Date.now();
  let interval = INTERVAL_BAG;

  console.log("lastChangeDate", lastChangeDate);

  if (
    currentDate - lastChangeDate > interval &&
    lastChangeDate !== "empty" &&
    lastChangeDate !== null
  ) {
    localStorage.setItem("cartProducts", JSON.stringify([]));
    localStorage.setItem("lastChangeCart", JSON.stringify("empty"));
  }

  return "xyz";
};

function useLocalStorageGetter() {
  const [cartLocalStorage] = useState(getLocalStorage());
  const dispatch = useDispatch();

  console.log("getLastChangeCart", getLastChangeCart());

  useEffect(() => {
    if (cartLocalStorage === null || cartLocalStorage.length === 0) {
    } else {
      const totalAmount = cartLocalStorage.reduce((total, item) => {
        return total + item.amount;
      }, 0);

      dispatch(setTotalAmount(totalAmount));
    }
  }, [cartLocalStorage]);

  return cartLocalStorage;
}

export default useLocalStorageGetter;
