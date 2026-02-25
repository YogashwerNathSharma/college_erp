const express = require("express");
const router = express.Router();
const Student = require("../models/student");

/* CREATE */
router.post("/add", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json({ message: "Student Added" });
});

/* READ (for dashboard display) */
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

/* UPDATE */
router.put("/update/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Student Updated" });
});

/* DELETE */
router.delete("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted" });
});

module.exports = router;
