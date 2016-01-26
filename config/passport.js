/**
 * Passport configuration file where you should configure all your strategies
 * @description :: Configuration file where you configure your passport
 *     authentication
 */

var _ = require('lodash'),
  passport = require('passport'),
  Promise = require('bluebird'),
  LocalStrategy = require('passport-local').Strategy,
  JwtStrategy = require('passport-jwt').Strategy;
//FacebookTokenStrategy = require 'passport-facebook-token';

/**
 * Configuration object for local strategy
 * @type {Object}
 * @private
 */

var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
};

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
var JWT_STRATEGY_CONFIG = {
  secretOrKey: '12fc3531c53ebe558747624b486cded9948e30f3bcbb146629838f1f940e45ac',
  passReqToCallback: true
};

/**
 * Configuration object for social strategies
 * @type {Object}
 * @private
 */
var SOCIAL_STRATEGY_CONFIG = {
  clientID: '-',
  clientSecret: '-',
  consumerKey: '-',
  consumerSecret: '-',
  passReqToCallback: true
};

/**
 * Triggers when user authenticates via local strategy
 * @param {Object} req Request object
 * @param {String} email Email from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
var _onLocalStrategyAuth = function (req, email, password, next) {
  User
    .findOne({email: email})
    .then(function (user) {
      if (!user) {
        return next(null, null, sails.config.errors.USER_NOT_FOUND);
      }
      if (!HashService.bcrypt.compareSync(password, user.password)) {
        return next(null, null, sails.config.errors.USER_NOT_FOUND);
      }
      return next(null, user, null);
    })
    .catch(next);
};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
var _onJwtStrategyAuth = function (req, payload, next) {
  User
    .findOne({id: payload.id})
    .then(function (user) {
      if (!user) {
        return next(null, null, sails.config.errors.USER_NOT_FOUND);
      }

      return next(null, user, null);
    })
    .catch(next);
};

/**
 * Triggers when user authenticates via one of social strategies
 * @param {Object} req Request object
 * @param {String} accessToken Access token from social network
 * @param {String} refreshToken Refresh token from social network
 * @param {Object} profile Social profile
 * @param {Function} next Callback
 * @private
 */
var _onSocialStrategyAuth = function (req, accessToken, refreshToken, profile, next) {
    sails.log.verbose("_onSocialStrategyAuth()");
    if (!req.user) {
      var criteria = {};
      criteria['socialProfiles.' + profile.provider + '.id'] = profile.id;

      var model = {
        username: profile.username || profile.displayName || '',
        email: (profile.emails[0] && profile.emails[0].value) || '',
        firstName: (profile.name && profile.name.givenName) || '',
        lastName: (profile.name && profile.name.familyName) || '',
        photo: (profile.photos[0] && profile.photos[0].value) || '',
        socialProfiles: {}
      };
      model.socialProfiles[profile.provider] = profile._json;

      User
        .findOrCreate(criteria, model)
        .then(function (user) {
          if (!user)
            return next(null, null, sails.config.errors.AUTH_FAILED);
          return next(null, user, {});
        })
        .catch(next);
    } else {
      req.user.socialProfiles[profile.provider] = profile._json;
      req.user.save(next);
    }
  }
  ;

module.exports = {
  passport: {
    /**
     * Triggers when all Passport steps is done and user profile is parsed
     * @param {Object} req Request object
     * @param {Object} res Response object
     * @param {Object} error Object with error info
     * @param {Object} user User object
     * @param {Object} info Information object
     * @param {Function} next
     * @returns {*}
     * @private
     */
    onPassportAuth: function (req, res, error, user, info, next) {
      if (error || !user) {
        sails.log.error(error);
        return next(error, false);
      }

      sails.log.verbose("user authentication successful", {
        token: CipherService.jwt.encodeSync({id: user.id}),
        user: user
      });

      return next(false, {
        token: CipherService.jwt.encodeSync({id: user.id}),
        user: user
      });
    }
  }
};

passport.use(new LocalStrategy(_.assign({}, LOCAL_STRATEGY_CONFIG), _onLocalStrategyAuth));
passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
//passport.use(new FacebookTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));

//passport.use(new FacebookTokenStrategy({
//    clientID: process.env.BOOK_BURROW_FACEBOOK_APP_ID,
//    clientSecret: process.env.BOOK_BURROW_FACEBOOK_APP_SECRET
//  },
//  function (accessToken, refreshToken, profile, done) {
//    console.log("authentication complete");
//    console.log(arguments);
//    done(accessToken, refreshToken, profile);
//  }
//));
