import React from "react";
import { useTranslation } from "react-i18next";

function ImageDisplayer({ imageSrc }) {
  const { t } = useTranslation();
  return (
    <>
      <div
        style={{
          textTransform: "uppercase",
          marginTop: "1.5rem",
          textAlign: "center",
        }}
      >
        {t("current_image")}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{
            maxWidth: "400px",
            minWidth: "280px",
            margin: "1rem",
            borderRadius: "10%",
          }}
          src={imageSrc}
        />
      </div>
    </>
  );
}

export default ImageDisplayer;
