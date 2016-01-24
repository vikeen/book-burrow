var cipher = require('sails-service-cipher'),
  config = require('../../config/services/cipher');

module.exports = {
  jwt: jwt
};

function jwt() {
  return cipher('jwt', config.services.cipher.jwt);
}
