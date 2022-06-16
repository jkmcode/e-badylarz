import {
  TEST_REQUEST,
  TEST_SUCCESS,
  TEST_FAIL,
} from "../constants/testConstans";

export const testListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case TEST_REQUEST:
      return { loading: true, products: [] };
    case TEST_SUCCESS:
      return { loading: false, products: action.payload };
    case TEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
