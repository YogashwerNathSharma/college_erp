const express = require("express");
const router = express.Router();

const Class = require("../models/Class");
const Section = require("../models/Section");
const Subject = require("../models/Subject");

/* ===== GET CLASSES ===== */
router.get("/classes", async (req, res) => {
  try {
    const data = await Class.find({ isActive: true });
    res.json(data);
  } catch (err) {
    console.error("CLASS FETCH ERROR:", err);
    res.status(500).json({ error: "Class fetch failed" });
  }
});
/* ===== SAVE CLASS ===== */
router.post("/classes", async (req, res) => {
  try {
    const { name, orderNo } = req.body;

    const newClass = new Class({
      name,
      orderNo,
      isActive: true
    });

    await newClass.save();
    res.json({ message: "Class saved" });

  } catch (err) {
    console.error("CLASS SAVE ERROR:", err);
    res.status(500).json({ error: "Class save failed" });
  }
});

/* ===== UPDATE CLASS ===== */
router.put("/classes/:id", async (req, res) => {
  try {
    const { name, orderNo, isActive } = req.body;

    await Class.findByIdAndUpdate(req.params.id, {
      name,
      orderNo,
      isActive
    });

    res.json({ message: "Class updated" });

  } catch (err) {
    console.error("CLASS UPDATE ERROR:", err);
    res.status(500).json({ error: "Class update failed" });
  }
});

/* ===== SOFT DELETE CLASS ===== */
router.delete("/classes/:id", async (req, res) => {
  try {
    await Class.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Class deactivated" });
  } catch (err) {
    console.error("CLASS DELETE ERROR:", err);
    res.status(500).json({ error: "Class delete failed" });
  }
});

/* ===== GET SECTIONS ===== */
//const Section = require("../models/Section");

/* ===== GET SECTIONS ===== */
router.get("/sections", async (req, res) => {
  try {
    const data = await Section.find({ isActive: true }).sort({ name: 1 });
    res.json(data);
  } catch (err) {
    console.error("SECTION FETCH ERROR:", err);
    res.status(500).json({ error: "Section fetch failed" });
  }
});

/* ===== SAVE SECTION ===== */
router.post("/sections", async (req, res) => {
  try {
    const { name } = req.body;

    const section = new Section({
      name,
      isActive: true
    });

    await section.save();
    res.json({ message: "Section saved" });
  } catch (err) {
    console.error("SECTION SAVE ERROR:", err);
    res.status(500).json({ error: "Section save failed" });
  }
});

/* ===== UPDATE SECTION ===== */
router.put("/sections/:id", async (req, res) => {
  try {
    const { name, isActive } = req.body;

    await Section.findByIdAndUpdate(req.params.id, {
      name,
      isActive
    });

    res.json({ message: "Section updated" });
  } catch (err) {
    console.error("SECTION UPDATE ERROR:", err);
    res.status(500).json({ error: "Section update failed" });
  }
});

/* ===== SOFT DELETE SECTION ===== */
router.delete("/sections/:id", async (req, res) => {
  try {
    await Section.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Section deactivated" });
  } catch (err) {
    console.error("SECTION DELETE ERROR:", err);
    res.status(500).json({ error: "Section delete failed" });
  }
});


/* ===== GET SUBJECTS (WITH MAPPING) ===== */
router.get("/subjects", async (req, res) => {
  try {
    const data = await Subject.find({ isActive: true })
      .populate("classId", "name")
      .populate("sectionId", "name");

    res.json(data);
  } catch (err) {
    console.error("SUBJECT FETCH ERROR:", err);
    res.status(500).json({ error: "Subject fetch failed" });
  }
});

/* ===== SAVE SUBJECT ===== */
router.post("/subjects", async (req, res) => {
  try {
    const { name, classId, sectionId } = req.body;

    const subject = new Subject({
      name,
      classId,
      sectionId,
      isActive: true
    });

    await subject.save();
    res.json({ message: "Subject saved" });

  } catch (err) {
    console.error("SUBJECT SAVE ERROR:", err);
    res.status(500).json({ error: "Subject save failed" });
  }
});

module.exports = router;
