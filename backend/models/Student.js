const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matricule: { type: String, unique: true, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  classLevel: String,
  enrollmentDate: Date,
  status: { type: String, enum: ['active', 'inactive', 'graduated'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
