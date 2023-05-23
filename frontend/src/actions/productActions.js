import axios from "axios";
import { errorHandling } from "./errorHandling";
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
  GET_PRODUCT_SUBCAT_REQUEST,
  GET_PRODUCT_SUBCAT_SUCCESS,
  GET_PRODUCT_SUBCAT_FAIL,
  EDIT_PRODUCT_SUBCAT_REQUEST,
  EDIT_PRODUCT_SUBCAT_SUCCESS,
  EDIT_PRODUCT_SUBCAT_FAIL,
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  SEARCH_SELECTED_LNG,
  SEARCH_SELECTED_CATEGORY,
  SEARCH_SELECTED_SUBCATEGORY,
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
      payload: errorHandling(error)
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
      payload: errorHandling(error)
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
      payload: errorHandling(error)
    });
  }
};

export const getSubproductCat =
  (categoryId) =>
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
          `/api/${categoryId}/get-product-subcategories/`,
          config
        );

        dispatch({
          type: GET_PRODUCT_SUBCAT_LIST_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: GET_PRODUCT_SUBCAT_LIST_FAIL,
          payload: errorHandling(error)
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
      payload: errorHandling(error)
    });
  }
};

export const getSubcategory = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRODUCT_SUBCAT_REQUEST });
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
      `/api/${insertData.Id}/${insertData.typeActivity}/get-subcategory`,
      config,
      insertData
    );

    dispatch({
      type: GET_PRODUCT_SUBCAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_SUBCAT_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const updateSubcategory = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PRODUCT_SUBCAT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/edit-product-subcategory/`,
      insertData,
      config
    );

    dispatch({
      type: EDIT_PRODUCT_SUBCAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_SUBCAT_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const getProductList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/get-product/`, config);

    dispatch({
      type: GET_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_LIST_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const selectedCat = (item) => async (dispatch) => {
  try {
    if (item.kind === "lang") {
      dispatch({
        type: SEARCH_SELECTED_LNG,
        payload: item,
      });
    }
    if (item.kind === "Category") {
      dispatch({
        type: SEARCH_SELECTED_CATEGORY,
        payload: item,
      });
    }
    if (item.kind === "Subcategory") {
      dispatch({
        type: SEARCH_SELECTED_SUBCATEGORY,
        payload: item,
      });
    }

  } catch (error) { console.log(error) }
};
