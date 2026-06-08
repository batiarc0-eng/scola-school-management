const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  paymentType: { type: String, enum: ['tuition', 'exam', 'other'], default: 'tuition' },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentDate: Date,
  term: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
