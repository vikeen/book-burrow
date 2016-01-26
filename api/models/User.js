/**
 * User
 * @description :: Model for storing users
 */

var HashService = require('../services/HashService');

module.exports = {
  schema: true,
  tableName: 'users',

  attributes: {
    username: {
      type: 'string',
      defaultsTo: ''
    },

    password: {
      type: 'string'
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    firstName: {
      type: 'string',
      defaultsTo: ''
    },

    lastName: {
      type: 'string',
      defaultsTo: ''
    },

    photo: {
      type: 'string',
      defaultsTo: '',
      url: true
    },

    socialProfiles: {
      type: 'object',
      defaultsTo: {}
    },

    toJSON: function () {
      var obj = this.toObject();

      delete obj.password;
      delete obj.socialProfiles;

      return obj;
    }
  },

  beforeUpdate: function (values, next) {
    if (values.hasOwnProperty('password') === false) {
      return next(true, null);
    }

    if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(values.password)) {
      return next(true, null);
    }

    return HashService.bcrypt.hash(values.password)
      .then(function (hash) {
        values.password = hash;
        next(null, values);
      }).catch(next);
  },

  beforeCreate: function (values, next) {
    if (values.hasOwnProperty('password') === false) {
      return next(true, null);
    }

    values.username = values.email;

    return HashService.bcrypt.hash(values.password)
      .then(function (hash) {
        values.password = hash;
        next(null, values);
      })
      .catch(next);
  }
};
