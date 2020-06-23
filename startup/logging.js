const winston = require('winston');
const { exitOnError } = require('winston');
require('express-async-errors');

module.exports = function () {
  // Logging uncaught exceptions
  process.on('uncaughtException', (err) => {
    winston.error(err.message, err);
    console.error(err);

    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

  // Logging unhandled rejection
  process.on('unhandledRejection', (err) => {
    winston.error(err.message, err);
    console.error(err);

    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

  // Logging Errors to File
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
}
