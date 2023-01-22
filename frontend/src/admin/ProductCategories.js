import React from "react";
import { useTranslation } from "react-i18next";
import { title, FormLayout } from "./AdminCSS";
import { dataProductCategories } from "../Data/dataProductCategories";

function ProductCategories() {
  const { t } = useTranslation();

  console.log("dataProductCategories", dataProductCategories);

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        marginTop: "1rem",
        padding: "2rem",
        borderRadius: "0.5rem",
      }}
    >
      <div style={title}>{t("ProductCategories_title")}</div>

      <FormLayout col="3">
        {dataProductCategories.map((category) => {
          return (
            <button
              style={{
                backgroundImage:
                  "linear-gradient(195deg, rgb(66, 66, 74) 0%, rgb(25, 25, 25) 100%)",
                color: "white",
                minWidth: "200px",
                minHeight: "200px",
                fontSize: "2rem",
                borderRadius: "1rem",
                margin: "auto",
                marginBottom: "1rem",
              }}
            >
              {category.name}
              <div>{category.icon}</div>
            </button>
          );
        })}
      </FormLayout>
    </div>
  );
}

export default ProductCategories;
