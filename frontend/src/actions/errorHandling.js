
export const errorHandling = (er) => {

  // console.log('Error-->', er)

  if (er.response.request.status == 500) {
    // Tu obługa 500
    console.log('Status-->', er.response.request.status)
  }

  if (er.response.request.status == 404) { }


  if (er.response && er.response.data.detail) {
    return (er.response.data.detail)
  } else {
    return (er.message)
  }
}
