import React from "react";
import MultipleImageSlider from "./MultiImageSlider";
import { AppProvider } from "./context";

function MultiImageSliderStructure() {
  return (
    <AppProvider>
      <MultipleImageSlider />
    </AppProvider>
  );
}

export default MultiImageSliderStructure;
