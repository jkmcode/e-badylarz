import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import {
  categories,
  vegetables,
  fruits,
  meats,
  dairy,
  tomatoes,
  potatoes,
  blank,
  addicionalInfo,
} from "../Data/dataProductCategory";
import { Link } from "react-router-dom";
import useResponsive from "./useResponsive";

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

function ProductsCategory2() {
  const { t } = useTranslation();

  const [btnIsHover, setBtnIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const [vegIndex, setVegIndex] = useState(-1);
  const [tomatoIndex, setTomatoIndex] = useState(-1);
  const [dataCategories, setDataCategories] = useState(vegetables);
  const [dataSubcategories, setDataSubcategories] = useState(blank);
  const [linksItem, setLinksItem] = useState(-1);
  const [info, setInfo] = useState(false);

  //testing
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));
  //
  const { windowWidth } = useResponsive();

  //

  //useRef

  // const linksRef = useRef();
  // const linksContainerRef = useRef();

  // useEffect(() => {
  //   const linksHeight = linksRef.current.getBoundingClientRect().height;
  //   if (info) {
  //     linksContainerRef.current.style.height = `${linksHeight}px`;
  //   } else {
  //     linksContainerRef.current.style.height = `0px`;
  //   }
  // }, [info]);

  //styling
  const category = {
    backgroundColor: "#f5f2eb",
    display: "flex",
    alignItems: "center",
    justifyContent: windowWidth > 800 ? "flex-start" : "space-between",
  };

  const btnCategory = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "green",
    fontSize: "14px",
    fontWeight: "500",
    backgroundColor: btnIsHover ? "#e4f5e6" : "#f5e9ee",
    borderColor: "transparent",
    height: "40px",
    padding: "0 24px",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: "900px",
    boxShadow: `0 0 5px 0 rgb(0 0 0 / 14%)`,
    transition: `all 0.3s linear`,
  };

  const btnIcon = {
    marginLeft: "5px",
    transform: isOpen ? `rotate(180deg)` : `rotate(0deg)`,
    transition: `all 0.3s linear`,
  };

  const categoryContainerPosition = {
    display: "flex",
    justifyContent: "center",
  };

  const categoryContainer = {
    display: "block",
    position: "absolute",
    zIndex: "999",
    height: isOpen ? "35rem" : "0rem",
    width: "80%",
    minWidth: "500px",
    overflow: isOpen ? "auto" : "hidden",
    backgroundColor: "white",
    color: "grey",
    transition: `all 0.3s linear`,
    // "&::-webkit-scrollbar-thumb": {
    //   backgroundColor: "rgba(0,0,0,.1)",
    //   outline: "1px solid slategrey",
    // },
  };

  const generalInfo = {
    color: "grey",
    transition: `all 0.3s linear`,
    fontWeight: "500",
    padding: windowWidth > 1000 ? "8px 14px" : "8px 12px",
    fontSize: windowWidth > 1000 ? "14px" : "13px",
  };

  const generalInfoHover = {
    ...generalInfo,
    color: "green",
  };

  const singleCategory = {
    padding: "8px 18px",
    width: "100%",
    cursor: "pointer",
    backgroundColor: "white",
    fontSize: "14px",
    fontWeight: "500",
  };

  const activeSingleCategory = {
    ...singleCategory,
    backgroundColor: "#f2f2f2",
    color: "black",
  };

  const lastSingleCategory = {
    ...singleCategory,
    borderRight: `none`,
  };

  const btnInfo = {
    backgroundColor: "transparent",
    borderColor: "transparent",
  };

  const infoContainer = {
    display: "block",
    position: "absolute",
    zIndex: "999",
    height: info ? "21.5rem" : "0rem",
    width: "90%",
    minWidth: "450px",
    overflow: info ? "auto" : "hidden",
    backgroundColor: "white",
    color: "grey",
    transition: `all 0.3s linear`,
    backgroundColor: "white",
  };

  const generalInfoMenu = {
    display: "block",
    color: "grey",
    transition: `all 0.3s linear`,
    fontWeight: "500",
    padding: "8px 14px 8px 14px",
    margin: "1rem",
    fontSize: "14px",
    borderBottom: `1px solid grey`,
  };

  const generalInfoMenuHover = {
    ...generalInfoMenu,
    padding: "8px 14px 8px 24px",
  };

  const handleSubmit = () => {
    setIsOpen(!isOpen);
  };

  const showAllCategoriesFunction = (catIndex) => {
    setIndex(catIndex);
  };

  const showVegetablesFunction = (catIndex) => {
    setVegIndex(catIndex);
  };

  const showTomatoFunction = (catIndex) => {
    setTomatoIndex(catIndex);
  };

  useEffect(() => {
    if (index === 0) {
      setDataCategories(vegetables);
    } else if (index === 1) {
      setDataCategories(fruits);
    } else if (index === 2) {
      setDataCategories(meats);
    } else if (index === 3) {
      setDataCategories(dairy);
    }
  }, [index]);

  useEffect(() => {
    if (vegIndex === 0 && index === 0) {
      setDataSubcategories(tomatoes);
    } else if (vegIndex === 1 && index === 0) {
      setDataSubcategories(potatoes);
    } else {
      setDataSubcategories(blank);
    }
  }, [vegIndex, index]);

  return (
    <div ref={ref}>
      <div style={category} className="px-4 py-1">
        <button
          onMouseEnter={() => setBtnIsHover(true)}
          onMouseLeave={() => setBtnIsHover(false)}
          onClick={handleSubmit}
          style={btnCategory}
        >
          {t("btn_products_category")}
          <Icon style={btnIcon} icon="ep:arrow-down-bold" />
        </button>
        {windowWidth > 800 ? (
          addicionalInfo.map((item, indexItem) => {
            const { id, name, url } = item;
            return (
              <Link
                to={url}
                style={indexItem === linksItem ? generalInfoHover : generalInfo}
                key={id}
                onMouseEnter={() => setLinksItem(indexItem)}
              >
                {name}
              </Link>
            );
          })
        ) : (
          <button style={btnInfo} onClick={() => setInfo(!info)}>
            <Icon
              icon="fluent:re-order-dots-horizontal-16-filled"
              width="32"
              height="32"
            />
          </button>
        )}
      </div>
      {windowWidth < 800 && (
        <div style={categoryContainerPosition}>
          <div style={infoContainer}>
            {addicionalInfo.map((item, indexItem) => {
              const { id, name, url } = item;
              return (
                <div
                  style={
                    indexItem === linksItem
                      ? generalInfoMenuHover
                      : generalInfoMenu
                  }
                >
                  <Link
                    to={url}
                    key={id}
                    onMouseEnter={() => setLinksItem(indexItem)}
                    style={{
                      color: indexItem === linksItem ? "black" : "grey",
                    }}
                  >
                    {name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={categoryContainerPosition}>
        <div style={categoryContainer}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "block",
                width: "33.333%",
                height: "35rem",
                borderRight: `1px solid #f2f2f2`,
              }}
            >
              {categories.map((cat, catIndex) => {
                const { id, name } = cat;
                return (
                  <div style={{ display: "flex" }} key={id}>
                    <div
                      style={
                        catIndex === index
                          ? activeSingleCategory
                          : singleCategory
                      }
                      onMouseOver={() => showAllCategoriesFunction(catIndex)}
                    >
                      {name}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "block",
                width: "33.333%",
                height: "35rem",
                borderRight: `1px solid #f2f2f2`,
              }}
            >
              {dataCategories.map((cat, catIndex) => {
                const { id, name } = cat;
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={
                        catIndex === vegIndex
                          ? activeSingleCategory
                          : singleCategory
                      }
                      onMouseOver={() => showVegetablesFunction(catIndex)}
                    >
                      {name}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "block", width: "33.333%" }}>
              {dataSubcategories.map((tomato, catIndex) => {
                const { id, name } = tomato;
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={
                        catIndex === tomatoIndex
                          ? activeSingleCategory
                          : singleCategory
                      }
                      onMouseOver={() => showTomatoFunction(catIndex)}
                    >
                      {name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCategory2;
