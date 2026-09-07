const express = require("express");
const router = express.Router();
const Department = require("../models/department");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

/* READ */
router.get("/", auth, async (req, res) => {
  const data = await Department.find();
  res.json(data);
});

/* HOD USER DROPDOWN */
router.get("/hod-users", auth, async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select("_id email")
      .sort({ email: 1 });
    res.json(users);
  } catch (err) {
    console.error("Failed to load HOD users:", err);
    res.status(500).json({ message: "Failed to load HOD users" });
  }
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
