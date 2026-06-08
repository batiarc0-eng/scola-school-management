const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

// Get payments for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId })
      .populate('studentId');
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create payment
router.post('/', async (req, res) => {
  try {
    const { studentId, amount, paymentType, term } = req.body;
    
    const payment = new Payment({
      studentId,
      amount,
      paymentType,
      term,
      status: 'pending'
    });
    await payment.save();

    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Process payment
router.put('/:id/process', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        paymentDate: new Date()
      },
      { new: true }
    );
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
