import {
  ADD_PRODUCT_CAT_REQUEST,
  ADD_PRODUCT_CAT_SUCCESS,
  ADD_PRODUCT_CAT_FAIL,
  ADD_PRODUCT_CAT_DELETE,
  ADD_PRODUCT_SUBCAT_REQUEST,
  ADD_PRODUCT_SUBCAT_SUCCESS,
  ADD_PRODUCT_SUBCAT_FAIL,
  ADD_PRODUCT_SUBCAT_DELETE,
  GET_PRODUCT_CAT_LIST_REQUEST,
  GET_PRODUCT_CAT_LIST_SUCCESS,
  GET_PRODUCT_CAT_LIST_FAIL,
  GET_PRODUCT_CAT_LIST_DELETE,
  ADD_PRODUCT_CAT_DELETE_SUCCESS,
  SORT_BY_LNG_REQUEST,
  SORT_BY_LNG_SUCCESS,
  SORT_BY_LNG_FAIL,
  SORT_BY_LNG_DELETE,
  GET_PRODUCT_SUBCAT_LIST_REQUEST,
  GET_PRODUCT_SUBCAT_LIST_SUCCESS,
  GET_PRODUCT_SUBCAT_LIST_FAIL,
  GET_PRODUCT_SUBCAT_LIST_DELETE,
  GET_PRODUCT_SUBCAT_REQUEST,
  GET_PRODUCT_SUBCAT_SUCCESS,
  GET_PRODUCT_SUBCAT_FAIL,
  GET_PRODUCT_SUBCAT_DELETE,
  EDIT_PRODUCT_SUBCAT_REQUEST,
  EDIT_PRODUCT_SUBCAT_SUCCESS,
  EDIT_PRODUCT_SUBCAT_FAIL,
  EDIT_PRODUCT_SUBCAT_DELETE,
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

export const sortedProductCatListReducer = (
  state = { sortedProductCatList: [] },
  action
) => {
  switch (action.type) {
    case SORT_BY_LNG_REQUEST:
      return {
        loading: true,
        success: false,
        sortedProductCatList: [],
      };
    case SORT_BY_LNG_SUCCESS:
      return {
        loading: false,
        success: true,
        sortedProductCatList: action.payload,
      };
    case SORT_BY_LNG_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        sortedProductCatList: [],
      };
    case SORT_BY_LNG_DELETE:
      return { productCatList: [] };

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

export const subproductCatListReducer = (
  state = { subproductCatList: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_SUBCAT_LIST_REQUEST:
      return {
        loading: true,
        success: false,
        subproductCatList: [],
      };
    case GET_PRODUCT_SUBCAT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        subproductCatList: action.payload,
      };
    case GET_PRODUCT_SUBCAT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        subproductCatList: [],
      };
    case GET_PRODUCT_SUBCAT_LIST_DELETE:
      return { subproductCatList: [] };

    default:
      return state;
  }
};

export const addSubproductCatListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_SUBCAT_REQUEST:
      return { loading: true, success: false };
    case ADD_PRODUCT_SUBCAT_SUCCESS:
      return {
        loading: false,
        success: true,
        result: action.payload,
      };
    case ADD_PRODUCT_SUBCAT_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case ADD_PRODUCT_SUBCAT_DELETE:
      return {};
    default:
      return state;
  }
};

export const getSubproductCatReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUBCAT_REQUEST:
      return { loading: true, success: false, productSubcategoryDetails: {} };
    case GET_PRODUCT_SUBCAT_SUCCESS:
      return {
        loading: false,
        success: true,
        productSubcategoryDetails: action.payload,
      };
    case GET_PRODUCT_SUBCAT_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_PRODUCT_SUBCAT_DELETE:
      return {};
    default:
      return state;
  }
};

export const editSubproductCatReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_SUBCAT_REQUEST:
      return { loading: true, success: false, result: {} };
    case EDIT_PRODUCT_SUBCAT_SUCCESS:
      return {
        loading: false,
        success: true,
        result: action.payload,
      };
    case EDIT_PRODUCT_SUBCAT_FAIL:
      return { loading: false, error: action.payload, success: false };
    case EDIT_PRODUCT_SUBCAT_DELETE:
      return {};
    default:
      return state;
  }
};
