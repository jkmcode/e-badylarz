import React from "react";
import CurrentLocation from "react-current-location-address";

function CurrentAdress() {
  //   const [address, setAddress] = useState({
  //     loaded: false,
  //     currentAddress: "",
  //   });

  return (
    <div>
      <CurrentLocation
        className="mt-5"
        onFetchAddress={(results) => {}}
        onError={(type, status) => {}}
      >
        {({ getCurrentLocation, loading }) => (
          <button onClick={getCurrentLocation}>Get Current Location</button>
        )}
      </CurrentLocation>
    </div>
  );
}

export default CurrentAdress;
