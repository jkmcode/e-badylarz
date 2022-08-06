import React from "react";
import Logo from "../images/Logo.png";

function AboutUsScreeen() {
  // Style
  const background = {
    backgroundColor: "beige",
  };

  const textInfo = {
    fontFamily: "Open Sans",
    textAlign: "justify",
    fontSize: "20px",
    fontWeight: "300",
  };

  const textTitle = {
    fontFamily: "Frank Ruhl Libre",
    fontWeight: "900",
  };

  const imgLogo = {
    width: "300px",
  };

  const searchAreaBtn = {
    color: "white",
    backgroundColor: "#207B00",
    border: "none",
  };

  return (
    <div style={background}>
      <h3 style={textTitle} className="text-center pt-5">
        O nas
      </h3>
      <p style={textInfo} className="px-5">
        Zajmujemy się sprzedażą żywności rzemieślniczej od lokalnych rolników i
        producentów. Jesteśmy firmą, której misją jest zapewnienie naszym
        klientom jak najlepszych wrażeń z dokonanych przez nich zakupów. Naszym
        hasłem przewodnim jest świeżo na czas. Wspieramy lokalnych
        przedsiębiorców oraz ułatwiamy im sprzedaż poprzez wprowadzenie ich
        wyjątkowego asortymentu manofakturowego do naszej aplikacji.
        Opracowaliśmy odpowiedni system realizowania zamówień dzięki, któremu
        jesteśmy w stanie dostarczyć zakupy nawet tego samego dnia. Obecnie
        działamy na terenie Chrzanowa, Trzebini, Jaworzna, Libiąża oraz
        okolicznych miejscowości.
      </p>
      <div className="d-flex justify-content-center">
        <img style={imgLogo} src={Logo} />
      </div>
      <p style={textInfo} className="px-5 mt-3">
        Jesteś przedsiębiorcom szukającym zbytu dla swoich wyjątkowych
        rzemieślniczych produktów ? Zostaw nam namiar na siebie
      </p>
      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="rounded my-3 w-60 p-3"
          style={searchAreaBtn}
        >
          Formularz partnerski
        </button>
      </div>
    </div>
  );
}

export default AboutUsScreeen;
