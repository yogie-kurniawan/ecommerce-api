const CustomError = require("./custom-error");

const badRequestError = (message) => {
  return new CustomError(400, message);
};

module.exports = badRequestError;
