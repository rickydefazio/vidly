const mongoose = require('mongoose');
const Joi = require('joi');

// Genre Schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});


// Genre Model
const Genre = mongoose.model('Genre', genreSchema);

// Validate a movie genre based on a set schema
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  }

  return Joi.validate(genre, schema);
}

module.exports = { Genre, validateGenre, genreSchema }
