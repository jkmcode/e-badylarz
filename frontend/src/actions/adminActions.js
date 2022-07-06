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
} from "../constants/adminConstans";

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
      console.log("dane--> metoda post");
      var { data } = await axios.post(`/api/add-desc/`, insertData, config);
    } else {
      console.log("dane--> metoda put");
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
