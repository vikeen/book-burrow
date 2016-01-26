/**
 * UserController
 * @description :: Server-side logic for manage users
 */

var _ = require("lodash");

module.exports = {
  create: create
};

function create(req, res, next) {
  var values = _.omit(req.allParams(), 'id');

  sails.log.info('[controller] user.create');

  return User.create(values)
    .then(function (user) {
      AuthService.local(req, res, function (err, response) {
        if (err) {
          sails.log.error("user failed authentication after begin created. Something went terrible wrong");
          return res.serverError();
        } else {
          return res.redirect("/dashboard");
        }
      });
    })
    .catch(function (e) {
      //req.session.messages.error = _.flatten(_.values(e.invalidAttributes));
      return res.redirect('/register');
    });
}
