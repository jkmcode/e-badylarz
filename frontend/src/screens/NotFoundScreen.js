import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px;
  border: 2px solid blue;
  border-radius: 4px;
  background-color: green;
  margin: 10px;
`;

const H1 = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const Nav = styled.main`
  background-color: green;
`;

function NotFoundScreen() {
  return (
    <Nav>
      <H1>Coś</H1>
    </Nav>
  );
}

export default NotFoundScreen;
