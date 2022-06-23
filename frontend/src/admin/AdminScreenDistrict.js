import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDiscrict } from "../actions/discrictsActions";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";

function AdminScreenDistrict() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const discrictListRedux = useSelector((state) => state.districts);
  const { loading, districtList, error } = discrictListRedux;

  const deleteHandler = (id) => {
    console.log("działa deleteHandler", id);
  };

  useEffect(() => {
    if (districtList.length === 0) {
      dispatch(getDiscrict());
    }
  }, [dispatch, districtList.length]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-container mt-4 p-4 rounded">
          {error ? <ErrorMessage msg={error} timeOut={1000} /> : null}
          <Row className="align-items-center">
            <Col></Col>
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
            {t("AdminScreenDistrict_title")}
          </div>

          {error ? (
            <p>{t("No_data")}</p>
          ) : (
            <Table striped hover responsive className="table-sm mt-2">
              <thead>
                <tr>
                  <th>{t("Table_head_ID")}</th>
                  <th className="w-100">{t("Table_head_name")}</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {districtList.map((i, index) => (
                  <tr key={i.id}>
                    <td>{index + 1}.</td>
                    <td>{i.name}</td>
                    <td>
                      <Button
                        variant="danger"
                        className="btn-sm d-flex"
                        onClick={() => deleteHandler(i.id)}
                      >
                        {t("btn_delete")}
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        className="btn-sm d-flex"
                        onClick={() => deleteHandler(i.id)}
                      >
                        {t("btn_edit")}
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        className="btn-sm d-flex"
                        onClick={() => deleteHandler(i.id)}
                      >
                        {t("btn_info")}
                      </Button>
                    </td>
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
