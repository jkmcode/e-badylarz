import axios from "axios";
import {
  ADD_PRODUCT_CAT_REQUEST,
  ADD_PRODUCT_CAT_SUCCESS,
  ADD_PRODUCT_CAT_FAIL,
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
