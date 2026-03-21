const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['active', 'archived'], default: 'active' }
});

module.exports = mongoose.model('Semester', SemesterSchema);
