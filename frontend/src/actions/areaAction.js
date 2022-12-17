import axios from "axios";

import {
  ADD_AREA_REQUEST,
  ADD_AREA_SUCCESS,
  ADD_AREA_FAIL
} from "../constants/areaConstans";

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

    console.log('data--->', data)

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
