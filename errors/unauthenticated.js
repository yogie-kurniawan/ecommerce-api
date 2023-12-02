const CustomError = require("./custom-error");

const unauthenticatedError = (message) => {
  return new CustomError(401, message);
};

module.exports = unauthenticatedError;
