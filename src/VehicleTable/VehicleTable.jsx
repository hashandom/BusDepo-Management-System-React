import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "../VehicleTable/vechiletable.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>VehicleId</th>
            <th>Make</th>
            <th>Model</th>
            <th>Manufacture Year</th>
            <th>Active State</th>
            <th>Number Of Seats</th>
            <th>Registraction Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.vehicleId}</td>
                <td>{row.make}</td>
                <td>{row.model}</td>
                <td>{row.manufactureYear}</td>
                <td>{row.activeState}</td>
                <td>{row.numberOfSeats}</td>
                <td>{row.registractionNo}</td>
                <td>
                  <span className="actions">
                    <BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx)} />
                    <BsFillPencilFill onClick={() => editRow(idx)} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
