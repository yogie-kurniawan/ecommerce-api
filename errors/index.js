const CustomError = require("./custom-error");
const badRequestError = require("./bad-request");
const unauthenticatedError = require("./unauthenticated");
const forbiddenError = require("./forbidden");
const notFoundError = require("./not-found");

module.exports = {
  CustomError,
  badRequestError,
  unauthenticatedError,
  forbiddenError,
  notFoundError,
};
