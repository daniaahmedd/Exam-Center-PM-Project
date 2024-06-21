// models/trainee.js
const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true }
});

const Trainee = mongoose.model('Trainee', traineeSchema);

module.exports = Trainee;

const examSchema = new mongoose.Schema({
  // Existing exam fields
  traineeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainee', required: true },
  examDate: { type: Date, required: true },
  // Add rescheduling fields
  rescheduled: { type: Boolean, default: false },
  rescheduleReason: { type: String },
  rescheduleFee: { type: Number }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;

