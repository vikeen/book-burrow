/**
 * BookService
 * @description :: Server-side logic for books
 */

var _ = require("lodash"),
  bluebird = require("bluebird");

module.exports = {
  findByISBN: findByISBN
};

function findByISBN(isbn) {
  sails.log.info("searching for book with [isbn: %s]", isbn);

  return new bluebird(function (resolve, reject) {
    return resolve({
      isbn: isbn
    });
  });
}
