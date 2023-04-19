import axios from "axios";

import {
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
  GET_ALL_CITIES_REQUEST,
  GET_ALL_CITIES_SUCCESS,
  GET_ALL_CITIES_FAIL,
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
  SAVE_IMAGE_REDUX,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_FAIL,
  ADD_SHOP_SPOT_REQUEST,
  ADD_SHOP_SPOT_SUCCESS,
  ADD_SHOP_SPOT_FAIL,
  GET_SOPTS_LIST_REQUEST,
  GET_SOPTS_LIST_SUCCESS,
  GET_SOPTS_LIST_FAIL,
  GET_SPOT_REQUEST,
  GET_SPOT_SUCCESS,
  GET_SPOT_FAIL,
  EDIT_SHOP_SPOT_REQUEST,
  EDIT_SHOP_SPOT_SUCCESS,
  EDIT_SHOP_SPOT_FAIL,
  GET_SINGLE_INSTANCE_REQUEST,
  GET_SINGLE_INSTANCE_CAT_SUCCESS,
  GET_SINGLE_INSTANCE_CAT_FAIL,
  GET_LIST_OF_DATA_REQUEST,
  GET_LIST_OF_DATA_SUCCESS,
  GET_LIST_OF_DATA_FAIL,
  ADD_SINGLE_INSTANCE_REQUEST,
  ADD_SINGLE_INSTANCE_SUCCESS,
  ADD_SINGLE_INSTANCE_FAIL,
  UPDATE_SINGLE_INSTANCE_REQUEST,
  UPDATE_SINGLE_INSTANCE_SUCCESS,
  UPDATE_SINGLE_INSTANCE_FAIL,

} from "../constants/adminConstans";

// Save image in redax

export const InsertImage = (insertData) => async (dispatch, getState) => {
  try {
    const formData = new FormData();
    formData.append("image", insertData.imageUpload);
    formData.append("taxNo", insertData.taxNo);
    formData.append("Id", insertData.Id);
    formData.append("objType", insertData.objType);

    dispatch({ type: ADD_IMAGE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/upload-image/`, formData, config);

    dispatch({
      type: ADD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_IMAGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const InsertImage2 = (insertData) => async (dispatch, getState) => {
  try {
    const formData = new FormData();
    formData.append("image", insertData.imageUpload);
    formData.append("uniqueId", insertData.uniqueId);
    formData.append("type", insertData.type);

    dispatch({ type: ADD_IMAGE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/upload-image2/`, formData, config);

    dispatch({
      type: ADD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_IMAGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//////

export const saveImage = (imageToSave) => (dispatch) => {
  dispatch({
    type: SAVE_IMAGE_REDUX,
    payload: imageToSave,
  });
};

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

export const getShopContacts = (insertData) => async (dispatch, getState) => {
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

    const { data } = await axios.get(
      `/api/${insertData.Id}/get-contacts/`,
      config
    );

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
  }
};

export const getSpot = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SPOT_REQUEST });
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
      `/api/${insertData.Id}/${insertData.type}/get-spot`,
      config,
      insertData
    );

    dispatch({
      type: GET_SPOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SPOT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getShopSpots = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SOPTS_LIST_REQUEST });

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
      `/api/${insertData.Id}/get-spots/`,
      config
    );

    dispatch({
      type: GET_SOPTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SOPTS_LIST_FAIL,
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

export const addShopSpot = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_SHOP_SPOT_REQUEST });

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
      `/api/add-shop-spot/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_SHOP_SPOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_SHOP_SPOT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateShopSpot = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_SHOP_SPOT_REQUEST });

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
      `/api/edit-shop-spot/`,
      insertData,
      config
    );

    console.log(data);

    dispatch({
      type: EDIT_SHOP_SPOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SHOP_SPOT_FAIL,
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
      `/api/get-cites/${insertData.Id}/${insertData.param}/list`,
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

export const getAllCities = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_CITIES_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/get-cites/all/list`, config);

    dispatch({
      type: GET_ALL_CITIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CITIES_FAIL,
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



export const addSingleInstance = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_SINGLE_INSTANCE_REQUEST });
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
      `/api/add-single-instance/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_SINGLE_INSTANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_SINGLE_INSTANCE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSingleInstance = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_SINGLE_INSTANCE_REQUEST });
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
      `/api/update-single-instance/`,
      insertData,
      config
    );

    dispatch({
      type: UPDATE_SINGLE_INSTANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_INSTANCE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSingleInstance = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SINGLE_INSTANCE_REQUEST });
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
      `/api/${insertData.Id}/${insertData.typeActivity}/get-single-instance`,
      config,
      insertData
    );

    dispatch({
      type: GET_SINGLE_INSTANCE_CAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_INSTANCE_CAT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getListOfData = (typeActivity) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_LIST_OF_DATA_REQUEST });

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
      `/api/${typeActivity}/get-list-of-data/`,
      config
    );

    dispatch({
      type: GET_LIST_OF_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_OF_DATA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
