import React, { useState } from 'react';
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit , defaultValue}) => {
  const [formState, setFormState] = useState(defaultValue || {
    employeeId:"",
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    city:"",
    contactNo: "",
    email: "",
    designation: ""
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

    if (!formState.firstname) {
      errorFields.push("First Name");
    } else if (formState.firstname.length < 2) {
      errorFields.push("First Name (must be at least 2 characters)");
    }

    if (!formState.lastname) {
      errorFields.push("Last Name");
    } else if (formState.lastname.length < 2) {
      errorFields.push("Last Name (must be at least 2 characters)");
    }

    if (!formState.contactNo) {
      errorFields.push("Contact No");
    } else if (!/^\d{10}$/.test(formState.contactNo)) {
      errorFields.push("Contact No (must be a valid 10-digit number)");
    }

    if (!formState.city) {
      errorFields.push("city");
    }

    if (!formState.email) {
      errorFields.push("Email");
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errorFields.push("Email (must be a valid email address)");
    }

    if (!formState.designation) {
      errorFields.push("Designation");
    }

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
        <form onSubmit={handleSubmit}> {/* Moved onSubmit to form tag */}
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formState.firstname}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formState.lastname}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address1">Address1</label>
            <textarea
              id="address1"
              name="address1"
              value={formState.address1}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address2">Address2</label>
            <textarea
              id="address2"
              name="address2"
              value={formState.address2}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <textarea
              id="city"
              name="city"
              value={formState.City}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNo">Contact No</label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              value={formState.contactNo}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <select
              id="designation"
              name="designation"
              value={formState.designation}
              onChange={handleChanges}
            >
               <option value="">Select</option>
              <option value="manager">Manager</option>
              <option value="conductor">Conductor</option>
              <option value="operator">Operator</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          {errors && <div className='error'>{`Please include: ${errors}`}</div>}

          <button type="submit" className="btn">Submit</button> {/* Removed onSubmit from button */}
        </form>
      </div>
    </div>
  );
};
