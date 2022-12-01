import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //const [conWidth, setConWidth] = useState(0);

  //   const handleBtnPrev = () => {
  //     setConWidth((prevWidth) => {
  //       let currentWidth = prevWidth - box.current.getBoundingClientRect().width;
  //       if (currentWidth < 0) {
  //         currentWidth = 0;
  //       }
  //       return currentWidth;
  //     });
  //   };

  //   const handleBtnNext = () => {
  //     setConWidth((prevWidth) => {
  //       let currentWidth = prevWidth + box.current.getBoundingClientRect().width;
  //       return currentWidth;
  //     });
  //   };

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
