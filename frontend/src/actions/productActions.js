import axios from "axios";
import {
  SORT_BY_LNG_REQUEST,
  SORT_BY_LNG_SUCCESS,
  SORT_BY_LNG_FAIL,
  ADD_PRODUCT_CAT_REQUEST,
  ADD_PRODUCT_CAT_SUCCESS,
  ADD_PRODUCT_CAT_FAIL,
  ADD_PRODUCT_SUBCAT_REQUEST,
  ADD_PRODUCT_SUBCAT_SUCCESS,
  ADD_PRODUCT_SUBCAT_FAIL,
  GET_PRODUCT_CAT_LIST_REQUEST,
  GET_PRODUCT_CAT_LIST_SUCCESS,
  GET_PRODUCT_CAT_LIST_FAIL,
  GET_PRODUCT_SUBCAT_LIST_REQUEST,
  GET_PRODUCT_SUBCAT_LIST_SUCCESS,
  GET_PRODUCT_SUBCAT_LIST_FAIL,
} from "../constants/productConstans";

export const addProductCat = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PRODUCT_CAT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/add-product-cat/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_PRODUCT_CAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_CAT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sortByLng = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SORT_BY_LNG_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/sort-by-lng/`, insertData, config);

    dispatch({
      type: SORT_BY_LNG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SORT_BY_LNG_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getProductCat = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRODUCT_CAT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/get-product-categories/`, config);

    dispatch({
      type: GET_PRODUCT_CAT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_CAT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    console.log(error);
  }
};

export const getSubproductCat =
  ({ subcategoryId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_PRODUCT_SUBCAT_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/${subcategoryId}/get-product-subcategories/`,
        config
      );

      dispatch({
        type: GET_PRODUCT_SUBCAT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_SUBCAT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
      console.log(error);
    }
  };

export const addProductSubcat = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PRODUCT_SUBCAT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/add-product-subcat/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_PRODUCT_SUBCAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_SUBCAT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
