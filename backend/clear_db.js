const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected for clearing');
    const Session = require('./models/Session');
    const UpdateLog = require('./models/UpdateLog');
    
    await Session.deleteMany({});
    await UpdateLog.deleteMany({});
    
    console.log('All dummy data cleared! You can now start with an empty database.');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
