import React, { useEffect, useState } from "react";
import fakeData from "../Data/fakeData";
import { Icon } from "@iconify/react";
import useResponsive from "./useResponsive";

function ProductOfTheDaySlider() {
  const [people, setPeople] = useState(fakeData);
  const [index, setIndex] = useState(0);
  const { windowWidth } = useResponsive();

  useEffect(() => {
    if (index > people.length - 1) {
      setIndex(0);
    }
    if (index < 0) {
      setIndex(people.length - 1);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 4000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  //styling

  const [isHoverBtnPrev, setIsHoverBtnPrev] = useState(false);
  const [isHoverBtnNext, setIsHoverBtnNext] = useState(false);

  const slideSection = {
    width: "90vw",
    margin: "5rem auto",
    maxWidth: "800px",
  };

  const slideTitle = {
    marginBottom: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  };

  const sectionCenter = {
    position: "relative",
    margin: "0 auto",
    marginTop: "4rem",
    height: "350px",
    maxWidth: "800px",
    textAlign: "center",
    display: "flex",
    overflow: "hidden",
  };

  const slideImage = {
    borderRadius: "50%",
    marginBottom: "1rem",
    width: "150px",
    height: "150px",
    objectFit: "cover",
  };

  const slideBtn = {
    position: "absolute",
    top: "30%",
    transform: "translateY(-50%)",
    color: "white",
    width: windowWidth < 768 ? "2.2rem" : "1.9rem",
    height: windowWidth < 768 ? "2.2rem" : "1.9rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    fontSize: "1rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: `all 0.3s linear`,
  };

  const nextBtn = {
    ...slideBtn,
    background: isHoverBtnNext ? "hsl(21, 62%, 45%)" : "hsl(210, 22%, 49%)",
    left: "0",
  };

  const prevBtn = {
    ...slideBtn,
    background: isHoverBtnPrev ? "hsl(21, 62%, 45%)" : "hsl(210, 22%, 49%)",
    right: "0",
  };

  const slide = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    opacity: "0",
    transition: `all 0.8s ease`,
  };

  const activeSlide = {
    ...slide,
    transform: `translateX(0)`,
    opacity: "1",
  };

  const nextSlide = {
    ...slide,
    transform: `translateX(100%)`,
  };

  const lastSlide = {
    ...slide,
    transform: `translateX(-100%)`,
  };

  const productTitle = {
    textTransform: "uppercase",
    fontWeight: "500",
    marginBottom: "0",
  };

  const productName = {
    letterSpacing: " 0.1rem",
    textTransform: "uppercase",
    lineHeight: "1.25",
    marginBottom: "0.75rem",
    color: "hsl(21, 62%, 45%)",
  };

  const text = {
    maxWidth: "35em",
    margin: "0 auto",
    marginTop: "1rem",
    lineHeight: "2",
    color: "hsl(210, 22%, 49%)",
  };

  return (
    <section style={slideSection}>
      <div style={slideTitle}>
        <div className="h2">Produkt dnia</div>
      </div>

      <div style={sectionCenter}>
        {people.map((person, indexPerson) => {
          const { id, image, name, price, quote } = person;

          let position = nextSlide;

          if (indexPerson === index) {
            position = activeSlide;
          }

          if (
            indexPerson === index - 1 ||
            (index === 0 && indexPerson === people.length - 1)
          ) {
            position = lastSlide;
          }

          return (
            <article style={position} key={id}>
              <img src={image} alt={name} style={slideImage} />
              <h4 style={productName}>{name}</h4>
              <p style={productTitle}>{price}</p>
              <p style={text}>{quote}</p>
            </article>
          );
        })}
        <button
          onClick={() => setIndex(index - 1)}
          onMouseEnter={() => setIsHoverBtnNext(true)}
          onMouseLeave={() => setIsHoverBtnNext(false)}
          style={nextBtn}
        >
          <Icon icon="dashicons:arrow-left-alt2" />
        </button>
        <button
          onClick={() => setIndex(index + 1)}
          onMouseEnter={() => setIsHoverBtnPrev(true)}
          onMouseLeave={() => setIsHoverBtnPrev(false)}
          style={prevBtn}
        >
          <Icon icon="dashicons:arrow-right-alt2" />
        </button>
      </div>
    </section>
  );
}

export default ProductOfTheDaySlider;
