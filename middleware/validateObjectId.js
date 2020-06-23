const mongoose = require('mongoose');

module.exports = function (req, res, next) {
  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID.');
  }

  next();
}
