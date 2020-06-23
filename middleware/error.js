const winston = require('winston');

module.exports = function (err, req, res, next) {
  // Log error to logfile
  winston.error(err.message, err);

  // Send internal server error
  res.status(500).send('Something failed.')
}
