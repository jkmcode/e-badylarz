import React from "react";
import { Icon } from "@iconify/react";

function Rating({ value, text, color }) {
  return (
    <>
      <span>
        <span>
          {value >= 1 ? (
            <Icon icon="bi:star-fill" width="32" height="32" color={color} />
          ) : value >= 0.5 ? (
            <Icon icon="bi:star-half" width="32" height="32" color={color} />
          ) : (
            <Icon icon="bi:star" width="32" height="32" color={color} />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <Icon icon="bi:star-fill" width="32" height="32" color={color} />
          ) : value >= 1.5 ? (
            <Icon icon="bi:star-half" width="32" height="32" color={color} />
          ) : (
            <Icon icon="bi:star" width="32" height="32" color={color} />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <Icon icon="bi:star-fill" width="32" height="32" color={color} />
          ) : value >= 2.5 ? (
            <Icon icon="bi:star-half" width="32" height="32" color={color} />
          ) : (
            <Icon icon="bi:star" width="32" height="32" color={color} />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <Icon icon="bi:star-fill" width="32" height="32" color={color} />
          ) : value >= 3.5 ? (
            <Icon icon="bi:star-half" width="32" height="32" color={color} />
          ) : (
            <Icon icon="bi:star" width="32" height="32" color={color} />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <Icon icon="bi:star-fill" width="32" height="32" color={color} />
          ) : value >= 4.5 ? (
            <Icon icon="bi:star-half" width="32" height="32" color={color} />
          ) : (
            <Icon icon="bi:star" width="32" height="32" color={color} />
          )}
        </span>
      </span>
      <span className="px-2">{text && `(${text})`}</span>
    </>
  );
}

export default Rating;
