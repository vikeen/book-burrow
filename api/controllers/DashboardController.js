/**
 * DashboardController
 * @description :: Server-side logic for the dashboard
 */

var _ = require("lodash");

module.exports = {
  index: index,
  findBook: findBook
};

function index(req, res, next) {
  sails.log.verbose('[controller] dashboard.index');

  return res.view("dashboard");
}

function findBook(req, res, next) {
  var values = req.allParams();

  sails.log.verbose("[controller] dashboard.findBook");

  if (values.isbn) {
    BookService.findByISBN(values.isbn)
      .then(function(book) {
        res.locals.book = book;
        return res.redirect("/dashboard");
      })
      .catch(function(error) {
        sails.log.error(error);
        return res.serverError();
      });
    //} else if (values.title) {
    //  sails.log.info("searching for book with [title: %s]", values.title);
    //
    //} else {
    //  sails.log.info("invalid search parameters");
    //
    //  return res.serverError();
  }
}
