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
} from "../constants/adminConstans";

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


export const unOrActiveDescription = (insertData) => async (dispatch, getState) => {
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


export const getFullDescriptions = (insertData) => async (dispatch, getState) => {
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
      type:   GET_FULL_DESCRIPTION_FAIL,
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
