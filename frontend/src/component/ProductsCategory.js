import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Accordion } from "react-bootstrap";
import ClickAwayListener from "react-click-away-listener";

function ProductsCategory() {
  const [open, setOpen] = useState(true);
  const [showFruits, setShowFruits] = useState(false);
  const [showVegetables, setShowVegetables] = useState(false);
  const [showDairy, setShowDairy] = useState(false);

  const showFruitsFunction = () => {
    setShowFruits(true);
    setShowVegetables(false);
    setShowDairy(false);
  };

  const showVegetablesFunction = () => {
    setShowFruits(false);
    setShowVegetables(true);
    setShowDairy(false);
  };

  const showDairyFunction = () => {
    setShowFruits(false);
    setShowVegetables(false);
    setShowDairy(true);
  };

  const closeAwayListener = () => {
    setOpen(false);
    setShowFruits(false);
    setShowVegetables(false);
    setShowDairy(false);
  };

  // style

  const category = {
    backgroundColor: "#DEF5F5",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    position: "relative",
  };

  const categoryButton = {
    marginRight: "auto",
  };

  const preOrder = {
    color: "green",
    position: "relative",
  };

  const test = {
    fontSize: "10px",
    position: "absolute",
    top: "-25%",
    right: "0%",
  };

  return (
    <div style={category} className="px-4 py-1">
      <div style={categoryButton}>
        <ClickAwayListener onClickAway={() => closeAwayListener()}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey={open ? "1" : "0"}>
              <Accordion.Header onMouseOver={() => setOpen(true)}>
                Kategorie
              </Accordion.Header>
              {open && (
                <Accordion.Body className="accordion-body-main">
                  <Link
                    to="/"
                    className={
                      showFruits
                        ? "d-block item-category active-item fw-normal"
                        : "d-block item-category fw-normal"
                    }
                    onMouseOver={() => showFruitsFunction()}
                  >
                    Owoce
                  </Link>
                  <Link
                    to=""
                    className={
                      showVegetables
                        ? "d-block item-category active-item fw-normal"
                        : "d-block item-category fw-normal"
                    }
                    onMouseOver={() => showVegetablesFunction()}
                  >
                    Warzywa
                  </Link>
                  <Link
                    to="/"
                    className={
                      showDairy
                        ? "d-block item-category active-item fw-normal"
                        : "d-block item-category fw-normal"
                    }
                    onMouseOver={() => showDairyFunction()}
                  >
                    Nabiał
                  </Link>
                </Accordion.Body>
              )}
              {showFruits && open ? (
                <Accordion.Body className="accordion-body-subclass">
                  <Link to="/" className="d-block item-category fw-normal">
                    Winogrona
                  </Link>
                  <Link to="" className="d-block item-category fw-normal">
                    Jabłka
                  </Link>
                  <Link to="/" className="d-block item-category fw-normal">
                    Gruszki
                  </Link>
                </Accordion.Body>
              ) : null}
              {showVegetables && open ? (
                <Accordion.Body className="accordion-body-subclass">
                  <Link to="/" className="d-block item-category fw-normal">
                    Pomidory
                  </Link>
                  <Link to="" className="d-block item-category fw-normal">
                    Marchewki
                  </Link>
                  <Link to="/" className="d-block item-category fw-normal">
                    Cebula
                  </Link>
                </Accordion.Body>
              ) : null}
              {showDairy && open ? (
                <Accordion.Body className="accordion-body-subclass">
                  <Link to="/" className="d-block item-category fw-normal">
                    Sery
                  </Link>
                  <Link to="" className="d-block item-category fw-normal">
                    Mleko
                  </Link>
                  <Link to="/" className="d-block item-category fw-normal">
                    Kefiry
                  </Link>
                </Accordion.Body>
              ) : null}
            </Accordion.Item>
          </Accordion>
        </ClickAwayListener>
      </div>

      <div style={preOrder} className="fw-bold">
        Zamów z wyprzedzeniem
        <div style={test}>ICONA</div>
      </div>

      {/* <Link to={`vegetables`} className="text-dark fw-bolder">
        Warzywa
      </Link>
      <Link to={`baking`} className="text-dark fw-bolder">
        Pieczywo
      </Link>
      <Link to={"dairy"} className="text-dark fw-bolder">
        Nabiał
      </Link>
      <Link to={"cold-cuts"} className="text-dark fw-bolder">
        Wędliny
      </Link>
      <Link to={"meat"} className="text-dark fw-bolder">
        Mięsa
      </Link>
      <Link to={"dry-products"} className="text-dark fw-bolder">
        Produkty suche
      </Link>
      <Link to={"delicacies"} className="text-dark fw-bolder">
        Bakalie
      </Link>
      <Link to={"alkohol"} className="alkoholTitle fw-bolder">
        Alkohole
      </Link>
      <Link to={"order in advance"} className="preOrder fw-bolder">
        Zamów z wyprzedzeniem
      </Link>
      <Link to={"other"} className="text-dark fw-bolder">
        Inne
      </Link> */}
    </div>
  );
}

export default ProductsCategory;
