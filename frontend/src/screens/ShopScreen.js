import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import shopData from "../Data/shopData";
import shopImage from "../images/vegetables.jpg";

import Rating from "../component/Reating";
import ProductCarousel from "../component/ProductCarousel";
import ProductOfTheDaySlider from "../component/ProductOfTheDaySlider";
import ModalGoogleMaps from "../component/ModalGoogleMaps";
import InfoWindow from "../component/infoWindow";

function ShopScreen() {
  const [readMore, setReadMore] = useState(false);
  const [rating, setReting] = useState(5);
  const [numReviews, setNumReviews] = useState(1800);
  const [addReview, setAddReview] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, category, desc, city, street, number } = shopData[0];

  //set rating by user
  const [opinion, setOpinion] = useState(0);
  const [comment, setComment] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  // styling
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isHover, setIsHover] = useState(false);

  // const handleMouseEnter = () => {
  //   setIsHover(true);
  // };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const checkSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  const picture = {
    marginLeft: "1rem",
    marginRight: windowWidth < 768 ? "1rem" : "0rem",
    height: "75vh",
    backgroundColor: "white",
    boxShadow: `3px 3px 5px 0px rgba(0,0,0,0.25)`,
  };

  const shopImg = {
    objectFit: "cover",
    height: "85%",
    width: "100%",
  };

  const shopRating = {
    display: "flex",
    justifyContent: windowWidth < 768 ? "center" : "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    height: "15%",
    width: "100%",
  };

  const shopDetails = {
    marginLeft: windowWidth < 768 ? "1rem" : "0rem",
    marginRight: "1rem",
    height: "70vh",
    backgroundColor: "white",
    overflow: "auto",
    boxShadow: `3px 3px 5px 0px rgba(0,0,0,0.25)`,
  };

  const shopTitle = {
    textAlign: "center",
    fontSize: windowWidth < 768 ? "1.7rem" : `calc(0.8rem + 1.5vw)`,
  };

  const divider = {
    display: "block",
    backgroundColor: "#ddd",
    height: "1px",
    width: "100%",
  };

  const shopCategoty = {
    textAlign: "center",
    fontSize: windowWidth < 768 ? "1.4rem" : `calc(0.4rem + 1.5vw)`,
    color: "grey",
  };

  const shopDesc = {
    fontFamily: "Roboto",
    textAlign: "justify",
    overFlow: "auto",
  };

  const readMoreBtn = {
    color: "#3483eb",
    margin: `0rem`,
    border: "none",
    backgroundColor: "transparent",
  };

  const btnReview = {
    marginLeft: windowWidth >= 500 && "auto",
    borderColor: "transparent",
    color: "white",
    backgroundColor: isHover ? "#ffff1a" : "#f8e825",
    fontSize: "1.1rem",
    fontWeight: "bold",
  };

  const reviewForm = {
    backgroundColor: "white",
    boxShadow: `3px 3px 5px 0px rgba(0,0,0,0.25)`,
    marginLeft: "1rem",
    marginRight: windowWidth < 768 ? "1rem" : "0rem",
  };

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <Row>
        <Col md={7}>
          <div className="mt-4" style={picture}>
            <img style={shopImg} src={shopImage} alt={shopTitle} />
            <div style={shopRating} className="px-3 py-2">
              <Rating
                value={rating}
                text={`${numReviews} reviews`}
                color={"#f8e825"}
              />
              <button
                style={btnReview}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={handleMouseLeave}
                onClick={() => setAddReview(!addReview)}
              >
                Add review
              </button>
            </div>
          </div>
          {addReview && (
            <div style={reviewForm} className="px-3">
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={opinion}
                    onChange={(e) => setOpinion(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    row="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  //disabled={loadingProductReview}
                  type="submit"
                  variant="primary"
                  className="mt-3"
                >
                  Submit
                </Button>
              </Form>
            </div>
          )}
        </Col>
        <Col md={5}>
          <div className="mt-4" style={shopDetails}>
            <div
              style={{ display: "flex", justifyContent: "flex-start" }}
              className="mx-4 my-3"
            >
              <div className="h6 m-0 d-flex align-items-center">
                Adress: {city}, {street} {number}
              </div>
              <ModalGoogleMaps title={`Adres sklepu: ${name}`} body="Mapa" />
            </div>

            <div style={divider}></div>
            <div style={shopTitle}>{name}</div>
            <div className="mt-3" style={shopCategoty}>
              Kategoria: {category}
            </div>
            <p className="m-4" style={shopDesc}>
              {readMore ? desc : `${desc.substring(0, 250)} ...`}
              <button
                style={readMoreBtn}
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "read less" : "read more"}
              </button>
            </p>
          </div>
        </Col>
      </Row>
      <ProductCarousel />
      <ProductOfTheDaySlider />
    </>
  );
}

export default ShopScreen;
