const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: String,
  hod: String
});

module.exports = mongoose.model("Department", departmentSchema);
