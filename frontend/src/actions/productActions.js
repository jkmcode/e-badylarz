import axios from "axios";
import {
  errorHandling,
  addToLS,
  addLogError,
  addLogErrorFromLS
} from "./errorHandling";
import {
  SORT_BY_LNG_REQUEST,
  SORT_BY_LNG_SUCCESS,
  SORT_BY_LNG_FAIL,
  ADD_PRODUCT_CAT_REQUEST,
  ADD_PRODUCT_CAT_SUCCESS,
  ADD_PRODUCT_CAT_FAIL,
  ADD_PRODUCT_SUBCAT_REQUEST,
  ADD_PRODUCT_SUBCAT_SUCCESS,
  ADD_PRODUCT_SUBCAT_FAIL,
  GET_PRODUCT_CAT_LIST_REQUEST,
  GET_PRODUCT_CAT_LIST_SUCCESS,
  GET_PRODUCT_CAT_LIST_FAIL,
  GET_PRODUCT_SUBCAT_LIST_REQUEST,
  GET_PRODUCT_SUBCAT_LIST_SUCCESS,
  GET_PRODUCT_SUBCAT_LIST_FAIL,
  GET_PRODUCT_SUBCAT_REQUEST,
  GET_PRODUCT_SUBCAT_SUCCESS,
  GET_PRODUCT_SUBCAT_FAIL,
  EDIT_PRODUCT_SUBCAT_REQUEST,
  EDIT_PRODUCT_SUBCAT_SUCCESS,
  EDIT_PRODUCT_SUBCAT_FAIL,
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  SEARCH_SELECTED_LNG,
  SEARCH_SELECTED_CATEGORY,
  SEARCH_SELECTED_SUBCATEGORY,
  SEARCH_SELECTED_DELETE_NO_LNG,
  GET_MYPRODUCT_LIST_REQUEST,
  GET_MYPRODUCT_LIST_SUCCESS,
  GET_MYPRODUCT_LIST_FAIL,
  ADD_MYPRODUCT_REQUEST,
  ADD_MYPRODUCT_SUCCESS,
  ADD_MYPRODUCT_FAIL,
  ADD_MY_IMAGE_REQUEST,
  ADD_IMAGE_MY_SUCCESS,
  ADD_IMAGE_MY_FAIL,
  UPDATE_MY_IMAGE_REQUEST,
  UPDATE_IMAGE_MY_SUCCESS,
  UPDATE_IMAGE_MY_FAIL,
  GET_MY_IMAGE_REQUEST,
  GET_MY_IMAGE_SUCCESS,
  GET_MY_IMAGE_FAIL,
  DELETE_MY_IMAGE_REQUEST,
  DELETE_MY_IMAGE_SUCCESS,
  DELETE_MY_IMAGE_FAIL,
  DELETE_MY_PRODUCT_REQUEST,
  DELETE_MY_PRODUCT_SUCCESS,
  DELETE_MY_PRODUCT_FAIL,
  ADD_OFFER_REQUEST,
  ADD_OFFER_SUCCESS,
  ADD_OFFER_FAIL,
  GET_MYOFFERS_LIST_REQUEST,
  GET_MYOFFERS_LIST_SUCCESS,
  GET_MYOFFERS_LIST_FAIL,
  DELETE_MYOFFERS_REQUEST,
  DELETE_MYOFFERS_SUCCESS,
  DELETE_MYOFFERS_FAIL,
  ADD_QUANTITY_OFFER_REQUEST,
  ADD_QUANTITY_OFFER_SUCCESS,
  ADD_QUANTITY_OFFER_FAIL,
  GET_MYOFFER_REQUEST,
  GET_MYOFFER_SUCCESS,
  GET_MYOFFER_FAIL,
  UPDATE_SPOT_PICK_UP_REQUEST,
  UPDATE_SPOT_PICK_UP_SUCCESS,
  UPDATE_SPOT_PICK_UP_FAIL,
} from "../constants/productConstans";

import {
  TIMEOUT_updateSpotPickUp,
  TIMEOUT_deleteMyProduct,
  TIMEOUT_getMyproduct,
  TIMEOUT_getMyOffersPrice,
  TIMEOUT_addQuantityOffer,
  TIMEOUT_deleteMyOffers,
  TIMEOUT_getMyOffers,
  TIMEOUT_addOffer,
  TIMEOUT_addImageMyProduct,
  TIMEOUT_InsertImageMyProduct
} from "../constants/timeoutConstans"

export const updateSpotPickUp = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {

    dispatch({ type: UPDATE_SPOT_PICK_UP_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_updateSpotPickUp
    };
    const { data } = await axios.put(`/api/update-pick-up/`, insertData, config);

    dispatch({
      type: UPDATE_SPOT_PICK_UP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: UPDATE_SPOT_PICK_UP_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Aktualizacja punktu odbioru",
      "function": "updateSpotPickUp",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const deleteMyProduct = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {

    dispatch({ type: DELETE_MY_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_deleteMyProduct
    };
    const { data } = await axios.put(`/api//delete-my-product/`, insertData, config);

    dispatch({
      type: DELETE_MY_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: DELETE_MY_PRODUCT_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Kasowaanie mojego produktu",
      "function": "deleteMyProduct",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getMyproduct = (spotId) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_MYPRODUCT_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getMyproduct
    };

    const { data } = await axios.get(`/api/${spotId}/get-myproduct/`, config);

    dispatch({
      type: GET_MYPRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_MYPRODUCT_LIST_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobranie moich produktów",
      "function": "getMyproduct",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getMyOffersPrice = (spotId) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_MYOFFER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getMyOffersPrice
    };

    const { data } = await axios.get(`/api/${spotId}/get-myoffers-price/`, config);

    dispatch({
      type: GET_MYOFFER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_MYOFFER_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobór cenówki dla wybranej oferty - informacja o ofercie",
      "function": "getMyOffers",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const addQuantityOffer = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ADD_QUANTITY_OFFER_REQUEST });



    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_addQuantityOffer
    };

    const { data } = await axios.put(`/api/add-quantity-myoffers/`, insertData, config);

    dispatch({
      type: ADD_QUANTITY_OFFER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_QUANTITY_OFFER_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "text": "zwiekszenie ilosci aktywnej oferty",
      "function": "addQuantityOffer",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const deleteMyOffers = (insertData) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: DELETE_MYOFFERS_REQUEST });



    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_deleteMyOffers
    };

    const { data } = await axios.put(`/api/delete-myoffers/`, insertData, config);

    dispatch({
      type: DELETE_MYOFFERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: DELETE_MYOFFERS_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Kasowanie manualne oferty",
      "function": "deleteMyOffers",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const getMyOffers = (spotId) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_MYOFFERS_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_getMyOffers
    };

    const { data } = await axios.get(`/api/${spotId}/get-myoffers/`, config);

    dispatch({
      type: GET_MYOFFERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: GET_MYOFFERS_LIST_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "Pobór aktywnych ofert dla okreslonego punktu sprzedaży",
      "function": "getMyOffers",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};


export const addOffer = (insertData) => async (dispatch, getState) => {

  dispatch(addLogErrorFromLS())
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: ADD_OFFER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_addOffer
    };

    const { data } = await axios.put(`/api/add-offer/`,
      insertData,
      config
    )

    dispatch({
      type: ADD_OFFER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_OFFER_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "dodanie nowej oferty",
      "function": "addOffer",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const deleteMyProductPhoto = (insertData) => async (dispatch, getState) => {
  try {

    dispatch({ type: DELETE_MY_IMAGE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api//delete-my-image/`, insertData, config);

    dispatch({
      type: DELETE_MY_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MY_IMAGE_FAIL,
      payload: errorHandling(error)
    });
  }
};


export const getImageMyProduct = (myProductId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_IMAGE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/${myProductId}/get-my-image/`, config);

    dispatch({
      type: GET_MY_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MY_IMAGE_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const addImageMyProduct = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ADD_MY_IMAGE_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_addImageMyProduct
    };

    const { data } = await axios.put(
      `/api/add-myproduct-image/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_IMAGE_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_IMAGE_MY_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "dodanie nowego obiektu zdjecia do mojego produktu",
      "function": "addImageMyProduct",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const InsertImageMyProduct = (insertData) => async (dispatch, getState) => {

  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const formData = new FormData();
    formData.append("image", insertData.imageUpload);
    formData.append("IdFhoto", insertData.IdFhoto);
    formData.append("Id", insertData.Id);

    dispatch({ type: UPDATE_MY_IMAGE_REQUEST });


    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      timeout: TIMEOUT_InsertImageMyProduct
    };
    const { data } = await axios.put(`/api/upload-my-image/`, formData, config);

    dispatch({
      type: UPDATE_IMAGE_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: UPDATE_IMAGE_MY_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "user": userInfo.id,
      "text": "aktualizacja nowego obiektu zdjecia do mojego produktu",
      "function": "InsertImageMyProduct",
      "param": ""
    }
    if (!errorRedux.log) {
      dispatch(addToLS(errorData))
      dispatch(addLogError(errorData))
    }
  }
};

export const addMyproduct = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_MYPRODUCT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/add-myproduct/`,
      insertData,
      config
    )

    dispatch({
      type: ADD_MYPRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_MYPRODUCT_FAIL,
      payload: errorHandling(error)
    });
  }
};



export const addProductCat = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PRODUCT_CAT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/add-product-cat/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_PRODUCT_CAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_CAT_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const sortByLng = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SORT_BY_LNG_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/sort-by-lng/`, insertData, config);

    dispatch({
      type: SORT_BY_LNG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SORT_BY_LNG_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const getProductCat = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRODUCT_CAT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/get-product-categories/`, config);

    dispatch({
      type: GET_PRODUCT_CAT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_CAT_LIST_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const getSubproductCat = (categoryId) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_PRODUCT_SUBCAT_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/${categoryId}/get-product-subcategories/`,
        config
      );

      dispatch({
        type: GET_PRODUCT_SUBCAT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_SUBCAT_LIST_FAIL,
        payload: errorHandling(error)
      });
    }
  };

export const addProductSubcat = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PRODUCT_SUBCAT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/add-product-subcat/`,
      insertData,
      config
    );

    dispatch({
      type: ADD_PRODUCT_SUBCAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_SUBCAT_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const getSubcategory = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRODUCT_SUBCAT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/${insertData.Id}/${insertData.typeActivity}/get-subcategory`,
      config,
      insertData
    );

    dispatch({
      type: GET_PRODUCT_SUBCAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_SUBCAT_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const updateSubcategory = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PRODUCT_SUBCAT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/edit-product-subcategory/`,
      insertData,
      config
    );

    dispatch({
      type: EDIT_PRODUCT_SUBCAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_SUBCAT_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const getProductList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/get-product/`, config);

    dispatch({
      type: GET_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_LIST_FAIL,
      payload: errorHandling(error)
    });
  }
};

export const selectedCat = (item) => async (dispatch) => {
  try {
    if (item.kind === "lang") {
      dispatch({
        type: SEARCH_SELECTED_LNG,
        payload: item,
      });
    }
    if (item.kind === "Category") {
      dispatch({
        type: SEARCH_SELECTED_CATEGORY,
        payload: item,
      });
    }
    if (item.kind === "Subcategory") {
      dispatch({
        type: SEARCH_SELECTED_SUBCATEGORY,
        payload: item,
      });
    }
    if (item.kind === "clear") {
      dispatch({
        type: SEARCH_SELECTED_DELETE_NO_LNG,
        payload: item,
      });
    }

  } catch (error) { console.log(error) }
};
