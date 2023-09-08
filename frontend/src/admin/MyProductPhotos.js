import React, { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import DotsLoader from "../component/DotsLoader";
import InfoAlertComponent from "../component/InfoAlertComponent";
import noImage from "../images/noImage.png";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { THREE } from "../constants/environmentConstans";
import ErrorMesageRedux from "./ErrorMesageRedux"
import { Icon } from "@iconify/react";
import UploadImage from "../component/UploadImage";
import {
  InsertImageMyProduct,
  addImageMyProduct,
  getImageMyProduct,
  deleteMyProductPhoto
} from "../actions/productActions";

import { DELETE_IMAGE_REDUX } from "../constants/adminConstans";
import {
  ADD_IMAGE_MY_DELETE,
  UPDATE_IMAGE_MY_DELETE,
  DELETE_MY_IMAGE_DELETE,
  GET_MY_IMAGE_DELETE,
} from "../constants/productConstans"
import {
  tableCellNoBorderRight,
  productsStyleHeader,
  FormLayout,
  btnInfo,
} from "./AdminCSS";

function MyProductPhotos() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();

  const shopId = params.idShop;
  const spotId = params.idSpot;
  const nameProduct = params.productName
  const IdMyProduct = params.idMyProd

  //variables

  const [myImageList, setMyImageList] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [photo, setPhoto] = useState();
  const [photoId, setPhotoId] = useState();
  const [deletePhotoId, setDeletePhotoId] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [showErroraddMyImage, setShowErroraddMyImage] = useState(false);
  const [showErrorUploadMyImage, setShowErrorUploadMyImage] = useState(false);


  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const imageRedux = useSelector((state) => state.saveImage);
  const { imageUpload, isImage } = imageRedux;

  const addImagetRedux = useSelector((state) => state.addMyImage);
  const {
    loading: loadingAddMyImage,
    error: errorAddMyImage,
    success: succesAddMyImage,
    result: resultAddMyImage,
  } = addImagetRedux;

  const uploadImagetRedux = useSelector((state) => state.uploadMyImage);
  const {
    loading: loadingUploadMyImage,
    error: errorUploadMyImage,
    success: succesUploadMyImage,
    result: resultUploadMyImage,
  } = uploadImagetRedux;

  const getImagetRedux = useSelector((state) => state.getMyImage);
  const {
    loading: loadingGetMyImage,
    error: errorGetMyImage,
    success: succesGetMyImage,
    result: resultGetMyImage,
  } = getImagetRedux;

  const delImagetRedux = useSelector((state) => state.deleteMyImage);
  const {
    loading: loadingDeleteMyImage,
    error: errorDeleteMyImage,
    success: succesDeleteMyImage,
    result: resultDeleteMyImage,
  } = delImagetRedux;

  // Handlers

  const closeError = () => {
    if (showErroraddMyImage) {
      dispatch({ type: ADD_IMAGE_MY_DELETE });
      setShowErroraddMyImage(false)
    }
    else if (showErrorUploadMyImage) {
      dispatch({ type: UPDATE_IMAGE_MY_DELETE });
      setShowErrorUploadMyImage(false)
    }
  }

  const showMyPhoto = (i) => {
    if (i.id == photoId) {
      setShowImage(false)
      setPhotoId(0)
    } else {
      setShowImage(true)
      setPhotoId(i.id)
      setPhoto(i.photo)
    }
  };

  const confirmYes = () => {
    setShowAlert(false);
    setConfirm(true);
  };

  const confirmNo = () => {
    setShowAlert(false);
    setConfirm(false);
  };

  const deleteMyPhoto = (i) => {
    setDeletePhotoId(i.id)
    setShowAlert(true);
    setShowImage(false)
  };

  //Comment
  // Ta funkcja zeruje stany:
  // 1. zdjęcie w Redux
  // 2. sukces w addMyImage
  // 3. uruchomienie zaciagniecia z bazy zdjęć dla produktu na starcie
  useEffect(() => {
    dispatch({ type: DELETE_IMAGE_REDUX });
    dispatch({ type: ADD_IMAGE_MY_DELETE });
    dispatch(
      getImageMyProduct(IdMyProduct)
    );
  }, []);

  // ustawienie flagi błędu
  useEffect(() => {
    if (errorAddMyImage) {
      setShowErroraddMyImage(true)
    }
    if (errorUploadMyImage) {
      setShowErrorUploadMyImage(true)
    }
  }, [errorAddMyImage, errorUploadMyImage]);

  // jeśli jest sukces pobrania danych o zdjęciach dla produktu to
  // 1. ustawienie listy zdjęć
  useEffect(() => {
    if (succesGetMyImage) {
      setMyImageList(resultGetMyImage)
      dispatch({ type: GET_MY_IMAGE_DELETE });
    }
  }, [succesGetMyImage]);

  // add photo
  useEffect(() => {
    if (isImage) {
      dispatch(
        addImageMyProduct({
          Id: IdMyProduct,
          user: userInfo.id
        })
      );
    }
  }, [dispatch, isImage]);

  // update image
  useEffect(() => {
    if (isImage & succesAddMyImage) {
      dispatch(
        InsertImageMyProduct({
          imageUpload: imageUpload,
          IdFhoto: resultAddMyImage[0].id,
          Id: IdMyProduct,
        })
      );
    }
  }, [dispatch, succesAddMyImage]);

  // A. jeśli jest sukces dodania zdjęcia do rekordu to
  // 1. zerowanie image w Redux
  // 2. ustawienie nowej listy zdjęć
  // B. jeśli jest sukces kasowania zdjęcia to ustalenie nowej listy zdjęć
  useEffect(() => {
    if (succesUploadMyImage) {
      dispatch({ type: DELETE_IMAGE_REDUX });
      setMyImageList(resultUploadMyImage)
      dispatch({ type: UPDATE_IMAGE_MY_DELETE });
    }
    if (succesDeleteMyImage) {
      setMyImageList(resultDeleteMyImage)
      dispatch({ type: DELETE_MY_IMAGE_DELETE });
    }
  }, [dispatch, succesUploadMyImage, succesDeleteMyImage]);

  // Delete Photo from my photos
  useEffect(() => {
    if (confirm) {
      dispatch(
        deleteMyProductPhoto({
          Id: deletePhotoId,
          user: userInfo.id,
          IdProduct: IdMyProduct
        })
      );
    }
    setConfirm(false);
  }, [dispatch, confirm]);

  /************************STYLE*****************************/

  const mainTableContainer = {
    overflowY: "auto",
    maxHeight: "50vh",
    marginTop: "1rem",
  };

  const tableStyle = {
    width: "100%",
    marginTop: "1rem",
  };

  const tableSubcatProductStyle = {
    ...tableStyle,
    color: "black",
    backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(227, 227, 232, 1) 100%)`,
  };

  /************************TABLE STYLE *****************************/

  const tableConatctcolumns = [
    {
      key: "name",
      label: t("My_image_name"),
      styleTableCell: tableCellNoBorderRight,
      styleHeader: productsStyleHeader,
    },
    {
      key: "btn",
      label: "",
      styleTableCell: tableCellNoBorderRight,
      styleHeader: productsStyleHeader,
    },

  ];

  const dataMyProductsTable = myImageList.map((item) => ({
    id: item.id,
    name: (
      <>
        {item.photo ? (
          <img
            style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
            src={item.photo}
          />
        ) : (
          <img
            style={{ width: "50px", marginRight: "1rem", borderRadius: "10%" }}
            src={noImage}
          />
        )}
      </>
    ),
    btn: (
      <>
        <button
          style={{ ...btnInfo, marginRight: "1rem", color: "green" }}
          onClick={() => showMyPhoto(item)}
        >
          <Icon
            icon="teenyicons:search-property-outline"
            width="24"
            height="24"
          />

          {/* {t("btn_my_description")} */}
        </button>
        <button
          style={{ ...btnInfo, marginRight: "1rem", color: "red" }}
          onClick={() => deleteMyPhoto(item)}
        >
          <Icon
            icon="teenyicons:x-circle-outline"
            width="24"
            height="24"
          />
          {/* {t("btn_my_description")} */}
        </button>
      </>
    ),

  }));

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        marginTop: "1rem",
        padding: "2rem",
        borderRadius: "0.5rem",
        minHeight: "50vh",
      }}
    >
      <Link
        to={{ pathname: `/dashboard/shops/spot/${shopId}/edit/${spotId}` }}
        style={{ color: "black" }}
      >
        <Icon icon="ion:arrow-back" />
        {t("btn-return")}
      </Link>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            fontSize: "calc(1.1rem + 0.3vw)",
            fontWeight: "500",
            margin: "0.4rem",
          }}
        >
          {t("MyProductPhotos_title")}
          {nameProduct}
        </div>
      </div>
      {showAlert && (
        <InfoAlertComponent
          confirmYes={confirmYes}
          confirmNo={confirmNo}
          context={t("AdminShops_inactivate_shop_InfoWindow_body")}
        />
      )}
      {showErroraddMyImage ?
        <ErrorMesageRedux
          confirmYes={closeError}
          error={errorAddMyImage}
        />
        :
        showErrorUploadMyImage ?
          <ErrorMesageRedux
            confirmYes={closeError}
            error={errorUploadMyImage}
          />
          : null}
      <FormLayout col={THREE}>
        {loadingGetMyImage || loadingUploadMyImage ||
          loadingAddMyImage || loadingDeleteMyImage ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DotsLoader />
          </div>
        ) : (
          <TableComponent
            data={dataMyProductsTable}
            columns={tableConatctcolumns}
            tableStyle={tableSubcatProductStyle}
            mainTableContainer={mainTableContainer}
          />
        )}
        {showImage ?
          <>
            <img
              style={{ width: "300px", margin: "2rem", borderRadius: "10%" }}
              src={photo}
            />
          </>
          :
          <>
            <p
              style={{ margin: "5rem" }}
            >
              {t("show_my_photo")}
            </p>

          </>
        }
        <UploadImage />
      </FormLayout>
    </div>
  );
}

export default MyProductPhotos;
