import React, { useState } from "react";
import { Icon } from "@iconify/react";

function RotateCard({ name }) {
  const [isHovered, setIsHovered] = useState(false);
  const [toggle, setToggle] = useState(false);

  const cardStyles = {
    position: "relative",
    width: "300px",
    height: "300px",
    boxShadow: "none",
    background: "none",
    margin: "auto",
  };

  const cardSideStyles = {
    height: "200px",
    transition: "all 0.8s ease",
    backfaceVisibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: "1rem",
    color: "white",
  };

  const backStyles = {
    ...cardSideStyles,
    transform: `rotateY(${toggle ? 0 : -180}deg)`,
    backgroundColor: "#207b00",
    backgroundImage:
      "linear-gradient(157deg, rgba(252, 185, 89, 1) 0%, rgba(156, 131, 90, 1) 99%)",
  };

  const frontStyles = {
    ...cardSideStyles,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    transform: `rotateY(${toggle ? 180 : 0}deg)`,
    backgroundColor: "#207b00",
    backgroundImage:
      "linear-gradient(157deg, rgba(89, 131, 252, 1) 0%, rgba(41, 53, 86, 1) 99%)",
  };

  return (
    <div style={cardStyles}>
      <div style={backStyles}>
        <button
          onClick={() => setToggle(!toggle)}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <Icon
            icon="material-symbols:arrow-circle-left"
            width="32"
            height="32"
          />
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem",
          }}
        >
          <button
            style={{
              width: "100%",
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            Edit
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem",
          }}
        >
          <button
            style={{
              width: "100%",
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            Unactive
          </button>
        </div>
      </div>
      <div style={frontStyles}>
        <button
          onClick={() => setToggle(!toggle)}
          style={{
            position: "absolute",
            top: 0,
            right: "10%",
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
          }}
        >
          <Icon icon="entypo:dots-three-horizontal" color="white" />
        </button>
        <div>{name}</div>
      </div>
    </div>
  );
}

export default RotateCard;
