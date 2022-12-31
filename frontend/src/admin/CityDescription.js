import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { getDiscrict } from "../actions/discrictsActions";
import AddDescription from "./AddDescription";

import { CITY_DESCRIPTION } from "../constants/adminConstans";

function CityDescription() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();

  // data from redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const districtId = Number(params.id);
  const cityName = params.name;
  const cityId = params.cityId;

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getDiscrict());
    }
  }, [dispatch, districtList.length]);

  useEffect(() => {}, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            backgroundColor: "red",
            padding: "1rem",
            width: "calc(100% + 30px)",
          }}
        >
          <AddDescription
            objId={cityId}
            descType={CITY_DESCRIPTION}
            return={true}
            path={`/dashboard/district/district/${districtId}/edit`}
          />
        </div>
      )}
    </>
  );
}

export default CityDescription;
