const mongoose = require('mongoose');

const UpdateLogSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  module: String,
  lecturer: String,
  hall: String,
  time: String,
  day: String,
  action: { type: String, default: 'Edited' },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UpdateLog', UpdateLogSchema);
