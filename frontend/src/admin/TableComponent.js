import React from "react";
import PropTypes from "prop-types";

const TableComponent = ({ data, columns, tableStyle, mainTableContainer }) => {
  return (
    <div style={mainTableContainer}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th style={column.styleHeader} key={column.key}>
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td style={column.styleTableCell} key={column.key}>
                  {row[column.key] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      styleTableCell: PropTypes.object,
      styleHeader: PropTypes.object,
    })
  ).isRequired,

  mainTableContainer: PropTypes.object.isRequired,
  tableStyle: PropTypes.object.isRequired,
};

export default TableComponent;
