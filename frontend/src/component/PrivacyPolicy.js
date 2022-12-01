import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t } = useTranslation();

  window.addEventListener("load", function () {
    window.scrollTo(0, 0);
  });

  return (
    <div
      style={{ width: "100%", backgroundColor: "#edf2ee", paddingTop: "1rem" }}
    >
      <Container
        style={{
          marginTop: "2rem",
          backgroundColor: "#edf2ee",
          color: "#535453",
          marginTop: "0",
        }}
      >
        <h2 style={{ color: "#535453" }}>{t("PrivatePolicy_title")}</h2>
        <h2 style={{ color: "#535453" }}>
          {t("PrivatePolicy_1_General_Information")}
        </h2>
        <ul>
          <li>{t("PrivatePolicy_1.1_General_Information")}</li>
          <li>{t("PrivatePolicy_1.2_General_Information")}</li>
          <li>{t("PrivatePolicy_1.3_General_Information")}</li>
          <li>{t("PrivatePolicy_1.3_General_Information")}</li>
          <li>{t("PrivatePolicy_1.4_General_Information")}</li>
          <ul>
            <li>{t("PrivatePolicy_1.4.1_General_Information")}</li>
          </ul>
          <li>{t("PrivatePolicy_1.5_General_Information")}</li>
          <ul>
            <li>{t("PrivatePolicy_1.5.1_General_Information")}</li>
            <li>{t("PrivatePolicy_1.5.2_General_Information")}</li>
          </ul>
        </ul>
        <h2 style={{ color: "#535453" }}>
          {t("PrivatePolicy_2_Selected_data_protection")}
        </h2>
        <ul>
          <li>{t("PrivatePolicy_2.1_Selected_data_protection")}</li>
          <li>{t("PrivatePolicy_2.2_Selected_data_protection")}</li>
          <li>{t("PrivatePolicy_2.3_Selected_data_protection")}</li>
          <li>{t("PrivatePolicy_2.4_Selected_data_protection")}</li>
        </ul>
        <h2 style={{ color: "#535453" }}>{t("PrivatePolicy_3_Hosting")}</h2>
        <ul>
          <li>{t("PrivatePolicy_3.1_Hosting")}</li>
        </ul>
        <h2 style={{ color: "#535453" }}>
          {t("PrivatePolicy_4_Rights_and_additional_information")}
        </h2>
        <ul>
          <li>{t("PrivatePolicy_4.1_Rights_and_additional_information")}</li>
          <ul>
            <li>
              {t("PrivatePolicy_4.1.1_Rights_and_additional_information")}
            </li>
            <li>
              {t("PrivatePolicy_4.1.2_Rights_and_additional_information")}
            </li>
            <li>
              {t("PrivatePolicy_4.1.3_Rights_and_additional_information")}
            </li>
            <li>
              {t("PrivatePolicy_4.1.4_Rights_and_additional_information")}
            </li>
            <li>
              {t("PrivatePolicy_4.1.5_Rights_and_additional_information")}
            </li>
          </ul>
          <li>{t("PrivatePolicy_4.2_Rights_and_additional_information")}</li>
          <li>{t("PrivatePolicy_4.3_Rights_and_additional_information")}</li>
          <ul>
            <li>
              {t("PrivatePolicy_4.3.1_Rights_and_additional_information")}
            </li>
            <li>
              {t("PrivatePolicy_4.3.2_Rights_and_additional_information")}
            </li>
            <li>
              {t("PrivatePolicy_4.3.3_Rights_and_additional_information")}
            </li>
            <li>
              {t("PrivatePolicy_4.3.4_Rights_and_additional_information")}
            </li>
            <li>
              {t("PrivatePolicy_4.3.5_Rights_and_additional_information")}
            </li>
          </ul>
          <li>{t("PrivatePolicy_4.4_Rights_and_additional_information")}</li>
          <li>{t("PrivatePolicy_4.5_Rights_and_additional_information")}</li>
          <li>{t("PrivatePolicy_4.6_Rights_and_additional_information")}</li>
          <li>{t("PrivatePolicy_4.7_Rights_and_additional_information")}</li>
          <li>{t("PrivatePolicy_4.8_Rights_and_additional_information")}</li>
        </ul>
        <h2 style={{ color: "#535453" }}>
          {t("PrivatePolicy_5_Information_in_the_forms")}
        </h2>
        <ul>
          <li>{t("PrivatePolicy_5.1_Information_in_the_forms")}</li>
          <li>{t("PrivatePolicy_5.2_Information_in_the_forms")}</li>
          <li>{t("PrivatePolicy_5.3_Information_in_the_forms")}</li>
          <li>{t("PrivatePolicy_5.4_Information_in_the_forms")}</li>
        </ul>
        <h2 style={{ color: "#535453" }}>
          {t("PrivatePolicy_6_Administrator_logs")}
        </h2>
        <ul>
          <li>{t("PrivatePolicy_6.1_Administrator_logs")}</li>
        </ul>
        <h2 style={{ color: "#535453" }}>
          {t("PrivatePolicy_7_Relevant_marketing_techniques")}
        </h2>
        <ul>
          <li>{t("PrivatePolicy_7.1_Relevant_marketing_techniques")}</li>
        </ul>
        <h2 style={{ color: "#535453" }}>
          {t("PrivatePolicy_8_Information_about_cookies")}
        </h2>
        <ul>
          <li>{t("PrivatePolicy_8.1_Information_about_cookies")}</li>
          <li>{t("PrivatePolicy_8.2_Information_about_cookies")}</li>
          <li>{t("PrivatePolicy_8.3_Information_about_cookies")}</li>
          <li>{t("PrivatePolicy_8.4_Information_about_cookies")}</li>
          <ul>
            <li>{t("PrivatePolicy_8.4.1_Information_about_cookies")}</li>
            <li>{t("PrivatePolicy_8.4.2_Information_about_cookies")}</li>
          </ul>
          <li>{t("PrivatePolicy_8.5_Information_about_cookies")}</li>
          <li>{t("PrivatePolicy_8.6_Information_about_cookies")}</li>
          <li>{t("PrivatePolicy_8.7_Information_about_cookies")}</li>
          <li>{t("PrivatePolicy_8.8_Information_about_cookies")}</li>
        </ul>
        <h2 style={{ color: "#535453" }}>
          {t("PrivatePolicy_9_Managing cookies")}
        </h2>
        <ul>
          <li>{t("PrivatePolicy_9.1_Managing cookies")}</li>
          <li>{t("PrivatePolicy_9.2_Managing cookies")}</li>
          <ul>
            <li>{t("PrivatePolicy_9.2.1_Managing cookies")}</li>
            <li>{t("PrivatePolicy_9.2.2_Managing cookies")}</li>
            <li>{t("PrivatePolicy_9.2.3_Managing cookies")}</li>
            <li>{t("PrivatePolicy_9.2.4_Managing cookies")}</li>
            <li>{t("PrivatePolicy_9.2.5_Managing cookies")}</li>
            <li>{t("PrivatePolicy_9.2.6_Managing cookies")}</li>
          </ul>
          <li>{t("PrivatePolicy_9.3_Managing cookies")}</li>
          <ul>
            <li>{t("PrivatePolicy_9.3.1_Managing cookies")}</li>
            <li>{t("PrivatePolicy_9.3.2_Managing cookies")}</li>
            <li>{t("PrivatePolicy_9.3.3_Managing cookies")}</li>
          </ul>
        </ul>
        <p style={{ marginBottom: "0" }}>{t("PrivatePolicy_conclusion")}</p>
      </Container>
    </div>
  );
}

export default PrivacyPolicy;
