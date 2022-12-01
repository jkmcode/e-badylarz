import { TOTAL_AMOUNT } from "../constants/cartConstans";

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case TOTAL_AMOUNT:
      return { productAmount: action.payload };
    default:
      return state;
  }
};
