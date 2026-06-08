const express = require('express');
const Communication = require('../models/Communication');
const router = express.Router();

// Get messages for a user
router.get('/:userId', async (req, res) => {
  try {
    const messages = await Communication.find({
      $or: [
        { senderId: req.params.userId },
        { receiverId: req.params.userId }
      ]
    }).populate('senderId receiverId');
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Send message
router.post('/', async (req, res) => {
  try {
    const { senderId, receiverId, subject, message } = req.body;
    
    const communication = new Communication({
      senderId,
      receiverId,
      subject,
      message
    });
    await communication.save();

    res.json({ success: true, communication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark as read
router.put('/:id/read', async (req, res) => {
  try {
    const communication = await Communication.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json({ success: true, communication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
