/**
 * HomeController
 * @description :: Server-side logic for application homepage
 */

var _ = require("lodash");

module.exports = {
  index: index
};

/*
 * @param req
 * @param res
 * @param next
 */
function index(req, res, next) {
  res.view('homepage');
}
