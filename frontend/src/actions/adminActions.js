import axios from "axios";

import {
  DISTRICT_ADD_REQUEST,
  DISTRICT_ADD_SUCCESS,
  DISTRICT_ADD_FAIL,
  DISTRICT_ADD_DESC_REQUEST,
  DISTRICT_ADD_DESC_SUCCESS,
  DISTRICT_ADD_DESC_FAIL,
  ADD_DESC_REQUEST,
  ADD_DESC_SUCCESS,
  ADD_DESC_FAIL,
  GET_FULL_DESCRIPTION_REQUEST,
  GET_FULL_DESCRIPTION_SUCCESS,
  GET_FULL_DESCRIPTION_FAIL,
  ACTIVE_DESCRIPTION_REQUEST,
  ACTIVE_DESCRIPTION_SUCCESS,
  ACTIVE_DESCRIPTION_FAIL,
  CITI_ADD_REQUEST,
  CITI_ADD_SUCCESS,
  CITI_ADD_FAIL,
  GET_CITES_LIST_REQUEST,
  GET_CITES_LIST_SUCCESS,
  GET_CITES_LIST_FAIL,
  PRODUCT_TYPE_ADD_REQUEST,
  PRODUCT_TYPE_ADD_SUCCESS,
  PRODUCT_TYPE_ADD_FAIL,
  ADD_SHOP_REQUEST,
  ADD_SHOP_SUCCESS,
  ADD_SHOP_FAIL,
  GET_SHOPS_LIST_REQUEST,
  GET_SHOPS_LIST_SUCCESS,
  GET_SHOPS_LIST_FAIL,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  GET_CONTACT_LIST_REQUEST,
  GET_CONTACT_LIST_SUCCESS,
  GET_CONTACT_LIST_FAIL,
  GET_SHOP_REQUEST,
  GET_SHOP_SUCCESS,
  GET_SHOP_FAIL,
  EDIT_SHOP_REQUEST,
  EDIT_SHOP_SUCCESS,
  EDIT_SHOP_FAIL,
  GET_AREA_LIST_REQUEST,
  GET_AREA_LIST_SUCCESS,
  GET_AREA_LIST_FAIL,
} from "../constants/adminConstans";

// Areas

export const getAreas = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_AREA_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/get-areas/`, config);

    console.log("data", data);

    dispatch({
      type: GET_AREA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AREA_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    console.log(error);
  }
};

// Shops
export const updateShop = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_SHOP_REQUEST,
    });

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
      `/api/shop/${insertData.id}/update/`,
      insertData,
      config
    );

    dispatch({
      type: EDIT_SHOP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SHOP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getShop = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SHOP_REQUEST });
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
      `/api/${insertData.Id}/get-shop`,
      config,
      insertData
    );

    console.log("data", data);

    dispatch({
      type: GET_SHOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SHOP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getShopContacts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CONTACT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/get-contacts/`, config);

    console.log("data", data);

    dispatch({
      type: GET_CONTACT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONTACT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    console.log(error);
  }
};

export const addContact = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_CONTACT_REQUEST });

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
      `/api/add-shop-contact/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CONTACT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getShops = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SHOPS_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/get-shops/`, config);

    dispatch({
      type: GET_SHOPS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SHOPS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    console.log(error);
  }
};

export const addShop = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_SHOP_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/add-shop/`, insertData, config);

    dispatch({
      type: ADD_SHOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_SHOP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addProductType = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_TYPE_ADD_REQUEST });

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
      `/api/add-product-type/`,
      insertData,
      config
    );

    dispatch({
      type: PRODUCT_TYPE_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TYPE_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCitiesList = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CITES_LIST_REQUEST });
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
      `/api/get-cites/${insertData.Id}/list`,
      config,
      insertData
    );

    dispatch({
      type: GET_CITES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CITES_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addCiti = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CITI_ADD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/add-citi/`, insertData, config);

    dispatch({
      type: CITI_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CITI_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const unOrActiveList = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTIVE_DESCRIPTION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/desc-active/`, insertData, config);

    dispatch({
      type: ACTIVE_DESCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTIVE_DESCRIPTION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getFullDescriptions =
  (insertData) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_FULL_DESCRIPTION_REQUEST });
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
        `/api/get-desc/full/${insertData.Id}/${insertData.type}`,
        config,
        insertData
      );

      dispatch({
        type: GET_FULL_DESCRIPTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_FULL_DESCRIPTION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const addDesc = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_DESC_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    if (insertData.addDesc) {
      var { data } = await axios.post(`/api/add-desc/`, insertData, config);
    } else {
      var { data } = await axios.put(`/api/add-desc/`, insertData, config);
    }

    dispatch({
      type: ADD_DESC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_DESC_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getDesc = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISTRICT_ADD_DESC_REQUEST });
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
      `/api/get-district-desc/${insertData.Id}/${insertData.lng}/${insertData.type}`,
      config,
      insertData
    );

    dispatch({
      type: DISTRICT_ADD_DESC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISTRICT_ADD_DESC_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addDiscrict = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISTRICT_ADD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/add-district/`, insertData, config);

    dispatch({
      type: DISTRICT_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISTRICT_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
