import {
  ADD_PRODUCT_CAT_REQUEST,
  ADD_PRODUCT_CAT_SUCCESS,
  ADD_PRODUCT_CAT_FAIL,
  ADD_PRODUCT_CAT_DELETE,
  GET_PRODUCT_CAT_LIST_REQUEST,
  GET_PRODUCT_CAT_LIST_SUCCESS,
  GET_PRODUCT_CAT_LIST_FAIL,
  GET_PRODUCT_CAT_LIST_DELETE,
  ADD_PRODUCT_CAT_DELETE_SUCCESS,
} from "../constants/productConstans";

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_CAT_REQUEST:
      return { loading: true, success: false, successAdd: false };
    case ADD_PRODUCT_CAT_SUCCESS:
      return {
        loading: false,
        success: true,
        successAdd: true,
        result: action.payload,
      };
    case ADD_PRODUCT_CAT_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        successAdd: false,
      };
    case ADD_PRODUCT_CAT_DELETE:
      return {};
    default:
      return state;
  }
};

export const productCatListReducer = (
  state = { productCatList: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_CAT_LIST_REQUEST:
      return {
        loading: true,
        success: false,
        successAdd: false,
        productCatList: [],
      };
    case GET_PRODUCT_CAT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        successAdd: false,
        productCatList: action.payload,
      };
    case GET_PRODUCT_CAT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        successAdd: false,
        productCatList: [],
      };
    case GET_PRODUCT_CAT_LIST_DELETE:
      return { productCatList: [] };

    case ADD_PRODUCT_CAT_DELETE_SUCCESS:
      return {
        loading: false,
        successAdd: false,
        productCatList: action.payload,
      };

    default:
      return state;
  }
};
