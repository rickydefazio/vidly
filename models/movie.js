const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

// Movie Model
const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 255,
    require: true
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  }
}))


// Validate a movie movie based on a set schema
function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(1).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  }

  return Joi.validate(movie, schema);
}


module.exports = { Movie, validateMovie };
