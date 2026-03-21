const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Session = require('./models/Session');
const Semester = require('./models/Semester');
const UpdateLog = require('./models/UpdateLog');

// ======== SESSIONS API ========
// GET all sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const sessions = await Session.find().populate('semesterId');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a session & check real conflicts
app.post('/api/sessions', async (req, res) => {
  try {
    const { module, title, batch, lecturer, hall, day, time } = req.body;
    let conflictWarning = false;
    let message = "Session created successfully";

    const conflictingSessions = await Session.find({
      day: day,
      time: time,
      $or: [
        { hall: hall },
        { lecturer: lecturer }
      ]
    });

    if (conflictingSessions.length > 0) {
      conflictWarning = true;
      const reasons = conflictingSessions.map(c => 
        (c.hall === hall ? `Hall ${hall} is in use` : ``) + 
        (c.hall === hall && c.lecturer === lecturer ? ` AND ` : ``) +
        (c.lecturer === lecturer ? `Lecturer ${lecturer} is busy` : ``)
      ).filter(Boolean).join(', ');
      message = `Session created, but WARNING: Conflict detected. ${reasons} at ${time} on ${day}!`;
    }

    const newSession = new Session({ module, title, batch, lecturer, hall, day, time });
    await newSession.save();

    await UpdateLog.create({
      sessionId: newSession._id,
      module, lecturer, hall, day, time,
      action: 'Created',
      message: message
    });

    res.json({ session: newSession, message, conflictWarning });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a session & check real conflicts
app.put('/api/sessions/:id', async (req, res) => {
  try {
    const { hall, time, lecturer } = req.body;
    const sessionToUpdate = await Session.findById(req.params.id);
    if (!sessionToUpdate) return res.status(404).json({ error: "Session not found" });

    let conflictWarning = false;
    let message = "Updated successfully";

    const conflictingSessions = await Session.find({
      day: sessionToUpdate.day,
      time: time,
      _id: { $ne: req.params.id },
      $or: [
        { hall: hall },
        { lecturer: lecturer }
      ]
    });

    if (conflictingSessions.length > 0) {
      conflictWarning = true;
      const reasons = conflictingSessions.map(c => 
        (c.hall === hall ? `Hall ${hall} is in use` : ``) + 
        (c.hall === hall && c.lecturer === lecturer ? ` AND ` : ``) +
        (c.lecturer === lecturer ? `Lecturer ${lecturer} is busy` : ``)
      ).filter(Boolean).join(', ');
      
      message = `Updated successfully, but WARNING: Conflict detected. ${reasons} at ${time} on ${sessionToUpdate.day}!`;
    }

    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      { hall, time, lecturer },
      { new: true }
    ).populate('semesterId');

    await UpdateLog.create({
      sessionId: updatedSession._id,
      module: updatedSession.module,
      lecturer: updatedSession.lecturer,
      hall: updatedSession.hall,
      day: updatedSession.day,
      time: updatedSession.time,
      action: 'Edited',
      message: message
    });

    res.json({ session: updatedSession, message, conflictWarning });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE remove a session
app.delete('/api/sessions/:id', async (req, res) => {
  try {
    const deletedSession = await Session.findByIdAndDelete(req.params.id);
    if (!deletedSession) return res.status(404).json({ error: "Session not found" });

    await UpdateLog.create({
      sessionId: deletedSession._id,
      module: deletedSession.module,
      lecturer: deletedSession.lecturer,
      hall: deletedSession.hall,
      day: deletedSession.day,
      time: deletedSession.time,
      action: 'Deleted',
      message: 'Session was permanently removed'
    });

    res.json({ message: "Session permanently deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======== SEMESTERS API ========
// GET all semesters
app.get('/api/semesters', async (req, res) => {
  try {
    const semesters = await Semester.find();
    res.json(semesters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create semester
app.post('/api/semesters', async (req, res) => {
  try {
    const newSemester = new Semester(req.body);
    await newSemester.save();
    res.json(newSemester);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT switch status (Activate/Archive)
app.put('/api/semesters/:id', async (req, res) => {
  try {
    const { status } = req.body; // 'active' or 'archived'
    
    if (status === 'active') {
      await Semester.updateMany({}, { status: 'archived' });
    }

    const updated = await Semester.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    await UpdateLog.create({
      action: 'Semester Status Changed',
      message: `Semester ${updated.name} changed to ${status}`
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======== LOGS API ========
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await UpdateLog.find().sort({ timestamp: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop the other process or set a different PORT.`);
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});
