import React, { useState } from "react";
import FolderIcon from "../images/folder_icon.png";
import CloseIcon from "../images/CloseIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { saveImage } from "../actions/adminActions";
import { Layout, Container, BoxUpload, ImagePreview } from "./StyleComponent";

function UploadImage(params) {
  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");

  const dispatch = useDispatch();

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload } = imageRedux;

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }

    // save image in Redux
    const file = e.target.files[0];

    dispatch(saveImage(file));
  };

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
