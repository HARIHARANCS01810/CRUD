const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: String, required: true },
});

const EmployeeService = mongoose.model("employees", userSchema);

module.exports = EmployeeService;
