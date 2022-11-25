import React from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { AppProvider } from "./context";

function SidebarStructure() {
  return (
    <AppProvider>
      <Sidebar />
      <Home />
    </AppProvider>
  );
}

export default SidebarStructure;
