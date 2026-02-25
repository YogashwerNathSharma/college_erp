const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class"
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section"
  },
  isActive: Boolean
});

module.exports = mongoose.model("Subject", subjectSchema);
