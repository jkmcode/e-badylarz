import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import InfoComponent from "../component/infoComponent";
import { Button, Table,  ButtonGroup,
  ToggleButton, } from "react-bootstrap";

import { getCitiesList, unOrActiveList }  from "../actions/adminActions"

import {
  GET_CITES_LIST_DELETE,
  SET_FLAG_INFO_TRUE,
  CITY_DESCRIPTION,
} from "../constants/adminConstans";

function CitiesList(props) {


  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // data from redux
  const dataRedux = useSelector((state) => state.citesList);
  const { loading, citiesList, error, success } = dataRedux;

  const infoFlagRedux = useSelector((state) => state.flag);
  const { infoFlag, cityFlag } = infoFlagRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [citiesData, setCitiesData] = useState(false);
  const [info, setInfo] = useState(false);
  const [objInfo, setObjInfo] = useState({});

  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: t("Radio_true"), value: "1" },
    { name: t("Radio_false"), value: "0" },
  ];

  const activeHandler = (id) => {
    setCitiesData(false)
    dispatch(
      unOrActiveList({
        Id: id,
        active: true,
        userId: userInfo.id,
        objType: CITY_DESCRIPTION,
      })
    );
    dispatch({ type: GET_CITES_LIST_DELETE });
  };

  const unActiveHandler = (id) => {
    setCitiesData(false)
    dispatch(
      unOrActiveList({
        Id: id,
        active: false,
        userId: userInfo.id,
        objType: CITY_DESCRIPTION,
      })
    );
    dispatch({ type: GET_CITES_LIST_DELETE });
  };

  const infoHandler = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
    setInfo(true);
  };

  const descriptionHandler = (i) => {
    console.log('-------->',i)
    navigate(`/add-description/${i.name}/${i.id_district}/${i.id}/add`);
  };

  useEffect(() => {
    if(!citiesList){
        dispatch(getCitiesList({
          Id:props.Id
        }
        ));
    }else{
      setCitiesData(true)
    }
  }, [dispatch,citiesList]);

  useEffect(() => {
    dispatch({ type: GET_CITES_LIST_DELETE });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container bg-container mt-5 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          
          {info & infoFlag ? (
            <InfoComponent
              title={t("InfoComponent_title_city")}
              obj={objInfo}
              typeObj={CITY_DESCRIPTION}
            />
          ) : null}

          {citiesData & cityFlag ?  
            <>
              <ButtonGroup className="mb-2">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-danger" : "outline-success"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
              </ButtonGroup>
            <Table striped hover responsive className="table-sm mt-2">
              <thead>
                  <tr>
                    <th className="w-100">{t("Table_head_name")}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
              </thead> 
              <tbody>
                {citiesList.map((i) => (
                  <tr key={i.id}>
                    <>
                      {(radioValue === "1") & i.is_active ? (
                        <>
                      <td>{i.name}</td>
                      <td>
                          <Button
                            variant="danger"
                            className="btn-sm d-flex"
                            onClick={() => unActiveHandler(i.id)}
                          >
                            {t("btn_unactive")}
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            className="btn-sm d-flex"
                            onClick={() => descriptionHandler(i)}
                          >
                            {t("btn_description")}
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="info"
                            className="btn-sm d-flex"
                            onClick={() => infoHandler(i)}
                          >
                            {t("btn_info")}
                          </Button>
                        </td>
                        </>
                      ): null}
                      {(radioValue === "0") & (i.is_active === false) ? (
                        <>
                      <td>{i.name}</td>
                      <td>
                          <Button
                            variant="danger"
                            className="btn-sm d-flex"
                            onClick={() => activeHandler(i.id)}
                          >
                            {t("btn_unactive")}
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="info"
                            className="btn-sm d-flex"
                            onClick={() => infoHandler(i)}
                          >
                            {t("btn_info")}
                          </Button>
                        </td>
                        </>
                      ): null}
                    
                    </>
                  </tr>
                ))}
              </tbody> 
            </Table>
            </>
            :null}
          
        </div>
      )}
    </>
  );
}

export default CitiesList;
