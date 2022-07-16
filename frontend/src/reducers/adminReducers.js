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
  SET_FLAG_DESC_FALSE,
  SET_FLAG_DESC_TRUE,
  SET_FLAG_ADD_DESC_FALSE,
  SET_FLAG_ADD_DESC_TRUE,
  GET_FULL_DESCRIPTION_REQUEST,
  GET_FULL_DESCRIPTION_SUCCESS,
  GET_FULL_DESCRIPTION_FAIL,
  GET_FULL_DESCRIPTION_DELETE,
  ACTIVE_DESCRIPTION_REQUEST,
  ACTIVE_DESCRIPTION_SUCCESS,
  ACTIVE_DESCRIPTION_FAIL,
  ACTIVE_DESCRIPTION_DELETE,
  SET_FLAG_INFO_FALSE,
  SET_FLAG_INFO_TRUE,
  CITI_ADD_REQUEST,
  CITI_ADD_SUCCESS,
  CITI_ADD_FAIL,
  CITI_ADD_DELETE,
  GET_CITES_LIST_REQUEST,
  GET_CITES_LIST_SUCCESS,
  GET_CITES_LIST_FAIL,
  GET_CITES_LIST_DELETE,
  SET_FLAG_CITY_TRUE,
  SET_FLAG_CITY_FALSE,
  SET_WINDOW_FLAG_FALSE,
  SET_WINDOW_FLAG_TRUE,
  SET_WINDOW_FLAG_DELETE,
} from "../constants/adminConstans";

export const flagWindowReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_WINDOW_FLAG_FALSE:
      return { windowFlag: false };
    case SET_WINDOW_FLAG_TRUE:
      return { windowFlag: true };
    case SET_WINDOW_FLAG_DELETE:
      return {};
    default:
      return state;
  }
};

export const flagReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_FLAG_INFO_FALSE:
      return { infoFlag: false, cityFlag: true };
    case SET_FLAG_INFO_TRUE:
      return { infoFlag: true, cityFlag: true };
    case SET_FLAG_DESC_FALSE:
      return { descFlag: false };
    case SET_FLAG_DESC_TRUE:
      return { descFlag: true };
    case SET_FLAG_ADD_DESC_FALSE:
      return { addDescFlag: false };
    case SET_FLAG_ADD_DESC_TRUE:
      return { addDescFlag: true };
    case SET_FLAG_CITY_FALSE:
      return { cityFlag: false };
    case SET_FLAG_CITY_TRUE:
      return { cityFlag: true };
    default:
      return state;
  }
};

export const citesListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CITES_LIST_REQUEST:
      return { loading: true, success: false };
    case GET_CITES_LIST_SUCCESS:
      return { loading: false, success: true, citiesList: action.payload };
    case GET_CITES_LIST_FAIL:
      return { loading: false, error: action.payload, success: false };
    case GET_CITES_LIST_DELETE:
      return {};
    default:
      return state;
  }
};

export const addCitiReducer = (state = {}, action) => {
  switch (action.type) {
    case CITI_ADD_REQUEST:
      return { loading: true, success: false };
    case CITI_ADD_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case CITI_ADD_FAIL:
      return { loading: false, error: action.payload, success: false };
    case CITI_ADD_DELETE:
      return {};
    default:
      return state;
  }
};

export const unOrActiveDescriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVE_DESCRIPTION_REQUEST:
      return { loading: true, success: false };
    case ACTIVE_DESCRIPTION_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case ACTIVE_DESCRIPTION_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ACTIVE_DESCRIPTION_DELETE:
      return {};
    default:
      return state;
  }
};

export const getFullDescriptionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FULL_DESCRIPTION_REQUEST:
      return { loading: true, success: false };
    case GET_FULL_DESCRIPTION_SUCCESS:
      return { loading: false, success: true, desc: action.payload };
    case GET_FULL_DESCRIPTION_FAIL:
      return { loading: false, error: action.payload, success: false };
    case GET_FULL_DESCRIPTION_DELETE:
      return {};
    default:
      return state;
  }
};

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
      return { loading: false, success: true, district: action.payload };
    case DISTRICT_ADD_FAIL:
      return { loading: false, error: action.payload, success: false };
    case DISTRICT_ADD_DELETE:
      return {};
    default:
      return state;
  }
};
