
export const errorHandling = (er) => {

  console.log('Error-->', er)

  if (er.response.request.status == 500) {
    // Tu obługa 500
    console.log('Status-->', er.response.request.status)
  }
  // if (er.request) {
  //   console.log('Błąd sieciowy -->', er.isAxiosError)
  // } else if (er.response) {
  //   console.log('Błąd odpowiedzi servera -->', er.isAxiosError)
  // } else {
  //   console.log('Błąd inny -->', er)
  // }

  if (er.response && er.response.data && er.response.data.code) {
    console.log('Jestem w ---> 1')
    return (er.response.data)
  } else if (er.response && er.response.data && er.response.data.detail) {
    console.log('Jestem w ---> 2')
    return (er.response.data.detail)
  } else if (er.response && er.response.status === 401) {
    console.log('Jestem w ---> 3')
    return ('Brak autoryzacji')
  } else if (er.response && er.response.status === 403) {
    console.log('Jestem w ---> 33, (Forbidden)')
    return ('Odmowa dostepu do zasobu (Forbidden)')
  } else if (er.response && er.response.status === 404) {
    console.log('Jestem w ---> 4')
    return ('zasub nieznaleziony')
  } else if (er.request && er.request.readyState === 0) {
    console.log('Jestem w ---> 5a stan UNSENT')
    return ('Błąd sieciowy nie nawiazano połączenia stan UNSENT')
  } else if (er.request && er.request.readyState === 1) {
    console.log('Jestem w ---> 5b stan OPENED')
    return ('Błąd sieciowy nie nawiazano połączenia stan OPENED')
  } else if (er.request && er.request.readyState === 2) {
    console.log('Jestem w ---> 5c stan HEADERS_RECEIVED')
    return ('Błąd sieciowy nie nawiazano połączenia stan HEADERS_RECEIVED')
  } else if (er.request && er.request.readyState === 3) {
    console.log('Jestem w ---> 5d stan LOADING')
    return ('Błąd sieciowy nie nawiazano połączenia stan LOADING')
  } else if (er.request) {
    console.log('Jestem w ---> 6', er.request.readyState)
    return ({
      "detail": 'Błąd sieciowy, problemy z połączeniem',
      "axios": true,
      "axios_code": 12
    })
  } else {
    console.log('Jestem w ---> 7')
    return ('Inny błąd axiosa')
  }

}
