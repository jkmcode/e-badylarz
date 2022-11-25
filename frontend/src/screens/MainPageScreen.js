import React, { useState, useEffect } from "react";
import ProductsCategory from "../component/ProductsCategory";
import ProductsCategory2 from "../component/ProductsCategory2";
import { Dropdown, Row, Col } from "react-bootstrap";
import ProductCarousel from "../component/ProductCarousel";
import AboutUsScreeen from "./AboutUsScreen";
import NavbarBottom from "../component/NavbarBottom";
import SidebarStructure from "../component/SibebarCategories/SidebarStructure";
import vegeImg from "../images/vege.jpg";
import { infos } from "../Data/dataInfoCarousel";
import MultiImageSlider from "../component/MultiImageSlider/MultiImageSlider";

function MainPageScreen() {
  const [area, setArea] = useState("Test");
  const [infoData, setInfoData] = useState(infos);
  const [index, setIndex] = useState(0);

  //responsivness
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const detectSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowWidth]);

  //

  //changing text

  //
  useEffect(() => {
    if (index > infoData.length - 1) {
      setIndex(0);
    }
  }, [index, infoData]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  //

  const textInfo = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: `translate(-50%)`,
    color: "white",
    fontSize: "2rem",
    width: "80%",
    textAlign: "center",
    fontWeight: "500",
    textShadow: `rgb(0, 0, 0) 2px 2px 2px`,
    transition: `all 1s linear`,
    opacity: "0",
  };

  const textInfoActive = {
    ...textInfo,
    opacity: "1",
  };
  return (
    <>
      <ProductsCategory2 />
      {/* <ProductsCategory /> */}
      <SidebarStructure />

      {/* <div className="order-info px-5 py-3"> */}
      <div>
        <div className="d-flex justify-content-start">
          {/* <Dropdown className="d-inline">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="mb-0"
            >
              {area}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#/action-1"
                onClick={() => setArea("Obszar 1")}
              >
                Obszar 1
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                onClick={() => setArea("Obszar 2")}
              >
                Obszar 2
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => setArea("Obszar 3")}
              >
                Obszar 3
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
        <div
          style={{
            width: "100%",
            height: windowWidth < 800 ? "70vh" : "50vh",
            position: "relative",
          }}
        >
          <img
            src={vegeImg}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          {infoData.map((info, indexInfo) => {
            const { id, text } = info;
            return (
              <>
                <div
                  key={id}
                  style={indexInfo === index ? textInfoActive : textInfo}
                >
                  {text}
                </div>
              </>
            );
          })}

          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
            }}
          >
            {Array.from({ length: 5 }).map((item, dotIndex) => (
              <div
                onClick={() => setIndex(dotIndex)}
                style={{
                  width: windowWidth < 800 ? "30px" : "20px",
                  height: windowWidth < 800 ? "30px" : "20px",
                  border: `3px solid #f1f1f1`,
                  backgroundColor: dotIndex === index ? "white" : "black",
                  marginLeft: windowWidth < 800 ? "1.2rem" : "0.5rem",
                  borderRadius: "50%",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <MultiImageSlider />

        {/* <div className="text-center h4 pt-3 title-decorations">Wyprzedaż</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Nowości</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Ulubione</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Warzywa</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Owoce</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Pieczywo</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Nabiał</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Wędliny</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Mięsa</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">
          Produkty suche
        </div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Bakalie</div>
        <ProductCarousel />
        <div className="text-center h4 pt-3 title-decorations">Inne</div>
        <ProductCarousel /> */}
        <AboutUsScreeen />
        <NavbarBottom />
      </div>
    </>
  );
}

export default MainPageScreen;
