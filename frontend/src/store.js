import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { testListReducer } from "./reducers/testReducer";
import { districtReducer } from "./reducers/FormAdressScreen/discrictsReducer";
import {
  addDistrictReducer,
  addDistrictDescReducer,
  addDescReducer,
  flagReducer,
  getFullDescriptionsReducer,
  unOrActiveDescriptionReducer,
  addCitiReducer,
  citesListReducer,
  flagWindowReducer,
} from "./reducers/adminReducers";
import { userLoginReducers } from "./reducers/userReducers";

const reducer = combineReducers({
  testListReducer: testListReducer,
  districts: districtReducer,
  addDistrict: addDistrictReducer,
  userLogin: userLoginReducers,
  addDistrictDesc: addDistrictDescReducer,
  addDesc: addDescReducer,
  flag: flagReducer,
  windowFlag: flagWindowReducer,
  fullDescriptions: getFullDescriptionsReducer,
  unOrActiveDescription: unOrActiveDescriptionReducer,
  addCity:addCitiReducer,
  citesList:citesListReducer,
});

const userIfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userIfoFromStorage } };
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
