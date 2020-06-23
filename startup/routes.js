const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const home = require('../routes/home');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const error = require('../middleware/error');

module.exports = function (app) {
  if (app.get('env') === 'development') {
    // Logs requests to the console
    app.use(morgan('tiny'));
    console.log('Morgan is enabled...');
  }

  // Parse JSON payloads
  app.use(express.json());

  // Routes
  app.use('/', home);
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/returns', returns);

  // Error Handling
  app.use(error);
}
