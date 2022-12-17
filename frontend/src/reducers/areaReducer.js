import {
  ADD_AREA_REQUEST,
  ADD_AREA_SUCCESS,
  ADD_AREA_FAIL,
  ADD_AREA_DELETE
} from "../constants/areaConstans";

export const areaActivityReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_AREA_REQUEST:
      return { loading: true, success: false };
    case ADD_AREA_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case ADD_AREA_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ADD_AREA_DELETE:
      return {};
    default:
      return state;
  }
};
