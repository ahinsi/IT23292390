const mongoose = require('mongoose');
const Session = require('./models/Session');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected for seeding');
    
    // Dummy Data
    const sessions = [
      { title: "Software Engineering", batch: "Y2S1", module: "SE101", lecturer: "Dr. Smith", hall: "Hall A", day: "Monday", time: "08:00 AM - 10:00 AM" },
      { title: "Database Systems", batch: "Y2S1", module: "DB201", lecturer: "Prof. John", hall: "Hall B", day: "Tuesday", time: "10:00 AM - 12:00 PM" },
      { title: "Network Configuration", batch: "Y3S2", module: "NW301", lecturer: "Mr. Alex", hall: "Lab 1", day: "Wednesday", time: "01:00 PM - 03:00 PM" },
      { title: "Data Structures", batch: "Y1S2", module: "CS102", lecturer: "Dr. Alan", hall: "Hall C", day: "Thursday", time: "09:00 AM - 11:00 AM" }
    ];

    await Session.deleteMany(); // clear existing
    await Session.insertMany(sessions);
    console.log('Dummy sessions added!');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
