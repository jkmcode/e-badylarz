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
import AdminScreen from "./screens/AdminScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import ProductCarousel from "./component/ProductCarousel";
import CartScreen from "./screens/CartScreen";

import AdminScreenDistrict from "./admin/AdminScreenDistrict";
import AddDiscrict from "./admin/AddDiscrict";

//SerachBoxComponent
import SearchBox from "./component/SearchBox";
import BookData from "./Data/data.json";

import LoginScreen from "./screens/LoginScreen";
import LogoutScreen from "./screens/LogoutScreen";

function App() {
  return (
    <div>
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

        <Route path="admin" element={<AdminScreen />} />
        <Route path="admin/district" element={<AdminScreenDistrict />} />
        <Route path="admin/district/add" element={<AddDiscrict />} />

        <Route path="login" element={<LoginScreen />} />
        <Route path="logout" element={<LogoutScreen />} />

        <Route path="carousel" element={<ProductCarousel />} />

        <Route
          path="searchBox"
          element={<SearchBox placeholder="Enter data ...." data={BookData} />}
        />

        <Route path="cartScreen" element={<CartScreen />} />
        {/* <Route path="home/*" element={<NotFoundScreen />} /> */}
      </Routes>
      <NavbarBottom />
    </div>
  );
}

export default App;
