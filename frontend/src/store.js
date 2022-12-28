import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { testListReducer } from "./reducers/testReducer";
import { districtReducer } from "./reducers/FormAdressScreen/discrictsReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  areaActivityReducer,
  areaListReducer,
  areaReducer
} from "./reducers/areaReducer"
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
  addProductTypeReducer,
  shopListReducer,
  contactListReducer,
  getShopReducer,
  updateShopReducer,
  saveImageReducer,
  insertImageReducer,
  shopSpotListReducer,
  getShopSpotReducer,
  shopSpotUpdateListReducer
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
  addCity: addCitiReducer,
  citesList: citesListReducer,
  addProductType: addProductTypeReducer,
  shopList: shopListReducer,
  contactList: contactListReducer,
  getShop: getShopReducer,
  updateShop: updateShopReducer,
  areaList: areaListReducer,
  saveImage: saveImageReducer,
  insertImage: insertImageReducer,
  shopSpotsList: shopSpotListReducer,
  getShopSpot: getShopSpotReducer,
  cartReducer: cartReducer,
  areaActivity: areaActivityReducer,
  areaToEdit: areaReducer,
  shopSpotUpdate: shopSpotUpdateListReducer
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
