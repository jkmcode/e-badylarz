import React from "react";
import { useTranslation } from "react-i18next";

function DateComponentRange({ dateFrom, dateTo }) {

  const { t } = useTranslation();

  const dateFromDate = new Date(dateFrom);
  const yearFrom = dateFromDate.getFullYear().toString(); // 
  const monthFrom = (dateFromDate.getMonth() + 1).toString().padStart(2, '0');
  const dayFrom = dateFromDate.getDate().toString().padStart(2, '0');

  const formattedDateFrom = `${dayFrom}.${monthFrom}.${yearFrom}:12:00`;


  const dateToDate = new Date(dateTo);
  const yearTo = dateToDate.getFullYear().toString(); // 
  const monthTo = (dateToDate.getMonth() + 1).toString().padStart(2, '0');
  const dayTo = dateToDate.getDate().toString().padStart(2, '0');

  const formattedDateTo = `${dayTo}.${monthTo}.${yearTo}:12:00`;

  return (
    <div style={{ display: "flex", justifyContent: "left" }}>
      <> {t("Offer_validity")}{formattedDateFrom} - {formattedDateTo}</>
    </div>
  );
}

export default DateComponentRange;








