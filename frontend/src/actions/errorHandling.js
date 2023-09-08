import axios from 'axios';
import {
  ADD_LOG_REQUEST,
  ADD_LOG_SUCCESS,
  ADD_LOG_FAIL,
} from "../constants/productConstans";

export const exampleRequestToGoogle = async () => {
  try {
    const response = await axios.get('https://www.google.com');
    return true
  } catch (error) {
    return false
  }
};


export const addToLS = (errorRedux) => async (dispatch, getState) => {
  try {
    const dataFromLocalStorageJSON = localStorage.getItem("errorLog");
    let dataFromLocalStorage = [];
    if (dataFromLocalStorageJSON) {
      dataFromLocalStorage = JSON.parse(dataFromLocalStorageJSON);
    }
    const idObject = dataFromLocalStorage.length;
    const currentDate = new Date();
    const {
      userLogin: { userInfo },
    } = getState();

    const newError = {
      id: idObject + 1,
      user_error: userInfo.id,
      data_error: currentDate,
      code: errorRedux.code,
      status: errorRedux.status,
      detail: errorRedux.detail,
      method: errorRedux.method,
      url: errorRedux.url,
      text: errorRedux.text,
      function: errorRedux.function,
      param: errorRedux.param
    };

    dataFromLocalStorage.push(newError);
    const updatedDataJSON = JSON.stringify(dataFromLocalStorage);
    localStorage.setItem("errorLog", updatedDataJSON);

  } catch (error) {
    console.error(error);
  }
};


export const errorHandling = async (er) => {

  console.log('Error-->', er)

  // obsługa błędów z beckendu po nowemu
  if (er.response && er.response.data && er.response.data.code) {
    return (er.response.data)
  }
  // obsługa błędów z beckendu po staremu
  else if (er.response && er.response.data && er.response.data.detail) {
    return ({
      "detail": er.response.data.detail,
      "axios_error": false,
      "code": "HTTP Error"
    })
  }
  // Brak autoryzacji
  else if (er.response && er.response.status === 401) {
    return ({
      "detail": "Unauthorized",
      "axios_error": true,
      "code": "axiosError - 1",
      "status": er.request.status,
      "method": er.request.method,
      "url": er.request.responseURL
    })
  }
  // Odmowa dostepu do zasobu (Forbidden)
  else if (er.response && er.response.status === 403) {
    return ({
      "detail": "Forbidden",
      "axios_error": true,
      "code": "axiosError - 3",
      "status": er.request.status,
      "method": er.request.method,
      "url": er.request.responseURL
    })
  }
  // zasub nieznaleziony error 404
  else if (er.response && er.response.status === 404) {
    return ({
      "detail": "Error404",
      "axios_error": true,
      "code": "axiosError - 4",
      "status": er.request.status,
      "method": er.request.method,
      "url": er.request.responseURL
    })
  }
  // błąd stanu żądania - UNSENT
  else if (er.request && er.request.readyState === 0) {
    return ({
      "detail": "UNSENT",
      "axios_error": true,
      "code": "axiosError - 40",
      "status": er.request.status,
      "method": er.request.method,
      "url": er.request.responseURL
    })
  }
  // błąd stanu żądania - OPENED
  else if (er.request && er.request.readyState === 1) {
    return ({
      "detail": "OPENED",
      "axios_error": true,
      "code": "axiosError - 41",
      "status": er.request.status,
      "method": er.request.method,
      "url": er.request.responseURL
    })
  }
  // błąd stanu żądania - HEADERS_RECEIVED
  else if (er.request && er.request.readyState === 2) {
    return ({
      "detail": "HEADERS_RECEIVED",
      "axios_error": true,
      "code": "axiosError - 42",
      "status": er.request.status,
      "method": er.request.method,
      "url": er.request.responseURL
    })
  }
  // błąd stanu żądania - LOADING
  else if (er.request && er.request.readyState === 3) {
    return ({
      "detail": "LOADING",
      "axios_error": true,
      "code": "axiosError - 43",
      "status": er.request.status,
      "method": er.request.method,
      "url": er.request.responseURL
    })
  }
  // błąd timeout
  else if (er.code === 'ECONNABORTED') {
    return ({
      "detail": "TIMEOUT",
      "axios_error": true,
      "code": "axiosError - 7",
      "status": er.request.status,
      "method": er.request.method,
      "url": er.request.responseURL
    })
  }
  // błąd sieciowy
  else if (er.request) {
    // publiczny adres on powinien być zawsze dostępny
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      return ({
        "detail": "NetworkError no access to the server",
        "axios_error": true,
        "code": "axiosError - 50",
        "status": er.request.status,
        "method": er.config.method,
        "url": er.config.url
      })
    } catch (error) {
      return ({
        "detail": "NetworkError no internet",
        "axios_error": true,
        "code": "axiosError - 51",
        "status": er.request.status,
        "method": er.config.method,
        "url": er.config.url
      })
    }

  }
  // pozostałe błędy Axiosa
  else {
    return ({
      "detail": "OtherError",
      "axios_error": true,
      "code": "axiosError - 6",
      "status": er.request.status,
      "method": er.request.method,
      "url": er.request.responseURL
    })
  }

}

export const addLogError = (insertData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_LOG_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/add-log/`,
      insertData,
      config
    )

    dispatch({
      type: ADD_LOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorRedux = await errorHandling(error)
    dispatch({
      type: ADD_LOG_FAIL,
      payload: errorRedux
    });
    const errorData = {
      ...errorRedux,
      "text": "próba zapisania błędu axiosa w tabeli przed LS",
      "function": "addLogError",
      "param": ""
    }
    if (!errorRedux.log) { dispatch(addToLS(errorData)) }
  }
};

export const addLogErrorFromLS = () => async (dispatch, getState) => {
  const dataFromLocalStorageJSON = localStorage.getItem("errorLog");
  let dataFromLocalStorage = [];
  if (dataFromLocalStorageJSON) {
    dataFromLocalStorage = JSON.parse(dataFromLocalStorageJSON);
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/${userInfo.id}/add-log-from-ls/`,
        dataFromLocalStorage,
        config
      )
      localStorage.removeItem("errorLog");
    } catch (error) { console.log("Błąd errorLS--->", error) }
  } else { console.log("W LS nic nie ma !!!!") }
};