import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LocationScreen from "./screens/LocationScreen";
import TestScreen from "./screens/TestScreen";
import NavbarTop from "./component/NavbarTop";
import NavbarBottom from "./component/NavbarBottom";
import HomeScreen from "./screens/HomeScreen";
import CurrentAdress from "./screens/CurrentAdress";
import FormAddressScreen from "./screens/FormAddressScreen";
import FormAddressScreen2 from "./screens/FormAdressScreen2";
import NotFoundScreen from "./screens/NotFoundScreen";
import ProductCarousel from "./component/ProductCarousel";
import CartScreen from "./screens/CartScreen";

//Admin
import AdminScreenDistrict from "./admin/AdminScreenDistrict";
import AddDiscrict from "./admin/AddDiscrict";
import AdminShops from "./admin/AdminShops";

import DashboardScreen from "./screens/DashboardScreen";
import EditDistrict from "./admin/EditDistrict";
import AdminCities from "./admin/AdminCities";

//SerachBoxComponent
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
        <NavbarTop />
        <Routes>
          <Route path="/" element={<FormAddressScreen />} />
          {/* <Route path="/address" element={<FormAdressScreen />}></Route> */}

          <Route path="home/*" element={<HomeScreen />}>
            {/* <Route index element={<TestScreen />} /> */}
            <Route path="test" element={<TestScreen />} />
          </Route>

          <Route path="home/test1" element={<TestScreen />} />
          {/* <Route path="form" element={<FormAddressScreen2 />} /> */}

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

          <Route path="cartScreen" element={<CartScreen />} />
          {/* <Route path="home/*" element={<NotFoundScreen />} /> */}

          <Route path="dashboard" element={<DashboardScreen />}>
            <Route path=":shopsParam/shops" element={<AdminShops />} />
            <Route
              path=":districtParam/district"
              element={<AdminScreenDistrict />}
            />
            <Route path=":citiesParam/cities" element={<AdminCities />} />
          </Route>

          <Route
            path="dashboard/district/district/:id/edit"
            element={<EditDistrict />}
          />
          <Route path="add-city/:id/add" element={<AddCity />} />
          <Route path="add-description/:name/:id/:cityId/add" element={<CityDescription />} />
          <Route path="login-admin" element={<LoginAdmin />}></Route>
        </Routes>
        <NavbarBottom />
      </>
    </>
  );
}

export default App;
