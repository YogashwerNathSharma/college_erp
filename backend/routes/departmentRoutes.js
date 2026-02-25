const express = require("express");
const router = express.Router();
const Department = require("../models/department");
const auth = require("../middleware/authMiddleware");

/* READ */
router.get("/", auth, async (req, res) => {
  const data = await Department.find();
  res.json(data);
});

/* CREATE */
router.post("/add", auth, async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ message: "Department name required" });

  const dept = await Department.create(req.body);
  res.json(dept);
});

/* UPDATE */
router.put("/update/:id", auth, async (req, res) => {
  await Department.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Department updated" });
});

/* DELETE */
router.delete("/delete/:id", auth, async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.json({ message: "Department deleted" });
});

module.exports = router;
