import React, { useState, useEffect } from "react";

function useGeoLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  if (location.loaded) {
    console.log(location.coordinates.lat, typeof location.coordinates.lat);

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: location.coordinates }).then((response) => {
      if (response.results[0]) {
        console.log(response.results[0].formatted_address);
      } else {
        console.log("wystąpił error");
      }
    });
  }

  const onError = (error) => {
    setLocation({
      loaded: false,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocations" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });

      navigator.geolocation.getCurrentPosition(onSuccess, onError); //if user click, the method will be executed
    }
  }, []);

  return location;
}

export default useGeoLocation;
