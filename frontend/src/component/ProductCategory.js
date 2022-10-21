import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCategory() {
  return (
    <Accordion defaultActiveKey="0" className="w-15">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Kategorie sklepu</Accordion.Header>
        <Accordion.Body>
          <Link to="/" className="d-block item-category fw-bold">
            Owoce
          </Link>
          <Link to="" className="d-block item-category fw-bold">
            Warzywa
          </Link>
          <Link to="/" className="d-block item-category fw-bold">
            Pieczywo
          </Link>
          <Link to="/" className="d-block item-category fw-bold">
            Nabiał
          </Link>
          <Link to="/" className="d-block item-category fw-bold">
            Wędliny
          </Link>
          <Link to="/" className="d-block item-category fw-bold">
            Mięsa
          </Link>
          <Link to="/" className="d-block item-category fw-bold">
            Produkty suche
          </Link>
          <Link to="/" className="d-block item-category fw-bold">
            Bakalie
          </Link>
          <Link to="/" className="d-block item-category fw-bold">
            Alkohole
          </Link>
          <Link to="/" className="d-block item-category fw-bold">
            Zamów z wyprzedzeniem
          </Link>
          <Link to="/" className="d-block item-category fw-bold">
            Inne
          </Link>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ProductCategory;
