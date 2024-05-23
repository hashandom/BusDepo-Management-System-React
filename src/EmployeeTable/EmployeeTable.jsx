import { useState } from "react";
import {Table} from "./Table";
import {Modal} from "./Modal";
import { Button } from "@mui/material";
function EmployeeTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      page: "Home",
      description: "This is the main page of the website",
      status: "live",
    },
    {
      page: "About Us",
      description: "This page has details about the company",
      status: "draft",
    },
    {
      page: "Pricing",
      description: "Prices for different subscriptions",
      status: "error",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      {/* <button onClick={() => setModalOpen(true)} > */}
      <Button variant="contained" sx={{marginTop:"15px"}} onClick={() => setModalOpen(true)}>
          Add
      </Button>

      {/* </button> */}
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default EmployeeTable;
