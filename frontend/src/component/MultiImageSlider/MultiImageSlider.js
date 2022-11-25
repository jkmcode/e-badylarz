import React, { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CartItem from "./CartItem";
import { cartNo } from "../../Data/dataMultiImageSlider";

function MultipleImageSlider() {
  const [conWidth, setConWidth] = useState(0);
  const [cartItemWidth, setCartItemWidth] = useState(200);

  const cartItemMargin = 10;

  //ref
  const box = useRef(null);

  // responsiveness
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const detectSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (windowWidth < 1000) {
      setCartItemWidth(150);
    } else {
      setCartItemWidth(200);
    }

    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowWidth]);

  //styling

  const btn = {
    backgroundColor: "transparent",
    borderColor: "transparent",
  };

  const mainContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const subContainer = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: windowWidth < 1000 ? `100%` : `70%`,
    marginTop: "2rem",
    marginBottom: "2rem",
  };

  const cartItemContainer = {
    padding: `0 10px`,
    display: `flex`,
    overflowX: `hidden`,
    scrollBehavior: `smooth`,
  };

  ///Button mechanism

  const handleBtnPrev = () => {
    setConWidth((prevWidth) => {
      let currentWidth = prevWidth - box.current.getBoundingClientRect().width;
      if (currentWidth < 0) {
        currentWidth = 0;
      }
      return currentWidth;
    });
  };

  const handleBtnNext = () => {
    setConWidth((prevWidth) => {
      let currentWidth = prevWidth + box.current.getBoundingClientRect().width;
      const maxWidth =
        (cartItemWidth + cartItemMargin * 2) * cartNo.length -
        box.current.getBoundingClientRect().width;
      if (maxWidth < currentWidth) {
        return maxWidth + 2 * cartItemMargin;
      } else {
        return currentWidth;
      }
    });
  };

  //Mouse drag mechanism

  const [mouseStartPosition, setMouseStartPosition] = useState(0);
  const [mouseEndPosition, setMouseEndPosition] = useState(0);
  const [mouseClicked, setMouseClicked] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    setMouseStartPosition(startX);
    setMouseEndPosition(startX);
    setMouseClicked(true);
  };

  const handleMouseMove = (e) => {
    setMouseClicked(true);
    e.preventDefault();
    if (mouseClicked) {
      const endX = e.clientX;
      setMouseEndPosition(endX);
    }
  };

  const handleMouseEnd = (e) => {
    setMouseClicked(false);
    setConWidth((prevWidth) => {
      const backAndForth = windowWidth < 1000 ? 200 : 400;
      const maxWidth =
        (cartItemWidth + cartItemMargin * 2) * cartNo.length +
        2 * cartItemMargin -
        box.current.getBoundingClientRect().width;
      let translateDist = mouseStartPosition - mouseEndPosition;
      if (translateDist > 0 && translateDist < backAndForth) {
        let scrollingLeft = prevWidth + translateDist + cartItemWidth;
        if (prevWidth > maxWidth) {
          prevWidth = maxWidth;
        }
        if (scrollingLeft > maxWidth) {
          return maxWidth;
        } else {
          return scrollingLeft;
        }
      } else if (translateDist > 0 && translateDist > backAndForth) {
        return maxWidth;
      } else if (translateDist < 0 && translateDist > -backAndForth) {
        let scrollingRigth = prevWidth + translateDist - cartItemWidth;
        if (scrollingRigth < 0) {
          return 0;
        } else {
          return scrollingRigth;
        }
      } else if (translateDist < 0 && translateDist < -backAndForth) {
        return 0;
      }
      return prevWidth;
    });
  };

  //

  //Touch drag mechanism

  const [touchStartPosition, setTouchStartPosition] = useState(0);
  const [touchEndPosition, setTouchEndPosition] = useState(0);

  const touchStartHandler = (e) => {
    setTouchStartPosition(e.targetTouches[0].clientX);
    setTouchEndPosition(e.targetTouches[0].clientX);
  };

  const touchMoveHandler = (e) => {
    setTouchEndPosition(e.targetTouches[0].clientX);
  };

  const touchEndHandler = (e) => {
    setConWidth((prevWidth) => {
      const backAndForth = windowWidth < 1000 ? 200 : 400;
      const maxWidth =
        (cartItemWidth + cartItemMargin * 2) * cartNo.length +
        2 * cartItemMargin -
        box.current.getBoundingClientRect().width;
      let translateDist = touchEndPosition - touchStartPosition;
      let reverseTranslateDist = translateDist * -1;
      if (reverseTranslateDist > 0 && reverseTranslateDist < backAndForth) {
        let scrollingLeft = prevWidth + reverseTranslateDist + cartItemWidth;
        if (prevWidth > maxWidth) {
          prevWidth = maxWidth;
        }
        if (scrollingLeft > maxWidth) {
          return maxWidth;
        } else {
          return scrollingLeft;
        }
      } else if (
        reverseTranslateDist > 0 &&
        reverseTranslateDist > backAndForth
      ) {
        return maxWidth;
      } else if (
        reverseTranslateDist < 0 &&
        reverseTranslateDist > -backAndForth
      ) {
        let scrollingRigth = prevWidth + reverseTranslateDist - cartItemWidth;
        if (scrollingRigth < 0) {
          return 0;
        } else {
          return scrollingRigth;
        }
      } else if (
        reverseTranslateDist < 0 &&
        reverseTranslateDist < -backAndForth
      ) {
        return 0;
      }
      return 0;
    });
  };

  useEffect(() => {
    box.current.scrollLeft = conWidth;
  }, [conWidth]);

  return (
    <main style={mainContainer}>
      <div style={subContainer}>
        <button style={btn} onClick={handleBtnPrev}>
          <Icon
            icon="material-symbols:arrow-circle-left-rounded"
            width="32"
            height="32"
          />
        </button>
        <div
          style={cartItemContainer}
          className="product-container"
          ref={box}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={(e) => handleMouseEnd(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          onTouchStart={(e) => touchStartHandler(e)}
          onTouchMove={(e) => touchMoveHandler(e)}
          onTouchEnd={(e) => touchEndHandler(e)}
        >
          {cartNo.map((cart) => {
            const { id, image, text, company, discount, price } = cart;
            return (
              <CartItem
                id="cartItem"
                key={id}
                cartItemWidth={cartItemWidth}
                cartItemMargin={cartItemMargin}
                image={image}
                text={text}
                company={company}
                discount={discount}
                price={price}
                windowWidth={windowWidth}
              />
            );
          })}
        </div>

        <button style={btn} onClick={handleBtnNext}>
          <Icon
            icon="material-symbols:arrow-circle-right"
            width="32"
            height="32"
          />
        </button>
      </div>
    </main>
  );
}

export default MultipleImageSlider;
