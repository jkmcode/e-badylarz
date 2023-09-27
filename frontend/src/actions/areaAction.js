import axios from "axios";

import {
  errorHandling,
  addToLS,
  addLogError,
  addLogErrorFromLS
} from "./errorHandling";

import {
  ADD_AREA_REQUEST,
  ADD_AREA_SUCCESS,
  ADD_AREA_FAIL,
  GET_AREA_LIST_REQUEST,
  GET_AREA_LIST_SUCCESS,
  GET_AREA_LIST_FAIL,
  GET_AREA_REQUEST,
  GET_AREA_SUCCESS,
  GET_AREA_FAIL,
  EDIT_AREA_REQUEST,
  EDIT_AREA_SUCCESS,
  EDIT_AREA_FAIL,
  GET_AREA_CONTACT_LIST_REQUEST,
  GET_AREA_CONTACT_LIST_SUCCESS,
  GET_AREA_CONTACT_LIST_FAIL,
  ADD_AREA_CONTACT_REQUEST,
  ADD_AREA_CONTACT_SUCCESS,
  ADD_AREA_CONTACT_FAIL,
  ADD_AREA_SPOT_REQUEST,
  ADD_AREA_SPOT_SUCCESS,
  ADD_AREA_SPOT_FAIL,
  GET_AREA_SOPTS_LIST_REQUEST,
  GET_AREA_SOPTS_LIST_SUCCESS,
  GET_AREA_SOPTS_LIST_FAIL,
} from "../constants/areaConstans";

import {
  TIMEOUT_getAreas,
  TIMEOUT_addArea,
  TIMEOUT_getAreaToEdit,
  TIMEOUT_getAreaContacts,
  TIMEOUT_getAreaSpots,
  TIMEOUT_addAreaContact
} from "../constants/timeoutConstans"

// Areas

// to jest niepotrzebne do wykorzystania przy np. area spot
export const editArea = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_AREA_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/edit-area/`, insertData, config);

    dispatch({
      type: EDIT_AREA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_AREA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAreas = () => async (dispatch, getState) => {

  dispatch(addLogErrorFromLS())

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_AREA_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getAreas
    };

    const { data } = await axios.get(`/api/get-areas/`, config);

    dispatch({
      type: GET_AREA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_AREA_LIST_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie listy obszarów",
      "function": "getAreas",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getAreaToEdit = (id) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_AREA_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getAreaToEdit
    };

    const { data } = await axios.get(`/api/get-area/${id}`, config);

    dispatch({
      type: GET_AREA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_AREA_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie obiektu dla konkretnego obszaru sorzedaży",
      "function": "getAreaToEdit",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const addArea = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ADD_AREA_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_addArea
    };

    const { data } = await axios.put(`/api/add-area/`, insertData, config);

    dispatch({
      type: ADD_AREA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_AREA_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Dodanie lub aktualizacja danych punktu sprzedaży",
      "function": "addArea",
      "param": insertData.add ? "add" : "edit"
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getAreaContacts = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_AREA_CONTACT_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getAreaContacts
    };

    const { data } = await axios.get(
      `/api/${insertData.Id}/get-area-contacts/`,
      config
    );

    dispatch({
      type: GET_AREA_CONTACT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_AREA_CONTACT_LIST_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie listy kontaktów dla obszaru sprzedaży",
      "function": "getAreaContacts",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const addAreaContact = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ADD_AREA_CONTACT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_addAreaContact
    };
    const { data } = await axios.post(
      `/api/add-area-contact/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_AREA_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_AREA_CONTACT_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Dodanie lub modyfikacja kontaktu",
      "function": "getAreaContacts",
      "param": insertData.editing ? "edit" : "add"
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const addAreaSpot = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_AREA_SPOT_REQUEST });

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
      `/api/add-area-spot/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_AREA_SPOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_AREA_SPOT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAreaSpots = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_AREA_SOPTS_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getAreaSpots
    };

    const { data } = await axios.get(
      `/api/${insertData.Id}/get-spot-areas/`,
      config
    );

    dispatch({
      type: GET_AREA_SOPTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_AREA_SOPTS_LIST_FAIL,
      payload: errorRedux,
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie listy punktów dla obszaru sprzedaży",
      "function": "getAreaSpots",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};
