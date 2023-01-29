import React, { useState } from "react";

function RotateCard() {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyles = {
    position: "relative",
    width: "300px",
    boxShadow: "none",
    background: "none",
  };

  const cardSideStyles = {
    height: "10rem",
    transition: "all 0.8s ease",
    backfaceVisibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: "2rem",
    color: "white",
  };

  const backStyles = {
    ...cardSideStyles,
    transform: `rotateY(${isHovered ? 0 : -180}deg)`,
    backgroundColor: "#207b00",
    backgroundImage:
      "linear-gradient(157deg, rgba(252, 185, 89, 1) 0%, rgba(156, 131, 90, 1) 99%)",
  };

  const frontStyles = {
    ...cardSideStyles,
    transform: `rotateY(${isHovered ? 180 : 0}deg)`,
    backgroundColor: "#207b00",
    backgroundImage:
      "linear-gradient(157deg, rgba(89, 131, 252, 1) 0%, rgba(41, 53, 86, 1) 99%)",
  };

  return (
    <div
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={backStyles}>Back</div>
      <div style={frontStyles}>Front</div>
    </div>
  );
}

export default RotateCard;
