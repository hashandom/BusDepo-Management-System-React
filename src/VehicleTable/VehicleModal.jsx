import React, { useState } from 'react';
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue || {
    vehicleId: "",
    make: "",
    model: "",
    manufactureYear: "",
    activeState: "",
    numberOfSeats: "",
    registractionNo: ""
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [errors, setErrors] = useState("");

  const validate = () => {
    let errorFields = [];

    if (!formState.make) errorFields.push("Make");
    if (!formState.model) errorFields.push("Model");
    if (!formState.manufactureYear || isNaN(formState.manufactureYear) || formState.manufactureYear.length !== 4) errorFields.push("Manufacture Year (must be a 4-digit number)");
    if (!formState.numberOfSeats || isNaN(formState.numberOfSeats)) errorFields.push("Number of Seats (must be a number)");
    if (!formState.registractionNo) errorFields.push("Registration Number");
    if (!formState.activeState) errorFields.push("Active State");

    if (errorFields.length === 0) {
      setErrors("");
      return true;
    } else {
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    onSubmit(formState);
    closeModal();
  };

  return (
    <div className="modal-container" onClick={(e) => {
      if (e.target.className === "modal-container") {
        closeModal();
      }
    }}>
      <div className='modal'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="make">Make</label>
            <input
              type="text"
              id="make"
              name="make"
              value={formState.make}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formState.model}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="manufactureYear">Manufacture Year</label>
            <input
              type="text"
              id="manufactureYear"
              name="manufactureYear"
              value={formState.manufactureYear}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfSeats">Number of Seats</label>
            <input
              type="text"
              id="numberOfSeats"
              name="numberOfSeats"
              value={formState.numberOfSeats}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="registractionNo">Registration No</label>
            <input
              type="text"
              id="registractionNo"
              name="registractionNo"
              value={formState.registractionNo}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="activeState">Active State</label>
            <select
              id="activeState"
              name="activeState"
              value={formState.activeState}
              onChange={handleChanges}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Not Active">Not Active</option>
            </select>
          </div>
          {errors && <div className='error'>{`Please include: ${errors}`}</div>}

          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};
