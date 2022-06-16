import {
  DISTRICT_REQUEST,
  DISTRICT_SUCCESS,
  DISTRICT_FAIL,
  DISTRICT_DELETE,
} from "../../constants/adminConstans";

export const districtReducer = (state = { districtList: [] }, action) => {
  switch (action.type) {
    case DISTRICT_REQUEST:
      return { loading: true, districtList: [] };
    case DISTRICT_SUCCESS:
      return { loading: false, districtList: action.payload };
    case DISTRICT_FAIL:
      return { loading: false, error: action.payload, districtList: [] };
    case DISTRICT_DELETE:
      return { districtList: [] };
    default:
      return state;
  }
};
