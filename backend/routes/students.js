const express = require('express');
const Student = require('../models/Student');
const User = require('../models/User');
const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('userId parentId');
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create student
router.post('/', async (req, res) => {
  try {
    const { name, matricule, classLevel, parentId } = req.body;
    
    const user = new User({
      name,
      role: 'student'
    });
    await user.save();

    const student = new Student({
      userId: user._id,
      matricule,
      classLevel,
      parentId
    });
    await student.save();

    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('userId parentId');
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('userId parentId');
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
