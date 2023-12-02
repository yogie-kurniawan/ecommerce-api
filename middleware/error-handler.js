const { CustomError } = require("../errors");

const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
