const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');

// GET /api/users/me
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  res.send(user);
});

// POST /api/users
// Register a new user
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  // Salt & Hash user password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  // Set auth token header and send user object
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
});



module.exports = router;
