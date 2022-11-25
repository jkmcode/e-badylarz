import React, { useState, useRef } from "react";
import Carousel from "react-elastic-carousel";
import BookData from "../Data/data.json";
import { ReactComponent as Favorite } from "../icons/Favorite.svg";

//https://sag1v.github.io/react-elastic-carousel/onChange

// Należy zmieić strukture danych w data.json na poprzednią. My w tym casie musimy tylko zmienić zdjęcie.
// Trzeba przenieść zmienną INDEX między komponentami za pomocą propsów (sposób --- Toglowanie)
// Jeżeli index będzie na 1 to wyslwietli odpowiednie dane, jeżlei index równa jest to to kolejne itp.

function ProductCarousel() {
  const [slideIndex, setSlideIndex] = useState(2);
  const [slideIndexDot, setSlideIndexDot] = useState(1);
  const [data, setData] = useState(BookData);

  console.log("data.lenght", data.length);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  const carouselRef = useRef();

  const goto = () => {
    carouselRef.current.goTo(0);
  };

  // function slideIndexHandler(id) {
  //   BookData.map((i) => {
  //     i.map((k) => {
  //       if (k.id === id) {
  //         console.log(k.index);
  //         if (k.index === 1) {
  //           console.log("spełniam pierwszy warunek");
  //           setSlideIndex(2);
  //         } else {
  //           console.log("spełniam drugi warunek");
  //           setSlideIndex(1);
  //         }
  //       }
  //     });
  //   });
  // }

  function slideIndexHandler(id, index) {
    const newBookData = [...BookData];
    newBookData.map((i) => {
      if (i.id === id) {
        const seletedItem = newBookData.find((item) => item.id === id);
        seletedItem.seleted = !seletedItem.seleted;

        if (index + 1 === 1) {
          seletedItem.index = 1;
        } else if (index + 1 === 2) {
          seletedItem.index = 2;
        }

        //seletedItem.index = !seletedItem.index;
        setData(newBookData);
      }
    });
  }

  return (
    <div className="d-flex justify-content-center">
      <Carousel
        ref={carouselRef}
        className="mt-5 w-80 "
        breakPoints={breakPoints}
        activeColor={"blue"}
        easing="cubic-bezier(1,.15,.55,1.54)"
        tiltEasing="cubic-bezier(.95,.01,0,1)"
        enableAutoPlay
        autoPlaySpeed={4000}
        onChange={(currentItem, pageIndex) =>
          setTimeout(() => {
            return pageIndex === data.length - 6 ? goto() : null;
          }, 4000)
        }
      >
        {/* {BookData.map((i) =>
          i.map(
            (k, index) =>
              slideIndex === index + 1 && (
                <CarouselItem
                  key={k.id}
                  id={k.id}
                  name={k}
                  onClick={slideIndexHandler}
                  slideIndex={slideIndex}
                />
              )
          )
        )} */}
        {/* {BookData.map((i, key) => {
          <CarouselItem
            key={i.id}
            name={title}
            onClick={slideIndexHandler}
            slideIndex={slideIndex}
          />;
        })} */}
        {data.map((i, key) => (
          <CarouselItem
            title={i.title}
            id={i.id}
            key={i.id}
            onClick={slideIndexHandler}
            slideIndex={slideIndex}
            selected={i.seleted}
            indexItem={i.index}
          />
        ))}
      </Carousel>
    </div>
  );
}

function CarouselItem({ title, id, selected, onClick, slideIndex, indexItem }) {
  const [favoriteActive, setFavoriteActive] = useState(false);
  //const [slideIndex, setSlideIndex] = useState(1);

  // const moveDot = (index) => {
  //   setSlideIndex(index);
  // };

  //console.log("slideIndexDot", slideIndexDot);

  const activeFavorite = () => {
    setFavoriteActive(!favoriteActive);
  };

  const activeProduct = () => {
    console.log("activeProduct");
  };

  return (
    <>
      <div
        className={selected ? "item" : "item active"}
        onClick={activeProduct}
      >
        <div className="carouselItem">
          {title}, {id}
        </div>
        <Favorite
          className={
            favoriteActive ? "favoriteColorChange svg-test" : "svg-test"
          }
          onClick={activeFavorite}
        />
        <div className="container-dots">
          {Array.from({ length: 2 }).map((item, index) => (
            <div
              onClick={() => onClick(id, index)}
              className={indexItem === index + 1 ? "dot active" : "dot"}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductCarousel;
