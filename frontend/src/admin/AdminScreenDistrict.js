import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  Button,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getDiscrict } from "../actions/discrictsActions";
import Loader from "../component/Loader";
import InfoComponent from "../component/infoComponent";
import ErrorMessage from "../component/ErrorMessage";
import { unOrActiveList } from "../actions/adminActions";

import {
  DISCTRICT_DESCRIPTION,
  DISTRICT_DELETE,
  SET_FLAG_INFO_TRUE,
  SET_FLAG_INFO_FALSE,
} from "../constants/adminConstans";

function AdminScreenDistrict() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: t("Radio_true"), value: "1" },
    { name: t("Radio_false"), value: "0" },
  ];

  // fech data from Redux
  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const infoFlagRedux = useSelector((state) => state.flag);
  const { infoFlag } = infoFlagRedux;

  const [info, setInfo] = useState(false);
  const [objInfo, setObjInfo] = useState({});

  //const newdistrictList=[]

  const activeHandler = (id) => {
    dispatch(
      unOrActiveList({
        Id: id,
        active: true,
        userId: userInfo.id,
        objType: DISCTRICT_DESCRIPTION,
      })
    );
    dispatch({ type: DISTRICT_DELETE });
  };

  const unActiveHandler = (id) => {
    dispatch(
      unOrActiveList({
        Id: id,
        active: false,
        userId: userInfo.id,
        objType: DISCTRICT_DESCRIPTION,
      })
    );
    dispatch({ type: DISTRICT_DELETE });
  };

  const infoHandler = (i) => {
    dispatch({ type: SET_FLAG_INFO_TRUE });
    setObjInfo(i);
    setInfo(true);
  };

  const editHandler = (i) => {
    navigate(`${i.id}/edit`);
  };

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getDiscrict());
    }
  }, [dispatch, districtList.length]);

  useEffect(() => {
    dispatch({ type: SET_FLAG_INFO_FALSE });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-container mt-4 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <Row className="align-items-center">
            {!error && (
              <Col>
                <Link
                  to="add"
                  className="text-secondary d-flex justify-content-end"
                >
                  {t("btn-add")}
                </Link>
              </Col>
            )}
          </Row>

          <div className="d-flex justify-content-center display-6">
            {radioValue === "1"
              ? t("AdminScreenDistrict_title_active")
              : t("AdminScreenDistrict_title_unactive")}
          </div>

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

          {info & infoFlag ? (
            <InfoComponent
              title={t("InfoComponent_title")}
              obj={objInfo}
              typeObj={DISCTRICT_DESCRIPTION}
            />
          ) : null}

          {error ? (
            <p>{t("No_data")}</p>
          ) : (
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
                {districtList.map((i, index) => (
                  <tr key={i.id}>
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
                            onClick={() => editHandler(i)}
                          >
                            {t("btn_edit")}
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
                    ) : null}
                    {(radioValue === "0") & (i.is_active === false) ? (
                      <>
                        {/* <td>{index + 1}.</td> */}
                        <td>{i.name}</td>
                        <td>
                          <td></td>
                          <Button
                            variant="danger"
                            className="btn-sm d-flex"
                            onClick={() => activeHandler(i.id)}
                          >
                            {t("btn_active")}
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
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </>
  );
}

export default AdminScreenDistrict;
