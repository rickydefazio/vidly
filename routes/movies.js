const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');


// GET /api/movies
// Get list of all movies
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title')
  res.send(movies);
});


// POST /api/movies
// Create new movie entry
router.post('/', auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre');

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  await movie.save();
  res.send(movie);
});


// GET /api/movie/:id
// Get selected movie based on id
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send('Invalid movie ID');
  res.send(movie);
});

// PUT /api/movie/:id
// Update movie
router.put('/:id', auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre');

  const movie = await movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  }, {
    new: true
  });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});



// DELETE /api/movie/:id
// Delete movie
router.delete('/:id', auth, async (req, res) => {
  const movies = await Movie.findOneAndRemove(req.params.id)

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});


module.exports = router;
