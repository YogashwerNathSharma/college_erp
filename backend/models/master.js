const mongoose = require("mongoose");

const MasterSchema = new mongoose.Schema({
  masterType: { type: String, required: true }, // class, section, subject
  name: { type: String, required: true },
  code: { type: String },
  extra: { type: Object }, // future use (classId, sectionId etc)
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Master", MasterSchema);
