import { TOTAL_AMOUNT } from "../constants/cartConstans";

export const setTotalAmount = (totalAmount) => async (dispatch) => {
  dispatch({ type: TOTAL_AMOUNT, payload: totalAmount });
};
