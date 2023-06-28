import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { testListReducer } from "./reducers/testReducer";
import { districtReducer } from "./reducers/FormAdressScreen/discrictsReducer";
import { cartReducer } from "./reducers/cartReducer";
import { uploadImageReducers } from "./reducers/imageActivityReducer";
import {
  addProductReducer,
  productCatListReducer,
  sortedProductCatListReducer,
  subproductCatListReducer,
  addSubproductCatListReducer,
  getSubproductCatReducer,
  editSubproductCatReducer,
  searchProductReducer,
  getMyProductsReducer,
  addMyImageReducer,
  uploadMyImageReducer,
  getMyImageReducer,
  deleteMyImageReducer,
  deleteMyProductReducer,
  addMyProductReducer
} from "./reducers/productReducer";
import {
  areaActivityReducer,
  areaListReducer,
  areaReducer,
  contactAreaListReducer,
  areaSpotReducer,
} from "./reducers/areaReducer";
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
  getSpotReducer,
  shopSpotUpdateListReducer,
  citesListAllReducer,
  getSingleInstanceReducer,
  getListOfDataReducer,
  addSingleInstanceReducer,
  updateSingleInstanceReducer,
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
  citesListAll: citesListAllReducer,
  addProductType: addProductTypeReducer,
  shopList: shopListReducer,
  contactList: contactListReducer,
  contactAreaList: contactAreaListReducer,
  getShop: getShopReducer,
  updateShop: updateShopReducer,
  areaList: areaListReducer,
  saveImage: saveImageReducer,
  insertImage: insertImageReducer,
  shopSpotsList: shopSpotListReducer,
  getSpot: getSpotReducer,
  cartReducer: cartReducer,
  areaActivity: areaActivityReducer,
  areaToEdit: areaReducer,
  shopSpotUpdate: shopSpotUpdateListReducer,
  areaSpot: areaSpotReducer,
  addProduct: addProductReducer,
  productCatList: productCatListReducer,
  sortedProductCatList: sortedProductCatListReducer,
  subproductCatList: subproductCatListReducer,
  addSubproductCatList: addSubproductCatListReducer,
  getSubproductCat: getSubproductCatReducer,
  editSubproductCat: editSubproductCatReducer,
  uploadImage: uploadImageReducers,
  getSingleInstance: getSingleInstanceReducer,
  getListOfData: getListOfDataReducer,
  addSingleInstance: addSingleInstanceReducer,
  updateSingleInstance: updateSingleInstanceReducer,
  searchProduct: searchProductReducer,
  getMyProducts: getMyProductsReducer,
  addMyImage: addMyImageReducer,
  uploadMyImage: uploadMyImageReducer,
  getMyImage: getMyImageReducer,
  deleteMyImage: deleteMyImageReducer,
  deleteMyProduct: deleteMyProductReducer,
  addMyProduct: addMyProductReducer
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
