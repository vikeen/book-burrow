/**
 * AuthService
 * @description :: Server-side logic for manage users' authorization
 */

var _ = require("lodash"),
  passport = require("passport");

module.exports = {
  local: local,
  logout: logout,
  signToken: signToken
};

/**
 * Sign in by email\password
 * @param req
 * @param res
 * @param next
 */
function local(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;

    if (error || !user) {
      sails.log.error(error);
      return next(error, undefined);
    }

    var jwt = AuthService.signToken(user);

    res.cookie('book-burrow.sid', jwt.token, sails.config.session.cookie);

    next(undefined, jwt);
  })(req, res, next);
}

function logout(req, res, next) {
  req.user = false;
  res.locals.user = false;
  res.cookie('book-burrow.sid', null, {maxAge: 0});

  return next();
}

function signToken(user) {
  return {token: CipherService.jwt.encodeSync({id: user.id}), user: user}
}
