import React from "react";

function DateComponent({ dateFromBackend }) {
  // Przyjmij, że dateFromBackend to data z backendu w formie napisu (string)
  const backendDate = new Date(dateFromBackend);
  const year = backendDate.getFullYear().toString(); // 
  const month = (backendDate.getMonth() + 1).toString().padStart(2, '0');
  const day = backendDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${day}.${month}.${year}:12:00`;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <> {formattedDate}</>
    </div>
  );
}

export default DateComponent;








