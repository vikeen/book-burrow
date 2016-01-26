/**
 * BookController
 * @description :: Server-side logic for books
 */

var _ = require("lodash");

module.exports = {
  find: find,
  findOne: findOne
};

function find(req, res, next) {
  var values = req.allParams();

  sails.log.verbose("[controller] book.find");

  if (values.isbn) {
    BookService.findByISBN(values.isbn)
      .then(function(book) {
        return res.redirect("/book/" + book.isbn);
      })
      .catch(function(error) {
        sails.log.error(error);
        return res.serverError();
      });
  }
}

function findOne(req, res, next) {
  var isbn = req.param('isbn');

  sails.log.verbose("[controller] book.findOne [isbn: %s]", isbn);

  var book = {
    isbn: isbn
  };

  return res.view("book", {
    book: book
  });
}

