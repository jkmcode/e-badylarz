import React, { useState } from "react";
import styled from "styled-components";
import FolderIcon from "../images/folder_icon.png";
import CloseIcon from "../images/CloseIcon.svg";

function UploadImage() {
  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }

    // add photo to DB
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();

    formData.append("image", file);

    //setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // const { data } = await axios.post(
      //   "/api/products/upload/",
      //   formData,
      //   config
      // );
      // setMsg(true);
      // setImage(data.image);
      // setUploading(false);
      // setMsgTextUpload(data.text);
    } catch (error) {
      //setUploading(false);
      console.log("aaaaaa");
    }
  }

  //style
  // https://github.com/rodriguesabner/ImagePreview-React/blob/main/src/App.js

  const Layout = styled.div`
    margin-top: 1rem;
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
  `;

  const Container = styled.div`
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

  const BoxUpload = styled.div`
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

  const ImagePreview = styled.div`
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

  return (
    <Layout>
      <Container>
        <BoxUpload>
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 100, height: 100 }}
                  />
                  <p style={{ color: "#444" }}>Click to upload image</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <ImagePreview>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded(false);
                    setImage(null);
                  }}
                />
                {typeFile.includes("video") ? (
                  <video
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"
                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    alt="uploaded-img"
                  />
                )}
              </ImagePreview>
            )}
          </div>
        </BoxUpload>

        {isUploaded ? <h6>Type is {typeFile}</h6> : null}
      </Container>
    </Layout>
  );
}

export default UploadImage;
