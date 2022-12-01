const reducer = (state, action) => {
  if (action.type === "INCREASE_ITEM") {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    localStorage.setItem("lastChangeCart", JSON.stringify(Date.now()));
    localStorage.setItem("cartProducts", JSON.stringify(tempCart));
    return { ...state, cart: tempCart };
  } else if (action.type === "DECREASE_ITEM") {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          if (item.amount <= 0) {
            return { ...item, amount: 0 };
          } else {
            return { ...item, amount: item.amount - 1 };
          }
        }
        return item;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    localStorage.setItem("lastChangeCart", JSON.stringify(Date.now()));
    localStorage.setItem("cartProducts", JSON.stringify(tempCart));
    return { ...state, cart: tempCart };
  } else if (action.type === "REMOVE_CART_ITEM") {
    let newCartList = state.cart.filter((item) => item.id !== action.payload);
    localStorage.setItem("lastChangeCart", JSON.stringify(Date.now()));
    localStorage.setItem("cartProducts", JSON.stringify(newCartList));
    return { ...state, cart: newCartList };
  } else if (action.type === "GET_TOTAL") {
    if (state.cart === null || state.cart.length === 0) {
      return { ...state };
    } else {
      let { total, amount } = state.cart.reduce(
        (cartTotal, CartItem) => {
          const { price, amount } = CartItem;
          cartTotal.amount += amount;
          cartTotal.total += price * amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    }
  }
  return state;
};

export default reducer;
