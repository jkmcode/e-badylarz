import axios from "axios";
import {
  errorHandling,
  addToLS,
  addLogError,
  addLogErrorFromLS
} from "./errorHandling";
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

import {
  TIMEOUT_InsertImage,
  TIMEOUT_getShop,
  TIMEOUT_getSpot,
  TIMEOUT_getShopSpots,
  TIMEOUT_updateShopSpot,
  TIMEOUT_getListOfData,
  TIMEOUT_getFullDescriptions,
  TIMEOUT_addDesc,
  TIMEOUT_getDesc,
  TIMEOUT_getShopContacts,
  TIMEOUT_addContact,
  TIMEOUT_unOrActiveList,
  TIMEOUT_getShops,
  TIMEOUT_addShopSpot,
  TIMEOUT_getAllCities,
  TIMEOUT_addProductType
} from "../constants/timeoutConstans"

// Save image in redax
// w funkcjach InsertImage i InsertImage2 są takie same stałe (ADD_IMAGE_REQUEST itp)
// nie wiem czy to może przeszkadzać i powodować jakieś błędy

export const InsertImage = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const formData = new FormData();
    formData.append("image", insertData.imageUpload);
    formData.append("taxNo", insertData.taxNo);
    formData.append("Id", insertData.Id);
    formData.append("objType", insertData.objType);

    dispatch({ type: ADD_IMAGE_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_InsertImage
    };
    const { data } = await axios.put(`/api/upload-image/`, formData, config);

    dispatch({
      type: ADD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_IMAGE_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Zapisanie zdjęcia wariant 1",
      "function": "InsertImage",
      "param": insertData.objType
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
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

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_SHOP_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getShop
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
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_SHOP_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobór danych dla wybranego sklepu",
      "function": "getShop",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getShopContacts = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_CONTACT_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getShopContacts
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
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_CONTACT_LIST_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie listy kontaktów dla wybranego sklepu",
      "function": "getShopContacts",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getSpot = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_SPOT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getSpot
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
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_SPOT_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobór danych dla wybranego punktu sprzedaży",
      "function": "getSpot",
      "param": insertData.type
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getShopSpots = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_SOPTS_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getShopSpots
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
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_SOPTS_LIST_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobór listy punktów sprzedaży danych dla wybranego sklepu",
      "function": "getShopSpots",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const addContact = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ADD_CONTACT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_addContact
    };
    const { data } = await axios.put(
      `/api/add-shop-contact/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_CONTACT_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Dodanie nowego kontaktu do sklepu",
      "function": "addContact",
      "param": insertData.editing ? "editing" : "add"
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getShops = () => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_SHOPS_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getShops
    };

    const { data } = await axios.get(`/api/get-shops/`, config);

    dispatch({
      type: GET_SHOPS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_SHOPS_LIST_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie listy sklepów",
      "function": "getShops",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
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

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ADD_SHOP_SPOT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_addShopSpot
    };

    const { data } = await axios.put(
      `/api/add-shop-spot/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_SHOP_SPOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_SHOP_SPOT_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Dodanie nowego punktu sprzedaży",
      "function": "addShopSpot",
      "param": insertData.add ? "add" : "update"
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const updateShopSpot = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: EDIT_SHOP_SPOT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_updateShopSpot
    };

    const { data } = await axios.put(`/api/edit-shop-spot/`,
      insertData,
      config
    );

    dispatch({
      type: EDIT_SHOP_SPOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: EDIT_SHOP_SPOT_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Edycja punktu sprzedaży",
      "function": "updateShopSpot",
      "param": insertData.add ? "add" : "updata"
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const addProductType = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: PRODUCT_TYPE_ADD_REQUEST });;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_addProductType
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
    const errorRedux = await errorHandling(error)
    dispatch({
      type: PRODUCT_TYPE_ADD_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Dodanie typu produktu",
      "function": "updateShopSpot",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
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

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_ALL_CITIES_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getAllCities
    };

    const { data } = await axios.get(`/api/get-cites/all/list`, config);

    dispatch({
      type: GET_ALL_CITIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_ALL_CITIES_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie listy miejscowości",
      "function": "getAllCities",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
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

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ACTIVE_DESCRIPTION_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_unOrActiveList
    };

    const { data } = await axios.put(`/api/desc-active/`, insertData, config);

    dispatch({
      type: ACTIVE_DESCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ACTIVE_DESCRIPTION_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Zmiana flagi obiektu z na anktywny <-> nieaktywny",
      "function": "unOrActiveList",
      "param": insertData.objType + " - " + insertData.kind
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getFullDescriptions =
  (insertData) => async (dispatch, getState) => {

    const {
      userLogin: { userInfo },
    } = getState();

    try {
      dispatch({ type: GET_FULL_DESCRIPTION_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        timeout: TIMEOUT_getFullDescriptions
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
      const errorRedux = await errorHandling(error)
      dispatch({
        type: GET_FULL_DESCRIPTION_FAIL,
        payload: errorRedux
      });
      const errorData = {
        ...errorRedux,
        "user": userInfo.id,
        "text": "Pobranie listy opisów wielojęzykowych dla obiektu",
        "function": "getFullDescriptions",
        "param": ""
      }
      if (!errorRedux.log) {
        dispatch(addToLS(errorData))
        dispatch(addLogError(errorData))
      }
    }
  };

export const addDesc = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ADD_DESC_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_addDesc
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
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_DESC_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Dodawanie lub aktualizacja opisu",
      "function": "addDesc",
      "param": insertData.addDesc ? "add" : "updata"
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getDesc = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState()

  try {
    dispatch({ type: DISTRICT_ADD_DESC_REQUEST });
    ;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getDesc
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
    const errorRedux = await errorHandling(error)
    dispatch({
      type: DISTRICT_ADD_DESC_FAIL,
      payload: errorRedux,
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobieranie wybranego opisu",
      "function": "getDesc",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
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

export const getListOfData = (searchData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_LIST_OF_DATA_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getListOfData
    };

    const { data } = await axios.get(
      `/api/${searchData.typeActivity}/${searchData.page}/${searchData.lng}/${searchData.cat}/${searchData.subcat}/get-list-of-data/`,
      config
    );

    dispatch({
      type: GET_LIST_OF_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_LIST_OF_DATA_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie listy produktów",
      "function": "getListOfData",
      "param": searchData.typeActivity
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};
