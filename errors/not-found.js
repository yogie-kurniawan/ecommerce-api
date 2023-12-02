const CustomError = require("./custom-error");

const notFoundError = (message) => {
  return new CustomError(404, message);
};

module.exports = notFoundError;
