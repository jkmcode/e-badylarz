import React, { useState } from "react";
import fakeData from "../Data/fakeData";
import { Icon } from "@iconify/react";

function ProductOfTheDaySlider() {
  const [people, setPeople] = useState(fakeData);
  const [index, setIndex] = useState(0);
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
  };

  const sectionCenter = {
    position: "relative",
    margin: "0 auto",
    marginTop: "4rem",
    height: "450px",
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
    posotion: "absolute",
    top: "200px",
    transform: "translateY(-50%)",
    color: "brown",
    width: "1.25rem",
    height: "1.25rem",
    display: "grid",
    placeItems: "center",
    borderColor: "transparent",
    fontSize: "1rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: `all 0.3s linear`,
  };

  const nextBtn = {
    ...slideBtn,
    background: isHoverBtnNext ? "yellow" : "black",
    left: "0",
  };

  const prevBtn = {
    ...slideBtn,
    background: isHoverBtnPrev ? "orange" : "white",
    right: "0",
  };

  const slide = {
    position: "absolute",
    top: "0",
    left: "0",
    left: "0",
    width: "100%",
    height: "100%",
    //opacity: "0",
    transition: `all 0.3s linear`,
  };

  return (
    <section style={slideSection}>
      <div style={slideTitle}>
        <div className="h2">Produkt dnia</div>
      </div>

      <div style={sectionCenter}>
        {people.map((person, indexPerson) => {
          const { id, image, name, title, quote } = person;
          return (
            <article style={slide} key={id}>
              <img src={image} alt={name} style={slideImage} />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
            </article>
          );
        })}
        <button
          style={nextBtn}
          //className="next"
          onClick={() => setIndex(index - 1)}
          onMouseEnter={() => setIsHoverBtnNext(true)}
          onMouseLeave={() => setIsHoverBtnNext(false)}
        >
          <Icon icon="bi:arrow-left" />
        </button>
        <button
          style={prevBtn}
          //className="prev"
          onClick={() => setIndex(index + 1)}
          onMouseEnter={() => setIsHoverBtnPrev(true)}
          onMouseLeave={() => setIsHoverBtnPrev(false)}
        >
          <Icon icon="bi:arrow-right" />
        </button>
      </div>
    </section>
  );
}

export default ProductOfTheDaySlider;
