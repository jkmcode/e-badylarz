import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import BookData from "../Data/data.json";
import { Button } from "react-bootstrap";
import { ReactComponent as Favorite } from "../icons/Favorite.svg";

//https://sag1v.github.io/react-elastic-carousel/onChange

function ProductCarousel() {
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 5 },
  ];

  console.log(BookData);

  return (
    <>
      <Carousel
        className="mt-5"
        breakPoints={breakPoints}
        activeColor={"blue"}
        easing="cubic-bezier(1,.15,.55,1.54)"
        tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
      >
        {BookData.map((i, key) => (
          <CarouselItem name={i} key={i.title} />
        ))}
      </Carousel>
      ;
    </>
  );
}

function CarouselItem(props) {
  const [favoriteActive, setFavoriteActive] = useState(false);
  //favoriteColorChange

  const activeFavorite = () => {
    console.log(props.name.title);
    setFavoriteActive(!favoriteActive);
  };

  const activeProduct = () => {
    console.log("activeProduct");
  };

  return (
    <>
      <div className="item" onClick={activeProduct}>
        <div className="carouselItem">{props.name.title}</div>
      </div>
      {/* <Button className="rounded" onClick={activeFavorite}>
        OK
      </Button> */}
      <Favorite
        className={favoriteActive ? "favoriteColorChange svg-test" : "svg-test"}
        onClick={activeFavorite}
      />
    </>
  );
}

export default ProductCarousel;
