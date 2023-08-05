import React, { useState, useEffect } from "react";
import {
  // Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import './Styles.css'

export default function EditItemForm({ open, onClose, employee, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setPhoneNumber(employee.phonenumber);
      setPosition(employee.position);
      setSalary(employee.salary);
    }
  }, [employee]);

  const handleSubmit = () => {
    const updatedItem = {
      ...employee,
      name,
      email,
      phonenumber,
      position,
      salary,
    };
    onSubmit(updatedItem);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: "#ffffff",
          boxShadow: 3,
          borderRadius: "20px",
        },
      }}
    >
      <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
      <DialogContent>
        <DialogContentText>Please update the details below.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="phoneNumber"
          label="Phone Number"
          type="text"
          fullWidth
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          margin="dense"
          id="position"
          label="Position"
          type="text"
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          margin="dense"
          id="salary"
          label="Salary"
          type="text"
          fullWidth
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <div style={{ marginBottom: "6px", marginRight: "10px" }}>
          <button
            type="button"
            class="inline-block rounded-full bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200 cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
