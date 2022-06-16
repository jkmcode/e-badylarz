import axios from "axios";
import {
  DISTRICT_REQUEST,
  DISTRICT_SUCCESS,
  DISTRICT_FAIL,
} from "../constants/adminConstans";

export const getDiscrict = () => async (dispatch) => {
  try {
    dispatch({ type: DISTRICT_REQUEST });

    const { data } = await axios.get(`/api/discrict/`);

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
