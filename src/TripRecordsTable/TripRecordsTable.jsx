import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({rows,deleteRow ,editRow}) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>TripId</th>
            <th>TripNumber</th>
            <th>FuelConsumed</th>
            <th>Expences</th>
            <th>CashCollected</th>
            <th>DistanceTraveled</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {rows.map((row, idx) => {
          return (
            <tr key={idx}>
              <td>{row.tripId}</td>
              <td>{row.tripNumber}</td>
              <td>{row.fuelConsumed}</td>
              <td>{row.expences}</td>
              <td>{row.cashCollected}</td>
              <td>{row.distanceTraveled}</td>
              <td>
                <span className="actions">
                  <BsFillTrashFill className="delete-btn" onClick={()=>deleteRow(idx)} />
                  <BsFillPencilFill onClick={()=> editRow(idx)} />
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
