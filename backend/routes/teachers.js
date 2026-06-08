const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    res.json({ success: true, teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create teacher
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    
    const teacher = new User({
      name,
      email,
      phone,
      address,
      role: 'teacher'
    });
    await teacher.save();

    res.json({ success: true, teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
