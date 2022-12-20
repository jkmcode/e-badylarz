import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function useBackToLogin() {
  const navigate = useNavigate();
  let userLoginTest = localStorage.getItem("userInfo");

  let userLoginTestParse = JSON.parse(userLoginTest);

  //console.log("userLoginTestParse", userLoginTestParse.IsAdmin);

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  useEffect(() => {
    if (!userLoginTestParse) {
      navigate("/login-admin");
    }
  }, [navigate, userLoginTestParse, userLoginTest]);

  return true;
}

export default useBackToLogin;
