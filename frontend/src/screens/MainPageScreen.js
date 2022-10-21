import React, { useState } from "react";
import ProductsCategory from "../component/ProductsCategory";
import { Dropdown, Row, Col } from "react-bootstrap";
import ProductCarousel from "../component/ProductCarousel";
import AboutUsScreeen from "./AboutUsScreen";
import NavbarBottom from "../component/NavbarBottom";

function MainPageScreen() {
  const [area, setArea] = useState("Test");
  return (
    <>
      <ProductsCategory />
      <div className="order-info px-5 py-3">
        <div className="d-flex justify-content-start">
          <Dropdown className="d-inline">
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
          </Dropdown>
          <div className="ms-3 d-inline text-success text-center custom-order-info-text">
            Odkrywaj lokalnych przedsiębiorców z twojej okolicy poprzez wybór
            obszaru zakupów !
          </div>
        </div>
        <Row>
          <div className="text-center">
            Szukaj wyjątkowych produktów spożywczych i wspieraj lokalne biznesy!{" "}
          </div>
          <div className="text-center">
            Zamawiaj do 12:00 i otrzymaj zakupy tego samego dnia. Wybierz obszar
            zakupów i dowiedź się więcej na temat swoich ulubionych dostawców.
            Zminimalizuj straty żywności lokalnych przedsiębiorców dzięki sekcji
            wyprzedażowej!
          </div>
        </Row>
      </div>
      <div className="bg-white">
        <div className="text-center h4 pt-3 title-decorations">Wyprzedaż</div>
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
        <ProductCarousel />
        <AboutUsScreeen />
        <NavbarBottom />
      </div>
    </>
  );
}

export default MainPageScreen;
