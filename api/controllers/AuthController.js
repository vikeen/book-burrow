/**
 * AuthController
 * @description :: Server-side logic for authentication
 */

var _ = require('lodash');

module.exports = {
  register: register,
  login: login,
  logout: logout,
  local: local,
  facebook: facebook,
  facebookCallback: facebookCallback
};

function register(req, res, next) {
  return res.view('register');
}

function login(req, res, next) {
  return res.view('login', {
    facebookOAuthUri: sails.config.facebook.oauth.url + '?client_id=' + sails.config.facebook.oauth.appId + '&redirect_uri=' + sails.config.appUrl + sails.config.facebook.oauth.redirectPath
  });
}

function local(req, res, next) {
  AuthService.local(req, res, function (err, response) {
    if (err) {
      //req.session.messages.error = [err];
      return res.redirect('/login');
    } else {
      return res.redirect("/dashboard");
    }
  });
}

function facebook(req, res, next) {
  AuthService.facebook(req, res, function (e) {
    sails.log.error(e);
  })
}

function facebookCallback(req, res, next) {
  passport.authenticate('facebook', {failureRedirect: '/login'},
    function (req, res) {
      // Successful authentication, redirect home.
      console.log("facebook callback success");
    });
}

function logout(req, res, next) {
  AuthService.logout(req, res, function (e) {
    return res.redirect('/');
  });
}
