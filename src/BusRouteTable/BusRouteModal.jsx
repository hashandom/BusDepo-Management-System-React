import React, { useState } from 'react';
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit , defaultValue}) => {
  const [formState, setFormState] = useState(defaultValue || {
      routeId: "",
      routeName: "",
      routelength: "",
      routeType: ""
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
    if (!formState.routeName) {
      errorFields.push("Route Name");
    }
    if (!formState.routelength) {
      errorFields.push("Route Length");
    }
    if (!formState.routeType) {
      errorFields.push("Route Type");
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
        <form onSubmit={handleSubmit}> {/* Moved onSubmit to form tag */}
          <div className="form-group">
            <label htmlFor="routeName">Route Name</label>
            <input
              type="text"
              id="routeName"
              name="routeName"
              value={formState.routeName}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="routelength">Route Length</label>
            <input
              type="text"
              id="routelength"
              name="routelength"
              value={formState.routelength}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="routeType">Route Type</label>
            <textarea
              id="routeType"
              name="routeType"
              value={formState.routeType}
              onChange={handleChanges}
            />
          </div>
          
          {errors && <div className='error'>{`Please include: ${errors}`}</div>}

          <button type="submit" className="btn">Submit</button> {/* Removed onSubmit from button */}
        </form>
      </div>
    </div>
  );
};
