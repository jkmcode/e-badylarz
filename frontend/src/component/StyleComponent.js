import React from "react";
import styled from "styled-components";
//style
// https://github.com/rodriguesabner/ImagePreview-React/blob/main/src/App.js

export const Layout = styled.div`
  margin-top: 1rem;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 12px 24px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 20px;
  text-align: center;
  p {
    margin-top: -10px;
    color: #777;
  }
`;

export const BoxUpload = styled.div`
  display: grid;
  margin-top: 20px;
  place-items: center;
  border: 1px dashed #799cd9;
  position: relative;
  height: 200px;
  width: 200px;
  background: #fbfbff;
  border-radius: 20px;
  .image-upload {
    display: flex;
    flex-wrap: wrap;
    label {
      cursor: pointer;

      :hover {
        opacity: 0.8;
      }
    }
    > input {
      display: none;
    }
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  /* cursor: pointer; */
  #uploaded-image {
    height: 150px;
    width: 150px;
    object-fit: cover;
    border-radius: 20px;
  }
  .close-icon {
    background: #000;
    border-radius: 5px;
    opacity: 0.8;
    position: absolute;
    z-index: 10;
    right: -15px;
    top: -20px;
    cursor: pointer;
    :hover {
      opacity: 1;
    }
  }
`;
