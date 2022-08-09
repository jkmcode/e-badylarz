import React from "react";

function UserNavbarTop() {
  return <Navbar></Navbar>;

  function Navbar(props) {
    return (
      <nav className="navBarTopUser">
        <ul className="navbarTop-nav">{props.children}</ul>
      </nav>
    );
  }
}

export default UserNavbarTop;
