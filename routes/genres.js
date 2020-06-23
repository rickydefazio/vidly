const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');
const validate = require('../middleware/validate');

// GET - /api/genres
// Retrieves JSON list of movie genres
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});


// GET - /api/genre/:id
// Retrieves a movie genre
router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.')

  res.send(genre);
});


// POST - /api/genres
// Create a new movie genre
router.post('/', [auth, validate(validateGenre)], async (req, res) => {
  const genre = new Genre({
    name: req.body.name
  });

  await genre.save();
  res.send(genre);
});


// PUT - /api/genre/:id
// Update a movie genre
router.put('/:id', [auth, validateObjectId, validate(validateGenre)], async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});


// DELETE - /api/genres/:id
// Delete a movie genre
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('No genre with the given ID was found.');

  res.send(genre);
});

module.exports = router;
