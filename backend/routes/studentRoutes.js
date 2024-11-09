
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/add", async (req, res) => {
  const { name, age, grade, rollNumber, contact } = req.body;
  try {

    const existingStudent = await Student.findOne({
      $or: [{ rollNumber }, { contact }],
    });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Roll number or contact already exists" });
    }

    const newStudent = new Student({ name, age, grade, rollNumber, contact });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put("/:id", async (req, res) => {
  const { name, age, grade, rollNumber, contact } = req.body;

  try {
  
    const existingStudent = await Student.findOne({
      $or: [{ rollNumber }, { contact }],
      _id: { $ne: req.params.id },
    });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Roll number or contact already exists" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, grade, rollNumber, contact },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
