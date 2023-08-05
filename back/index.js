const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const EmployeeService = require("./Models/EmployeeService");

mongoose.connect("mongodb://0.0.0.0:27017/Details");

const app = express();

app.use(express.json());
app.use(cors());

//get
app.get("/getEmployees", async (req, res) => {
  try {
    const employees = await EmployeeService.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to get employees" });
  }
});

//create
app.post("/createEmployees", async (req, res) => {
  const employee = req.body;

  const newemployee = new EmployeeService(employee);
  await newemployee.save();

  res.json(employee);
});

//update employee
app.put("/updateEmployees/:id", async (req, res) => {
  try {
    const EmpId = req.params.id;
    const updatedEmpData = req.body;

    const updatedEmp = await EmployeeService.findOneAndUpdate(
      { _id: EmpId },
      updatedEmpData,
      { new: true }
    );

    if (updatedEmp) {
      res.json(updatedEmp);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete employee
app.delete("/deleteEmployees/:id", async (req, res) => {
  try {
    const EmpId = req.params.id;

    const deletedEmp = await EmployeeService.findOneAndDelete({ _id: EmpId });

    if (deletedEmp) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
