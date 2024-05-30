import React, { useState } from 'react';
import SideBar from '../Component/SideBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Table } from '../VehicleTable/VehicleTable';
import { Modal } from '../VehicleTable/VehicleModal';
import Button from '@mui/material/Button';

export default function Settings() {
  const [rows, setRows] = useState([
    {
      vehicleId: "veh1",
      make: "CT21s",
      model: "CT21s",
      manufactureYear: 2016,
      activeState: "Active",
      numberOfSeats: 4,
      registractionNo: "cat2546"
    },
    {
      vehicleId: "veh2",
      make: "CT22s",
      model: "CT22s",
      manufactureYear: 2017,
      activeState: "Inactive",
      numberOfSeats: 5,
      registractionNo: "cat2547"
    },
    {
      vehicleId: "veh3",
      make: "CT23s",
      model: "CT23s",
      manufactureYear: 2018,
      activeState: "Active",
      numberOfSeats: 6,
      registractionNo: "cat2548"
    }
  ]);

  const [modelOpen, setModelOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleSubmit = (newRow) => {
    setRows(prevRows => {
      if (rowToEdit === null) {
        return [...prevRows, newRow];
      } else {
        return prevRows.map((currRow, idx) => (idx === rowToEdit ? newRow : currRow));
      }
    });
    setRowToEdit(null);
  };

  const handleDeleteRows = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModelOpen(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography variant="h5">
          Vehicle Records
        </Typography>
        <Table rows={rows} deleteRow={handleDeleteRows} editRow={handleEditRow} />
        <Button variant="contained" onClick={() => setModelOpen(true)}>Add</Button>
        {modelOpen && (
          <Modal
            closeModal={() => setModelOpen(false)}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null ? rows[rowToEdit] : null}
          />
        )}
      </Box>
    </Box>
  );
}
