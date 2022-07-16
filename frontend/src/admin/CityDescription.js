import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { getDiscrict } from "../actions/discrictsActions";
import AddDescription from "./AddDescription";

import {
  CITY_DESCRIPTION,
} from "../constants/adminConstans";

function CityDescription() {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();

  // data from redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const districtId = Number(params.id);
  const cityName = params.name;
  const cityId= params.cityId;

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
        <div className="container bg-container mt-5 p-4 rounded">
          <Link to={`/dashboard/district/district/${districtId}/edit`} className="text-secondary">
            {t("btn-return")}
          </Link>
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <div className=" d-flex justify-content-center display-6">
            <div className="px-3">{t("CityDistrict_title_1")} {cityName} {t("CityDistrict_title_2")}</div>
            {districtList.length === 0
              ? null
              : districtList.filter((i) => i.id === districtId)[0].name}
          </div>
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
