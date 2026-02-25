const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

// GET all subjects
router.get("/", async (req, res) => {
  const data = await Subject.find()
    .populate("classId")
    .populate("sectionId");
  res.json(data);
});
//get id
router.get("/:id", async (req, res) => {
  const s = await Subject.findById(req.params.id)
    .populate("classId")
    .populate("sectionId");

  res.json(s);
});

// CREATE subject
router.post("/", async (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    classId: req.body.classId,
    sectionId: req.body.sectionId,
    isActive: true
  });

  await subject.save();
  res.json(subject);
});

// UPDATE / DEACTIVATE subject
router.put("/:id", async (req, res) => {
  const updated = await Subject.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },   // 🔥 isActive yahin se update hoga
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
