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
  GET_ALL_CITIES_REQUEST,
  GET_ALL_CITIES_SUCCESS,
  GET_ALL_CITIES_FAIL,
  GET_ALL_CITIES_DELETE,
  SET_FLAG_CITY_TRUE,
  SET_FLAG_CITY_FALSE,
  SET_FLAG_SHOP_TRUE,
  SET_FLAG_SHOP_FALSE,
  SET_CITY_FLAG_DESC_TRUE,
  SET_CITY_FLAG_DESC_FALSE,
  SET_WINDOW_FLAG_FALSE,
  SET_WINDOW_FLAG_TRUE,
  SET_WINDOW_FLAG_DELETE,
  PRODUCT_TYPE_ADD_REQUEST,
  PRODUCT_TYPE_ADD_SUCCESS,
  PRODUCT_TYPE_ADD_FAIL,
  PRODUCT_TYPE_ADD_DELETE,
  ADD_SHOP_REQUEST,
  ADD_SHOP_SUCCESS,
  ADD_SHOP_DELETE_SUCCESS,
  ADD_SHOP_FAIL,
  ADD_SHOP_DELETE,
  GET_SHOPS_LIST_REQUEST,
  GET_SHOPS_LIST_SUCCESS,
  GET_SHOPS_LIST_FAIL,
  GET_SHOPS_LIST_DELETE,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  ADD_CONTACT_DELETE,
  GET_CONTACT_LIST_REQUEST,
  GET_CONTACT_LIST_SUCCESS,
  GET_CONTACT_LIST_FAIL,
  GET_CONTACT_LIST_DELETE,
  GET_SHOP_REQUEST,
  GET_SHOP_SUCCESS,
  GET_SHOP_FAIL,
  GET_SHOP_DELETE,
  EDIT_SHOP_REQUEST,
  EDIT_SHOP_SUCCESS,
  EDIT_SHOP_FAIL,
  EDIT_SHOP_DELETE,
  GET_AREA_LIST_REQUEST,
  GET_AREA_LIST_SUCCESS,
  GET_AREA_LIST_FAIL,
  GET_AREA_LIST_DELETE,
  SAVE_IMAGE_REDUX,
  DELETE_IMAGE_REDUX,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_FAIL,
  SET_FLAG_IMAGE_TRUE,
  SET_FLAG_IMAGE_FALSE,
  ADD_SHOP_SPOT_REQUEST,
  ADD_SHOP_SPOT_SUCCESS,
  ADD_SHOP_SPOT_FAIL,
  ADD_SHOP_SPOT_DELETE,
  GET_SOPTS_LIST_REQUEST,
  GET_SOPTS_LIST_SUCCESS,
  GET_SOPTS_LIST_FAIL,
  GET_SOPTS_LIST_DELETE,
  GET_SPOT_REQUEST,
  GET_SPOT_SUCCESS,
  GET_SPOT_FAIL,
  GET_SPOT_DELETE,
  EDIT_SHOP_SPOT_REQUEST,
  EDIT_SHOP_SPOT_SUCCESS,
  EDIT_SHOP_SPOT_FAIL,
  EDIT_SHOP_SPOT_DELETE,
  SET_FLAG_ADD_TRUE,
  SET_FLAG_ADD_FALSE,
} from "../constants/adminConstans";

// Inser image

export const insertImageReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_IMAGE_REQUEST:
      return { loadingInsertImage: true, successInsertImage: false };
    case ADD_IMAGE_SUCCESS:
      return {
        loadingInsertImage: false,
        successInsertImage: true,
      };
    case ADD_IMAGE_FAIL:
      return {
        loadingInsertImage: false,
        successInsertImage: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Save image to Redux

export const saveImageReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_IMAGE_REDUX:
      return {
        isImage: true,
        imageUpload: action.payload,
      };
    case DELETE_IMAGE_REDUX:
      return { isImage: false, imageUpload: {} };
    default:
      return state;
  }
};

//Shops
export const updateShopReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_SHOP_REQUEST:
      return { loading: true, success: false };
    case EDIT_SHOP_SUCCESS:
      return {
        loading: false,
        success: true,
        shopUpdateDetails: action.payload,
      };
    case EDIT_SHOP_FAIL:
      return { loading: false, error: action.payload, success: false };
    case EDIT_SHOP_DELETE:
      return {};
    default:
      return state;
  }
};

export const getShopReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHOP_REQUEST:
      return { loading: true, success: false, shopDetails: {} };
    case GET_SHOP_SUCCESS:
      return { loading: false, success: true, shopDetails: action.payload };
    case GET_SHOP_FAIL:
      return { loading: false, error: action.payload, success: false };
    case GET_SHOP_DELETE:
      return {};
    default:
      return state;
  }
};

export const getSpotReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SPOT_REQUEST:
      return { loading: true, success: false, spotDetails: {} };
    case GET_SPOT_SUCCESS:
      return { loading: false, success: true, spotDetails: action.payload };
    case GET_SPOT_FAIL:
      return { loading: false, error: action.payload, success: false };
    case GET_SPOT_DELETE:
      return {};
    default:
      return state;
  }
};

export const contactListReducer = (state = { ListOfContact: [] }, action) => {
  switch (action.type) {
    case GET_CONTACT_LIST_REQUEST:
      return { loading: true, success: false, ListOfContact: [] };
    case GET_CONTACT_LIST_SUCCESS:
      return { loading: false, success: true, ListOfContact: action.payload };
    case GET_CONTACT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        ListOfContact: [],
      };
    case GET_CONTACT_LIST_DELETE:
      return { ListOfContact: [] };
    case ADD_CONTACT_REQUEST:
      return { loading: true, success: false, ListOfContact: [] };
    case ADD_CONTACT_SUCCESS:
      return { loading: false, success: true, ListOfContact: action.payload };
    case ADD_CONTACT_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const shopSpotUpdateListReducer = (
  state = { shopSpotList: [] },
  action
) => {
  switch (action.type) {
    case EDIT_SHOP_SPOT_REQUEST:
      return { loading: true, success: false, shopSpotList: [] };
    case EDIT_SHOP_SPOT_SUCCESS:
      return { loading: false, success: true, shopSpotList: action.payload };
    case EDIT_SHOP_SPOT_DELETE:
      return { shopSpotList: [] };
    case EDIT_SHOP_SPOT_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const shopSpotListReducer = (state = { shopSpotList: [] }, action) => {
  switch (action.type) {
    case GET_SHOPS_LIST_REQUEST:
      return {
        loading: true,
        success: false,
        successAdd: false,
        shopSpotList: [],
      };
    case GET_SOPTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        successAdd: false,
        shopSpotList: action.payload,
      };
    case GET_SOPTS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        successAdd: false,
        shopSpotList: [],
      };
    case GET_SOPTS_LIST_DELETE:
      return { shopSpotList: [] };

    case ADD_SHOP_SPOT_REQUEST:
      return {
        loading: true,
        successAdd: false,
        success: false,
        shopSpotList: [],
      };
    case ADD_SHOP_SPOT_SUCCESS:
      return {
        loading: false,
        successAdd: true,
        success: false,
        shopSpotList: action.payload,
      };
    case ADD_SHOP_SPOT_DELETE:
      return { shopSpotList: [] };
    case ADD_SHOP_SPOT_FAIL:
      return {
        loading: false,
        error: action.payload,
        successAdd: false,
        success: false,
      };
    default:
      return state;
  }
};

export const shopListReducer = (state = { shopList: [] }, action) => {
  switch (action.type) {
    case GET_SHOPS_LIST_REQUEST:
      return { loading: true, success: false, shopList: [] };
    case GET_SHOPS_LIST_SUCCESS:
      return { loading: false, success: true, shopList: action.payload };
    case GET_SHOPS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        shopList: [],
      };
    case GET_SHOPS_LIST_DELETE:
      return { shopList: [] };

    case ADD_SHOP_REQUEST:
      return { loading: true, successAdd: false, shopList: [] };
    case ADD_SHOP_SUCCESS:
      return { loading: false, successAdd: true, shopList: action.payload };
    case ADD_SHOP_DELETE_SUCCESS:
      return { loading: false, successAdd: false, shopList: action.payload };
    case ADD_SHOP_FAIL:
      return { loading: false, error: action.payload, successAdd: false };

    default:
      return state;
  }
};

//Product

export const addProductTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_TYPE_ADD_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_TYPE_ADD_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case PRODUCT_TYPE_ADD_FAIL:
      return { loading: false, error: action.payload, success: false };
    case PRODUCT_TYPE_ADD_DELETE:
      return {};
    default:
      return state;
  }
};

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
    case SET_FLAG_SHOP_TRUE:
      return { shopFlag: true };
    case SET_FLAG_SHOP_FALSE:
      return { shopFlag: false };
    case SET_FLAG_IMAGE_TRUE:
      return { shopImageFlag: true };
    case SET_FLAG_IMAGE_FALSE:
      return { shopImageFlag: false };
    case SET_CITY_FLAG_DESC_TRUE:
      return { cityDescFlag: true, cityFlag: true };
    case SET_CITY_FLAG_DESC_FALSE:
      return { cityDescFlag: false, cityFlag: true };
    case SET_FLAG_ADD_TRUE:
      return { addFlag: true };
    case SET_FLAG_ADD_FALSE:
      return { addFlag: false };
    default:
      return state;
  }
};

export const citesListReducer = (state = { cityList: [] }, action) => {
  switch (action.type) {
    case GET_CITES_LIST_REQUEST:
      return { loading: true, success: false, cityList: [] };
    case GET_CITES_LIST_SUCCESS:
      return { loading: false, success: true, cityList: action.payload };
    case GET_CITES_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        districtList: [],
      };
    case GET_CITES_LIST_DELETE:
      return { cityList: [] };
    default:
      return state;
  }
};

export const citesListAllReducer = (state = { cityListAll: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CITIES_REQUEST:
      return { loading: true, success: false, cityListAll: [] };
    case GET_ALL_CITIES_SUCCESS:
      return { loading: false, success: true, cityListAll: action.payload };
    case GET_ALL_CITIES_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
        districtList: [],
      };
    case GET_ALL_CITIES_DELETE:
      return { cityListAll: [] };
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
      return {
        loading: false,
        success: true,
        result: action.payload,
      };
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
