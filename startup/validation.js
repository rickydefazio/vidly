const Joi = require('joi');

module.exports = function () {
  // Validation
  Joi.objectId = require('joi-objectid')(Joi);
}
