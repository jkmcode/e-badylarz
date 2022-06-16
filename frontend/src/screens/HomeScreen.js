import React, { useState, useEffect } from "react";

function HomeScreen() {
  const [disabledField, setDisabledField] = useState("false");
  const [test, setTest] = useState("false");
  const [test2, setTest2] = useState("sfsfsdfsdafasdf");

  useEffect(() => {
    console.log("renderuje");
  });

  return <div className="mt-10">to jest HomeScreen</div>;
}

export default HomeScreen;
