var hash = require('sails-service-hash'),
  config = require('../../config/services/hash');

module.exports = {
  bcrypt: hash('bcrypt', config.services.hash.bcrypt)
};
