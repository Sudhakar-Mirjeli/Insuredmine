const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = '5058'
const app = express();
const osUtils = require('os-utils');
const routes = require('./routes/routes')
let connectToMongoDB = require('./dbConnection')

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// DB connection
connectToMongoDB()

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong! : server crashed')
});

// API routes
app.use('/api', routes)

mongoose.connection.on('connected', () => {
  console.info(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`)
  console.info(` Data Base connection successful. `)
  console.info(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`)
});

mongoose.connection.on('error', (err) => {
  console.info(`***********************************`)
  console.info(` Failed to connect MongoDB. ${err} `)
  console.info(`*************************************`)
});

// Threshold for CPU usage
const cpuThreshold = 0.7; // 70%

// Function to restart the server
const restartServer = () => {
  app.close(() => {
    console.log('Server closed. Restarting...');
    server = app.listen(PORT, () => {
      console.log(`Server restarted on port ${PORT}.`);
    });
  });
};

// Monitor CPU usage
setInterval(() => {
  osUtils.cpuUsage((cpuUsage) => {
    if (cpuUsage > cpuThreshold) {
      console.log('CPU usage is high. Restarting server...');
      restartServer();
    }
  });
}, 1000); // Checks every second



let server = app.listen(PORT, () => {
  console.info(`############################################`)
  console.info(` Server is running on ${PORT} successfully. `)
  console.info(`############################################`)
});

module.exports = app