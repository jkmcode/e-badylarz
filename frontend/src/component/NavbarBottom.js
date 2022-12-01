import React from "react";
import { ReactComponent as Home } from "../icons/Home.svg";
import { ReactComponent as Favorite } from "../icons/Favorite.svg";
import { ReactComponent as Profil } from "../icons/Profil.svg";
import { ReactComponent as Cart } from "../icons/Cart.svg";
import useResponsive from "./useResponsive";

function NavbarBottom() {
  const { windowWidth } = useResponsive();

  return (
    <main>
      {windowWidth < 300 ? (
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
