const CustomError = require("./custom-error");

const forbiddenError = (message) => {
  return new CustomError(403, message);
};

module.exports = forbiddenError;
