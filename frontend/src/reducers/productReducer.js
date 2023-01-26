import {
  ADD_PRODUCT_CAT_REQUEST,
  ADD_PRODUCT_CAT_SUCCESS,
  ADD_PRODUCT_CAT_FAIL,
  ADD_PRODUCT_CAT_DELETE,
} from "../constants/productConstans";

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_CAT_REQUEST:
      return { loading: true, success: false };
    case ADD_PRODUCT_CAT_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case ADD_PRODUCT_CAT_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ADD_PRODUCT_CAT_DELETE:
      return {};
    default:
      return state;
  }
};
