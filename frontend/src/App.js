import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LocationScreen from "./screens/LocationScreen";

//Navbars
import NavbarTopAdmin from "./component/NavbarTopAdmin";
import NavbarTopUser from "./component/NavbarTopUser";
import NavbarBottom from "./component/NavbarBottom";

import CurrentAdress from "./screens/CurrentAdress";
import HomeScreen from "./screens/HomeScreen";
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
import AddContact from "./admin/AddContact";
import AdminAreas from "./admin/AdminAreas";
import AddArea from "./admin/AddArea";

import SearchBox from "./component/SearchBox";
import BookData from "./Data/data.json";

import LoginScreen from "./screens/LoginScreen";
import LogoutScreen from "./screens/LogoutScreen";

import LoginAdmin from "./admin/LoginAdmin";

import AddCity from "./admin/AddCity";
import CityDescription from "./admin/CityDescription";

function App() {
  return (
    <>
      <>
        <NavbarTopAdmin />
        <NavbarTopUser />
        <Routes>
          <Route path="/" element={<HomeScreen />} />

          <Route path="admin/district" element={<AdminScreenDistrict />} />
          <Route
            path="dashboard/district/district/add"
            element={<AddDiscrict />}
          />

          <Route path="login" element={<LoginScreen />} />
          <Route path="logout" element={<LogoutScreen />} />

          <Route path="carousel" element={<ProductCarousel />} />

          <Route
            path="searchBox"
            element={
              <SearchBox placeholder="Enter data ...." data={BookData} />
            }
          />
          <Route path="uploadImage" element={<UploadImage />} />

          <Route path="cartScreen" element={<CartScreen />} />
          {/* <Route path="home/*" element={<NotFoundScreen />} /> */}

          <Route path="dashboard" element={<DashboardScreen />}>
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

          <Route
            path="dashboard/district/district/:id/edit"
            element={<EditDistrict />}
          />
          <Route path="add-city/:id/add" element={<AddCity />} />
          <Route
            path="add-description/:name/:id/:cityId/add"
            element={<CityDescription />}
          />
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
            path="dashboard/shops/shops/:id/contact"
            element={<AddContact />}
          />
          <Route path="dashboard/areas/areas/:add" element={<AddArea />} />

          <Route path="login-admin" element={<LoginAdmin />}></Route>
        </Routes>
        {/* <NavbarBottom /> */}
      </>
    </>
  );
}

export default App;
