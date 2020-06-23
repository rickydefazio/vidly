const mongoose = require('mongoose');
const Joi = require('joi');

// Customer Model
const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 55,
    required: true
  },
  phone: {
    type: String,
    minlength: 7,
    required: true
  }
}));


// Validate a movie genre based on a set schema
function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).max(55).required(),
    phone: Joi.string().min(7).required(),
    isGold: Joi.boolean()
  }

  return Joi.validate(customer, schema);
}

module.exports = { Customer, validateCustomer }
