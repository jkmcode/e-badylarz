import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { unactiveBtn } from "../admin/AdminCSS";
import { useTranslation } from "react-i18next";

function RotateCard({ name, uniqueId, listOfButtons }) {
  const { t } = useTranslation();

  const [toggle, setToggle] = useState(false);
  const [uniqueID, setuniqueID] = useState({});

  console.log("listOfButtons", listOfButtons);

  //styling

  const cardStyles = {
    position: "relative",
    width: "300px",
    minHeight: "250px",
    boxShadow: "none",
    background: "none",
    margin: "auto",
    marginBottom: "2rem",
  };

  const cardSideStyles = {
    minHeight: "200px",
    transition: "all 0.8s ease",
    backfaceVisibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: "0 1rem 1rem 1rem",
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
            color="white"
            width="32"
            height="32"
          />
        </button>
        {listOfButtons.map((button) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem",
              }}
              key={button.id}
            >
              {button.button}
            </div>
          );
        })}
      </div>
      <div style={frontStyles}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => setToggle(!toggle)}
            style={{
              display: "flex",
              alignItems: "flex-end",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <Icon icon="entypo:dots-three-horizontal" color="white" />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <div>{name}</div>
        </div>
      </div>
    </div>
  );
}

export default RotateCard;
