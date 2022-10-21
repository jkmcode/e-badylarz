import React, { useState, useEffect } from "react";
import { ReactComponent as Home } from "../icons/Home.svg";
import { ReactComponent as Favorite } from "../icons/Favorite.svg";
import { ReactComponent as Profil } from "../icons/Profil.svg";
import { ReactComponent as Cart } from "../icons/Cart.svg";

function NavbarBottom() {
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

  return (
    <main>
      {windowWidth < 600 ? (
        <div className="margin-not-overlap">
          <nav className="navbar-bottom fixed-bottom">
            <ul className="navbarBottomNav">
              <li className="nav-bottom-item">
                <a href="##bbbbb">
                  <Home />
                </a>
              </li>
              <li className="nav-bottom-item">
                <a href="#">
                  <Favorite />
                </a>
              </li>
              <li className="nav-bottom-item">
                <a href="#">
                  <Profil />
                </a>
              </li>
              <li className="nav-bottom-item">
                <a href="#">
                  <Cart />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </main>
  );
}

export default NavbarBottom;
