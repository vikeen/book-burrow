/**
 * checkAuthentication
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

var passport = require("passport");

module.exports = function (req, res, next) {
  req.user = false;
  res.locals.user = false;
  req.session.authenticated = false;

  /*
   * If the user has a cookie value then attach it as a authorization header
   * The JWT parser will authenticate it from this point later
   */
  if (req.cookies["book-burrow.sid"]) {
    req.headers["authorization"] = "JWT " + req.cookies["book-burrow.sid"];

    passport.authenticate('jwt', function (error, user, info) {
      error = error || info;

      if (error) {
        sails.log.error(error);
        return next();
      }

      if (!user) {
        sails.log.error("Unable to authenticate user from jwt token");
        return next();
      }

      sails.log.verbose("Successful jwt authentication for [user.id: " + user.id + "]");
      req.user = user;
      res.locals.user = user;
      req.session.authenticated = true;

      return next();
    })(req, res);
  } else {
    return next();
  }
};
