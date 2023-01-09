import axios from "axios";

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
} from "../constants/areaConstans";

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

    console.log("data--->", data);

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

export const getAreaToEdit = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_AREA_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/get-area/${id}`, config);

    //console.log("data--->", data)

    dispatch({
      type: GET_AREA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AREA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    console.log(error);
  }
};

export const addArea = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_AREA_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/add-area/`, insertData, config);

    console.log("data--->", data);

    dispatch({
      type: ADD_AREA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_AREA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAreaContacts = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_AREA_CONTACT_LIST_REQUEST });

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
      `/api/${insertData.Id}/get-area-contacts/`,
      config
    );

    dispatch({
      type: GET_AREA_CONTACT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AREA_CONTACT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
