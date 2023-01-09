import {
  ADD_AREA_REQUEST,
  ADD_AREA_SUCCESS,
  ADD_AREA_FAIL,
  ADD_AREA_DELETE,
  GET_AREA_LIST_REQUEST,
  GET_AREA_LIST_SUCCESS,
  GET_AREA_LIST_FAIL,
  GET_AREA_LIST_DELETE,
  GET_AREA_REQUEST,
  GET_AREA_SUCCESS,
  GET_AREA_FAIL,
  GET_AREA_DELETE,
  GET_AREA_CONTACT_LIST_REQUEST,
  GET_AREA_CONTACT_LIST_SUCCESS,
  GET_AREA_CONTACT_LIST_FAIL,
  GET_AREA_CONTACT_LIST_DELETE,
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

export const areaReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_AREA_REQUEST:
      return { loading: true, success: false };
    case GET_AREA_SUCCESS:
      return { loading: false, success: true, area: action.payload };
    case GET_AREA_FAIL:
      return { loading: false, error: action.payload, success: false };
    case GET_AREA_DELETE:
      return {};
    default:
      return state;
  }
};

export const areaListReducer = (state = { areaList: [] }, action) => {
  switch (action.type) {
    case GET_AREA_LIST_REQUEST:
      return { loading: true, success: false, areaList: [] };
    case GET_AREA_LIST_SUCCESS:
      return { loading: false, success: true, areaList: action.payload };
    case GET_AREA_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        areaList: [],
      };
    case GET_AREA_LIST_DELETE:
      return { areaList: [] };
    default:
      return state;
  }
};

export const contactAreaListReducer = (
  state = { areaListOfContact: [] },
  action
) => {
  switch (action.type) {
    case GET_AREA_CONTACT_LIST_REQUEST:
      return { loading: true, success: false, areaListOfContact: [] };
    case GET_AREA_CONTACT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        areaListOfContact: action.payload,
      };
    case GET_AREA_CONTACT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        areaListOfContact: [],
      };
    case GET_AREA_CONTACT_LIST_DELETE:
      return { areaListOfContact: [] };
    default:
      return state;
  }
};
