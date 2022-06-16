import axios from "axios";
import {
  TEST_REQUEST,
  TEST_SUCCESS,
  TEST_FAIL,
} from "../constants/testConstans";

export const testList = () => async (dispatch) => {
  try {
    console.log("działa testList");
    dispatch({
      type: TEST_REQUEST,
    });
    dispatch({
      type: TEST_SUCCESS,
    });
  } catch (error) {}
};
