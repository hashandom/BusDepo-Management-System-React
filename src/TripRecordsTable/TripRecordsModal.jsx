import React, { useState } from 'react';
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue || {
      tripId : "",
      tripNumber: "",
      fuelConsumed: "",
      expences: "",
      cashCollected: "",
      distanceTraveled: ""
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

    if (!formState.tripNumber) {
      errorFields.push("Trip Number");
    }
    if (!formState.fuelConsumed) {
      errorFields.push("Fuel Consumed");
    }
    if (!formState.expences) {
      errorFields.push("Expenses");
    }
    if (!formState.cashCollected) {
      errorFields.push("Cash Collected");
    }
    if (!formState.distanceTraveled) {
      errorFields.push("Distance Traveled");
    }

    if (errorFields.length > 0) {
      setErrors(errorFields.join(", "));
      return false;
    }

    setErrors("");
    return true;
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
            <label htmlFor="tripNumber">Trip Number</label>
            <input
              type="text"
              id="tripNumber"
              name="tripNumber"
              value={formState.tripNumber}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fuelConsumed">Fuel Consumed</label>
            <input
              type="text"
              id="fuelConsumed"
              name="fuelConsumed"
              value={formState.fuelConsumed}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expences">Expenses</label>
            <textarea
              id="expences"
              name="expences"
              value={formState.expences}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cashCollected">Cash Collected</label>
            <textarea
              id="cashCollected"
              name="cashCollected"
              value={formState.cashCollected}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="distanceTraveled">Distance Traveled</label>
            <textarea
              id="distanceTraveled"
              name="distanceTraveled"
              value={formState.distanceTraveled}
              onChange={handleChanges}
            />
          </div>
          {errors && <div className='error'>{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};
