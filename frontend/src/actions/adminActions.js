import axios from "axios";

import {
  DISTRICT_ADD_REQUEST,
  DISTRICT_ADD_SUCCESS,
  DISTRICT_ADD_FAIL,
} from "../constants/adminConstans";

export const addDiscrict = (insertData) => async (dispatch) => {
  try {
    dispatch({ type: DISTRICT_ADD_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/add-district/`, insertData, config);

    console.log(data);

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
