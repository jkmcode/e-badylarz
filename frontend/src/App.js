import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LocationScreen from "./screens/LocationScreen";

//Navbars
import NavbarTopAdmin from "./component/NavbarTopAdmin";
import CurrentAdress from "./screens/CurrentAdress";
import NotFoundScreen from "./screens/NotFoundScreen";
import ProductCarousel from "./component/ProductCarousel";
import UploadImage from "./component/UploadImage";
import CartScreen from "./screens/CartScreen";

//Admin
import AdminScreenDistrict from "./admin/AdminScreenDistrict";
import AddDiscrict from "./admin/AddDiscrict";
import AdminShops from "./admin/AdminShops";

import DashboardScreen from "./screens/DashboardScreen";
import EditDistrict from "./admin/EditDistrict";
import AdminCities from "./admin/AdminCities";
import AdminAddProducts from "./admin/AdminAddProducts";
import AdminProductType from "./admin/AdminProductType";
import AddProductType from "./admin/AddProductType";
import ShopActivity from "./admin/ShopActivity";
import ShopSpotActivity from "./admin/ShopSpotActivity";
import AddContact from "./admin/AddContact";
import AdminAreas from "./admin/AdminAreas";
import AreaActivity from "./admin/AreaActivity";
import AreaShowMore from "./admin/AreaShowMore";
import SearchBox from "./component/SearchBox";
import BookData from "./Data/data.json";
import LoginScreen from "./screens/LoginScreen";
import LogoutScreen from "./screens/LogoutScreen";
import LoginAdmin from "./admin/LoginAdmin";
import AddCity from "./admin/AddCity";
import AreaSpotActivity from "./admin/AreaSpotActivity";
import CityDescription from "./admin/CityDescription";
import ProductCategories from "./admin/ProductCategories";
import AddProductCategories from "./admin/AddProductCategories";
import ProductSubcategories from "./admin/ProductSubcategories";
import AddProductSubcategories from "./admin/AddProductSubcategories";
import Products from "./admin/Products";

//Customer side
import HomeScreen from "./screens/HomeScreen";
import ProductsCategory from "./component/ProductsCategory";
import MainPageScreen from "./screens/MainPageScreen";
import Slider from "./component/Slider";
import ShopScreen from "./screens/ShopScreen";
import ProductOfTheDaySlider from "./component/ProductOfTheDaySlider";
import PrivacyPolicy from "./component/PrivacyPolicy";
import CartIndex from "./component/Cart/CartIndex";

import ShareLayouts from "./component/ShareLayouts";
import ShareLayoutsAdmin from "./component/ShareLayoutsAdmin";

function App() {
  return (
    <BrowserRouter>
      {/* <NavbarTopAdmin /> */}

      <Routes>
        <Route path="/" element={<ShareLayouts />}>
          <Route index element={<HomeScreen />} />
          <Route path="cart" element={<CartIndex />} />
          <Route path="private-policy" element={<PrivacyPolicy />} />
          <Route path="main-page" element={<MainPageScreen />} />
          <Route path="shop-details" element={<ShopScreen />} />
          {/* <Route path="*" element={<NotFoundScreen />} /> */}
        </Route>

        <Route path="dashboard" element={<ShareLayoutsAdmin />}>
          <Route index element={<AdminScreenDistrict />} />
          <Route path="district" element={<AdminScreenDistrict />} />
          <Route path="district/add" element={<AddDiscrict />} />
          <Route path="district/:id/edit" element={<EditDistrict />} />
          <Route path="district/:id/edit/add-city" element={<AddCity />} />
          <Route path="shops" element={<AdminShops />} />
          <Route path="shops/:add" element={<ShopActivity />} />
          <Route path="shops/:id/:edit" element={<ShopActivity />} />
          <Route path="shops/:id/contact" element={<AddContact />} />
          <Route path="shops/spot/:id/:add" element={<ShopSpotActivity />} />
          <Route
            path="shops/spot/:id/:add/:idSpot"
            element={<ShopSpotActivity />}
          />
          <Route path="areas" element={<AdminAreas />} />
          <Route path="areas/:add" element={<AreaActivity />} />
          <Route path="areas/:add/:id" element={<AreaActivity />} />
          <Route path="shops/:id/:edit" element={<AreaActivity />} />
          <Route path="areas/spot/:id/:add" element={<AreaSpotActivity />} />
          <Route
            path="areas/spot/:id/:add/:idArea"
            element={<AreaSpotActivity />}
          />
          <Route path="areas/:id/details" element={<AreaShowMore />} />
          <Route path="cities" element={<AdminCities />} />
          <Route path="product-categories" element={<ProductCategories />} />
          <Route
            path="product-categories/add"
            element={<AddProductCategories />}
          />
          <Route
            path="product-categories/:id/subcategories"
            element={<ProductSubcategories />}
          />
          <Route
            path="product-categories/:id/subcategories/add"
            element={<AddProductSubcategories />}
          />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="login-admin" element={<LoginAdmin />}></Route>
      </Routes>
      <Routes>
        {/* <Route path="products" element={<AdminAddProducts />} />
        <Route path="product-categories" element={<AdminAddProducts />} /> */}
        {/* <Route
            path="add-description/:name/:id/:cityId/add"
            element={<CityDescription />}
          /> */}

        {/* <Route path="admin/district" element={<AdminScreenDistrict />} /> */}
        {/* <Route
          path="dashboard/district/district/add"
          element={<AddDiscrict />}
        /> */}

        {/* <Route path="dashboard" element={<DashboardScreen />}>
          <Route path=":shopsParam/shops" element={<AdminShops />} />
          <Route path=":areaParam/areas" element={<AdminAreas />} />
          <Route
            path=":districtParam/district"
            element={<AdminScreenDistrict />}
          />
          <Route path=":citiesParam/cities" element={<AdminCities />} />
          <Route
            path=":productsParam/products"
            element={<AdminAddProducts />}
          />
          <Route
            path=":productsTypeParam/products-type"
            element={<AdminProductType />}
          />
        </Route>

        <Route path="add-city/:id/add" element={<AddCity />} />

        <Route
          path="dashboard/productsType/products-type/add"
          element={<AddProductType />}
        />
        <Route path="dashboard/shops/shops/:add" element={<ShopActivity />} />
        <Route
          path="dashboard/shops/shops/:id/:edit"
          element={<ShopActivity />}
        />

        <Route
          path="dashboard/shops/shops/spot/:id/:add"
          element={<ShopSpotActivity />}
        />

        <Route
          path="dashboard/shops/shops/spot/:id/:add/:idSpot"
          element={<ShopSpotActivity />}
        />

        <Route
          name="test"
          path="dashboard/shops/shops/:id/contact"
          element={<AddContact />}
        />
        <Route path="dashboard/areas/areas/:add" element={<AddArea />} />

        <Route path="login-admin" element={<LoginAdmin />}></Route>

        <Route
          path="searchBox"
          element={<SearchBox placeholder="Enter data ...." data={BookData} />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
