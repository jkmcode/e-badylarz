import React, { useState, useEffect } from "react";
import useResponsive from "../component/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { FormLayout, changeBtn, addBtn } from "./AdminCSS";
import { getFullDiscricts } from "../actions/discrictsActions";
import { getAllCities } from "../actions/adminActions";
import { addAreaSpot } from "../actions/areaAction";
import RadioButtons from "./RadioButtons";
import FormInput from "./FormInput";
import Divider from "./Divider";
import SelectOption from "./SelectOption";
import UploadImage from "../component/UploadImage";

import { TWO, THREE } from "../constants/environmentConstans";

function AreaSpotActivity() {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const { windowWidth } = useResponsive();

  const areaParam = params.add;
  const editShopParam = params.edit;
  const areaId = params.id;
  const radios = [
    { name: t("Radio_own_collection"), value: "1" },
    { name: t("Radio_delivery"), value: "0" },
  ];

  //variables
  const [radioValue, setRadioValue] = useState("1");
  const [newListCities, setNewListCities] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [emptyValueError, setEmptyValueError] = useState(false);
  const [selectedCity, setSelectedCity] = useState(0);
  const [values, setValues] = useState({
    spotName: "",
    range: "",
    cityList: "",
    street: "",
    number: "",
    postCode: "",
    post: "",
    latitude: "",
    longitude: "",
  });
  const [currentTaxNo, setCurrentTaxNo] = useState("");
  const [imageRender, setImageRender] = useState(false);
  const [areaDetails, setAreaDetails] = useState({});

  // data from redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const areaSpotRedux = useSelector((state) => state.areaSpot);
  const {
    loading: loadingAreaSpot,
    areaSpotList,
    error: errorSpotList,
    success: successSpotList,
  } = areaSpotRedux;

  const discrictListRedux = useSelector((state) => state.districts);
  const {
    loading: loadingDisctrict,
    districtList,
    error: errorDisctrict,
    success: successDisctric,
  } = discrictListRedux;

  const dataReduxCitiesListAll = useSelector((state) => state.citesListAll);
  const {
    loading: loadingCityAllList,
    cityListAll,
    success: successGetAllCities,
    error: errorGetAllCities,
  } = dataReduxCitiesListAll;

  const areaListRedux = useSelector((state) => state.areaList);
  const { areaList } = areaListRedux;

  //handlers
  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleBtnValue = (e) => {
    setRadioValue(e.target.value);
  };

  const selectDistrictHandler = (option) => {
    setSelectedDistrict(Number(option));
    setEmptyValueError(false);
  };

  const selectCityHandler = (option) => {
    setSelectedCity(Number(option));
    setValues({ ...values, cityList: option });
    setEmptyValueError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (areaParam === "add") {
      if (selectedDistrict !== 0 && selectedCity !== 0) {
        const insertData = {
          add: true,
          id_area: areaId,
          name: values.spotName,
          city: values.cityList,
          street: values.street,
          no_building: values.number,
          postCode: values.postCode,
          post: values.post,
          latitude: values.latitude,
          longitude: values.longitude,
          creator: userInfo.id,
          is_active: "True",
          delivery: radioValue === "1" ? "False" : "True",
          range: radioValue === "1" ? "0" : values.range,
        };
        dispatch(addAreaSpot(insertData));
      } else {
        setEmptyValueError(true);
      }
    }
  };

  ///USEEFFECT

  // uruchamiane na samym początku
  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getFullDiscricts("only active"));
    }

    if (cityListAll.length === 0) {
      dispatch(getAllCities());
    }
  }, [dispatch, districtList.length, cityListAll.length]);

  // fetching list of area spot from DB
  // useEffect(() => {
  //   if (areaSpotList.length === 0) {
  //     dispatch(getAreas());
  //   }
  // }, [dispatch, areaSpotList.length]);

  // uruchamiany gdy jest wybrany powiat
  useEffect(() => {
    setNewListCities(
      cityListAll.filter((city) => selectedDistrict === city.id_district)
    );
  }, [dispatch, selectedDistrict]);

  // select areaDetails;
  useEffect(() => {
    if (areaList) {
      areaList.map((obj) => {
        if (obj.id === areaId) {
          console.log("jest takie obiekt area----", obj);
        }
      });
    }
  }, [areaList]);

  //style
  const background = {
    backgroundImage:
      areaParam === "edit"
        ? "linear-gradient(179deg, rgba(217, 195, 19, 1) 64%, rgba(188, 169, 34, 1) 100%"
        : "linear-gradient(127deg, rgba(234, 234, 234, 1) 0%, rgba(140, 155, 130, 1) 100%)",
    boxShadow: "-9px 8px 34px -13px rgba(66, 68, 90, 1)",
    borderRadius: ".25rem",
    padding: "2rem",
    width: windowWidth > 800 ? "80%" : "100%",
    margin: "auto",
  };

  //List of inputs
  const inputs = [
    {
      id: "1",
      name: "spotName",
      type: "text",
      placeholder: t("ShopsSpot_name_placeholder"),
      errorMessage: t("ShopsSpot_name_error_message"),
      label: t("ShopsSpot_label_name"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,20}$",
      //defaultValue:
      // SpotParam === "add"
      //   ? ""
      //   : successGetSpot && SpotParam === "edit" && spotDetails.name,
      required: true,
    },
    {
      id: "2",
      name: "range",
      type: "text",
      placeholder: t("ShopsSpot_range_placeholder"),
      errorMessage: t("ShopsSpot_range_error_message"),
      label: t("ShopsSpot_label_range"),
      pattern: "^[0-9]$",
      //defaultValue:
      // SpotParam === "add"
      //   ? ""
      //   : successGetSpot && SpotParam === "edit" && spotDetails.range,
      required: true,
    },
    {
      id: "3",
      name: "districtList",
      label: t("ShopsSpot_label_districtList"),
      optionsList: districtList,
      //   defaultValue:
      //     SpotParam === "add"
      //       ? "Select option"
      //       : successGetSpot &&
      //         SpotParam === "edit" &&
      //         spotDetails.city.id_district.name,
      //   disabled: SpotParam === "edit" ? true : false,
    },
    {
      id: "4",
      name: "cityList",
      label: t("ShopsSpot_label_city"),
      optionsList: newListCities,
      //   defaultValue:
      //     SpotParam === "add"
      //       ? "Select option"
      //       : successGetSpot && SpotParam === "edit" && spotDetails.city.name,
      //   disabled:
      //     SpotParam === "edit" ? true : newListCities.length === 0 ? true : false,
    },
    {
      id: "5",
      name: "street",
      type: "text",
      placeholder: t("ShopsSpot_street_placeholder"),
      errorMessage: t("ShopsSpot_street_error_message"),
      label: t("ShopsSpot_street_label"),
      pattern: "^[A-Za-ząćęłńóśźżs]{3,50}$",
      //   defaultValue:
      //     SpotParam === "add"
      //       ? ""
      //       : successGetSpot && SpotParam === "edit" && spotDetails.street,
      required: true,
    },
    {
      id: "6",
      name: "number",
      type: "text",
      placeholder: t("ShopsSpot_number_placeholder"),
      errorMessage: t("ShopsSpot_number_error_message"),
      label: t("ShopsSpot_number_label"),
      pattern: "^(?!/|-|,)[0-9A-Za-z/,-]+(?<!/|,|-)$",
      //   defaultValue:
      //     SpotParam === "add"
      //       ? ""
      //       : successGetSpot && SpotParam === "edit" && spotDetails.no_building,
      required: true,
    },
    {
      id: "7",
      name: "postCode",
      type: "text",
      placeholder: t("ShopsSpot_postCode_placeholder"),
      errorMessage: t("ShopsSpot_postCode_error_message"),
      label: t("ShopsSpot_postCode_label"),
      pattern: "^[0-9]{2}-[0-9]{3}$",
      //   defaultValue:
      //     SpotParam === "add"
      //       ? ""
      //       : successGetSpot && SpotParam === "edit" && spotDetails.post_code,
      required: true,
    },
    {
      id: "8",
      name: "post",
      type: "text",
      placeholder: t("ShopsSpot_post_placeholder"),
      errorMessage: t("ShopsSpot_post_error_message"),
      label: t("ShopsSpot_post_label"),
      pattern: "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,50}$",
      //   defaultValue:
      //     SpotParam === "add"
      //       ? ""
      //       : successGetSpot && SpotParam === "edit" && spotDetails.post,
      required: true,
    },
    {
      id: "9",
      name: "latitude",
      type: "text",
      placeholder: t("latitude_placeholder"),
      errorMessage: t("latitude_error_message"),
      label: t("label_latitude"),
      pattern: "^-?([1-8]\\d|90|[0-9])(\\.\\d+)?$",
      //   defaultValue:
      //     SpotParam === "add"
      //       ? ""
      //       : successGetSpot && SpotParam === "edit" && spotDetails.latitude,
      required: true,
    },
    {
      id: "10",
      name: "longitude",
      type: "text",
      placeholder: t("longitude_placeholder"),
      errorMessage: t("longitude_error_message"),
      label: t("label_longitude"),
      pattern: "^-?(180|1[0-7]\\d|[1-9]\\d|[1-9])(\\.\\d+)?$",
      //   defaultValue:
      //     SpotParam === "add"
      //       ? ""
      //       : successGetSpot && SpotParam === "edit" && spotDetails.longitude,
      required: true,
    },
  ];

  return (
    <div style={background}>
      <Link
        to={{ pathname: `/dashboard/areas/${areaId}/details` }}
        style={{ color: "black" }}
      >
        <Icon icon="ion:arrow-back" />
        {t("btn-return")}
      </Link>
      <div style={{ textAlign: "center", fontSize: "calc(1.5rem + 0.5vw)" }}>
        {areaParam === "edit"
          ? t("ShopsSpot_Edit_title")
          : t("ShopsSpot_Add_title")}
      </div>
      <RadioButtons handleBtnValue={handleBtnValue} radios={radios} />
      <form onSubmit={handleSubmit}>
        <FormLayout col={TWO}>
          {inputs.map((input, index) => {
            if (index === 0) {
              return (
                <FormInput key={input.id} {...input} onChange={onChange} />
              );
            }
          })}
          {inputs.map((input, index) => {
            if (index === 1 && radioValue === "0") {
              return (
                <FormInput key={input.id} {...input} onChange={onChange} />
              );
            }
          })}
        </FormLayout>
        <Divider backgroundColor="grey" />
        <div style={{ fontWeight: 500 }}>{t("ShopsSpot_title_address")}</div>
        <FormLayout col={THREE}>
          {inputs.map((input, index) => {
            if (index === 2 || index === 3) {
              return (
                <SelectOption
                  key={input.id}
                  optionsList={districtList}
                  label={input.label}
                  defaultValue={input.defaultValue}
                  emptyValueError={emptyValueError}
                  onChange={
                    index === 2 ? selectDistrictHandler : selectCityHandler
                  }
                  {...input}
                />
              );
            }
            if (index === 4) {
              return (
                <FormInput key={input.id} {...input} onChange={onChange} />
              );
            }
          })}
        </FormLayout>
        <FormLayout col={THREE}>
          {inputs.map((input, index) => {
            if (index === 5 || index === 6 || index === 7) {
              return (
                <FormInput key={input.id} {...input} onChange={onChange} />
              );
            }
          })}
        </FormLayout>
        <Divider backgroundColor="grey" />
        <div style={{ fontWeight: 500 }}>
          {t("ShopsSpot_title_geolocation")}
        </div>

        <FormLayout col={TWO}>
          {inputs.map((input, index) => {
            if (index === 8 || index === 9) {
              return (
                <FormInput key={input.id} {...input} onChange={onChange} />
              );
            }
          })}
        </FormLayout>
        {/* <div>
          <UploadImage nip={currentTaxNo} />
          {imageRender
            ? editShopParam === "edit" &&
              shopDetails.photo !== null && <img src={shopDetails.photo} />
            : null}
        </div> */}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {areaParam === "edit" ? (
            <button type="submit" style={changeBtn}>
              {t("btn-change")}
            </button>
          ) : (
            <button type="submit" style={addBtn}>
              {t("btn-add")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AreaSpotActivity;
