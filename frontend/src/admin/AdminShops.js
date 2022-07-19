import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AdminShops() {
  const { t } = useTranslation();
  return (
    <>
      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
          <h6 className="text-white text-capitalize ps-3">Authors table</h6>
          <Link to="add">{t("btn-add")}</Link>
        </div>
      </div>
      <div className="card-body px-0 pb-2">
        <div className="card-body px-0 pb-2">
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Author
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Function
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Status
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Employed
                </th>
                <th className="text-secondary opacity-7"></th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex px-2 py-1">
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0 text-sm">John Michael</h6>
                        <p className="text-xs text-secondary mb-0">
                          john@creative-tim.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs font-weight-bold mb-0">Manager</p>
                    <p className="text-xs text-secondary mb-0">Organization</p>
                  </td>
                  <td className="align-middle text-center text-sm">
                    <span className="badge badge-sm bg-gradient-success">
                      Online
                    </span>
                  </td>
                  <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">
                      23/04/18
                    </span>
                  </td>
                  <td className="align-middle">
                    <a
                      href="javascript:;"
                      className="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex px-2 py-1">
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0 text-sm">John Michael</h6>
                        <p className="text-xs text-secondary mb-0">
                          john@creative-tim.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs font-weight-bold mb-0">Manager</p>
                    <p className="text-xs text-secondary mb-0">Organization</p>
                  </td>
                  <td className="align-middle text-center text-sm">
                    <span className="badge badge-sm bg-gradient-success">
                      Online
                    </span>
                  </td>
                  <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">
                      23/04/18
                    </span>
                  </td>
                  <td className="align-middle">
                    <a
                      href="javascript:;"
                      className="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex px-2 py-1">
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0 text-sm">John Michael</h6>
                        <p className="text-xs text-secondary mb-0">
                          john@creative-tim.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs font-weight-bold mb-0">Manager</p>
                    <p className="text-xs text-secondary mb-0">Organization</p>
                  </td>
                  <td className="align-middle text-center text-sm">
                    <span className="badge badge-sm bg-gradient-success">
                      Online
                    </span>
                  </td>
                  <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">
                      23/04/18
                    </span>
                  </td>
                  <td className="align-middle">
                    <a
                      href="javascript:;"
                      className="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminShops;
