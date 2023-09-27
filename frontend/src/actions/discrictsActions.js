import axios from "axios";
import {
  errorHandling,
  addToLS,
  addLogError,
  addLogErrorFromLS
} from "./errorHandling";
import {
  DISTRICT_ADD_REQUEST,
  DISTRICT_ADD_SUCCESS,
  DISTRICT_ADD_FAIL,
  DISTRICT_REQUEST,
  DISTRICT_SUCCESS,
  DISTRICT_FAIL,
} from "../constants/adminConstans";

import {
  TIMEOUT_getFullDiscricts
} from "../constants/timeoutConstans"

export const getDiscrict = (inserData) => async (dispatch) => {
  // try {
  //   dispatch({ type: DISTRICT_REQUEST });

  //   const { data } = await axios.get(
  //     `/api/${inserData.lat}/${inserData.lng}/discrict/`
  //   );

  //   dispatch({
  //     type: DISTRICT_SUCCESS,
  //     payload: data,
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: DISTRICT_FAIL,
  //     payload:
  //       error.response && error.response.data.detail
  //         ? error.response.data.detail
  //         : error.message,
  //   });
  //   console.log(error);
  // }
  console.log('ta funkcja nie miała działać')
};

export const getFullDiscricts = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: DISTRICT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getFullDiscricts
    };

    const { data } = await axios.get(
      `/api/${insertData}/full-discricts/`,
      config);

    dispatch({
      type: DISTRICT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: DISTRICT_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie listy powiatów",
      "function": "getFullDiscricts",
      "param": insertData
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
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
