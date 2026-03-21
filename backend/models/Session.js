const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  semesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' },
  title: String,
  batch: String,
  module: String,
  lecturer: String,
  hall: String,
  day: String,
  time: String
});

module.exports = mongoose.model('Session', SessionSchema);
