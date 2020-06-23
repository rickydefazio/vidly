const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const db = config.get('db');

  // Connect to MongoDB database
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
    .then(() => console.log(`Sucessfully connected to ${ db }...`));
}
