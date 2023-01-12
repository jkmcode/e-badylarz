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
  ADD_AREA_CONTACT_REQUEST,
  ADD_AREA_CONTACT_SUCCESS,
  ADD_AREA_CONTACT_FAIL,
  ADD_AREA_SPOT_REQUEST,
  ADD_AREA_SPOT_SUCCESS,
  ADD_AREA_SPOT_FAIL,
  ADD_AREA_SPOT_DELETE,
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
    case ADD_AREA_SPOT_REQUEST:
      return {
        loading: true,
        successAdd: false,
        success: false,
        shopSpotList: [],
      };
    case ADD_AREA_SPOT_SUCCESS:
      return {
        loading: false,
        successAdd: true,
        success: false,
        shopSpotList: action.payload,
      };
    case ADD_AREA_SPOT_FAIL:
      return {
        loading: false,
        error: action.payload,
        successAdd: false,
        success: false,
      };
    case ADD_AREA_SPOT_DELETE:
      return { shopSpotList: [] };

    default:
      return state;
  }
};

export const areaSpotReducer = (state = { areaSpotList: [] }, action) => {
  switch (action.type) {
    case ADD_AREA_SPOT_REQUEST:
      return {
        loading: true,
        successAdd: false,
        success: false,
        areaSpotList: [],
      };
    case ADD_AREA_SPOT_SUCCESS:
      return {
        loading: false,
        successAdd: true,
        success: false,
        areaSpotList: action.payload,
      };
    case ADD_AREA_SPOT_FAIL:
      return {
        loading: false,
        error: action.payload,
        successAdd: false,
        success: false,
      };
    case ADD_AREA_SPOT_DELETE:
      return { areaSpotList: [] };

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
    case ADD_AREA_CONTACT_REQUEST:
      return { loading: true, success: false, areaListOfContact: [] };
    case ADD_AREA_CONTACT_SUCCESS:
      return {
        loading: false,
        success: true,
        areaListOfContact: action.payload,
      };
    case ADD_AREA_CONTACT_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
