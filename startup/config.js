const config = require('config');

module.exports = function () {
  // Require jwtPrivateKey
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey not defined.');
  }
}
