import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Table } from '../TripRecordsTable/TripRecordsTable';
import { Modal } from '../TripRecordsTable/TripRecordsModal';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function Settings() {
  const handleSubmit = (newRow) => {
      rowToEdit === null 
        ? setRows([...rows, newRow]) 
        : setRows(rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;
            return newRow;
          })
    );
  };
  

  const [rows, setRows] = useState([
    {
      tripId : "Trip1",
      tripNumber:158,
      fuelConsumed:"5l",
      expences:2000,
      cashCollected:3000,
      distanceTraveled:"5km"
    },
    {
      tripId : "Trip1",
      tripNumber:158,
      fuelConsumed:"5l",
      expences:2000,
      cashCollected:3000,
      distanceTraveled:"5km"
    },
    {
      tripId : "Trip1",
      tripNumber:158,
      fuelConsumed:"5l",
      expences:2000,
      cashCollected:3000,
      distanceTraveled:"5km"
    },
    
  ]);

  const handleDeleteRows = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  }

  const [modelOpen, setModelOpen] = useState(false);

  const [rowToEdit , setRowToEdit]=useState(null);

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModelOpen(true);
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography variant="h5">
          Trip Records
        </Typography>
        <Table rows={rows} deleteRow={handleDeleteRows} editRow={handleEditRow} />
        <Button variant="contained" onClick={() => setModelOpen(true)}>Add</Button>
        {modelOpen && <Modal closeModal={() => setModelOpen(false)} onSubmit={handleSubmit} 
        defaultValue={rowToEdit !== null && rows[rowToEdit] }
        />}
      </Box>
    </Box>
  )
}
