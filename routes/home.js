const express = require('express');
const router = express.Router();

// GET - /
// Greets user to VIDLY homepage
router.get('/', (req, res) => {
  res.send('Welcome to VIDLY!');
});

module.exports = router;
