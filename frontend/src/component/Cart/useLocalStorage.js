import React, { useState, useCallback } from "react";

//https://javascript.plainenglish.io/connecting-react-with-localstorage-ad590d4e4fa1

function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
  const updatedSetValue = useCallback(
    (newValue) => {
      if (newValue === initialState || typeof newValue === "undefined") {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, newValue);
      }
      setValue(newValue ?? initialState);
    },
    [initialState, key]
  );

  return [value, updatedSetValue];
}

export default useLocalStorage;
