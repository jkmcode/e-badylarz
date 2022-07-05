import {
  DISTRICT_ADD_REQUEST,
  DISTRICT_ADD_SUCCESS,
  DISTRICT_ADD_FAIL,
  DISTRICT_ADD_DELETE,
  DISTRICT_ADD_DESC_REQUEST,
  DISTRICT_ADD_DESC_SUCCESS,
  DISTRICT_ADD_DESC_FAIL,
  DISTRICT_ADD_DESC_DELETE,
  ADD_DESC_REQUEST,
  ADD_DESC_SUCCESS,
  ADD_DESC_FAIL,
  ADD_DESC_DELETE,
} from "../constants/adminConstans";

export const addDescReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DESC_REQUEST:
      return { loading: true, success: false };
    case ADD_DESC_SUCCESS:
      return { loading: false, success: true, desc: action.payload };
    case ADD_DESC_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ADD_DESC_DELETE:
      return {};
    default:
      return state;
  }
};

export const addDistrictDescReducer = (state = {}, action) => {
  switch (action.type) {
    case DISTRICT_ADD_DESC_REQUEST:
      return { loading: true, success: false };
    case DISTRICT_ADD_DESC_SUCCESS:
      return { loading: false, success: true, desc: action.payload };
    case DISTRICT_ADD_DESC_FAIL:
      return { loading: false, error: action.payload, success: false };
    case DISTRICT_ADD_DESC_DELETE:
      return {};
    default:
      return state;
  }
};

export const addDistrictReducer = (state = {}, action) => {
  switch (action.type) {
    case DISTRICT_ADD_REQUEST:
      return { loading: true, success: false };
    case DISTRICT_ADD_SUCCESS:
      return { loading: false, success: true };
    case DISTRICT_ADD_FAIL:
      return { loading: false, error: action.payload, success: false };
    case DISTRICT_ADD_DELETE:
      return {};
    default:
      return state;
  }
};
