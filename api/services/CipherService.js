var cipher = require('sails-service-cipher'),
  config = require('../../config/services/cipher');

module.exports = {
  jwt: cipher('jwt', config.services.cipher.jwt)
};
