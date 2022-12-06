import axios from "axios";
import {
  DISTRICT_ADD_REQUEST,
  DISTRICT_ADD_SUCCESS,
  DISTRICT_ADD_FAIL,
  DISTRICT_REQUEST,
  DISTRICT_SUCCESS,
  DISTRICT_FAIL,
} from "../constants/adminConstans";

export const getDiscrict = (inserData) => async (dispatch) => {

  console.log("inserData", inserData);
  try {
    dispatch({ type: DISTRICT_REQUEST });

    const { data } = await axios.get(
      `/api/${inserData.lat}/${inserData.lng}/discrict/`
    );

    dispatch({
      type: DISTRICT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISTRICT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    console.log(error);
  }
};

export const getFullDiscricts = (insertData) => async (dispatch) => {

  try {
    dispatch({ type: DISTRICT_REQUEST });

    const { data } = await axios.get(
      `/api/${insertData}/full-discricts/`
    );

    dispatch({
      type: DISTRICT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISTRICT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    console.log(error);
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
