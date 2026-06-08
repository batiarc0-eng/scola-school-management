const express = require('express');
const Grade = require('../models/Grade');
const router = express.Router();

// Get grades for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const grades = await Grade.find({ studentId: req.params.studentId })
      .populate('studentId teacherId');
    res.json({ success: true, grades });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create/Update grade
router.post('/', async (req, res) => {
  try {
    const { studentId, teacherId, subject, score, term, comments } = req.body;
    
    let grade = await Grade.findOne({ studentId, subject, term });
    
    if (grade) {
      grade.score = score;
      grade.comments = comments;
      grade.updatedAt = new Date();
    } else {
      grade = new Grade({
        studentId,
        teacherId,
        subject,
        score,
        term,
        comments
      });
    }
    
    await grade.save();
    res.json({ success: true, grade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
