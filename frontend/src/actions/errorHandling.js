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


export const errorHandling = (er) => {

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
  // błąd sieciowy
  else if (er.request) {
    return ({
      "detail": "NetworkError",
      "axios_error": true,
      "code": "axiosError - 5",
      "status": er.request.status,
      "method": er.config.method,
      "url": er.config.url

    })
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
