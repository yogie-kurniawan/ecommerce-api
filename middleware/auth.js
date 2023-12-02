const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  badRequestError,
  unauthenticatedError,
  forbiddenError,
} = require("../errors");

const verifyToken = async (req, res, next) => {
  console.log(req.headers.token);
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new unauthenticatedError("Your are not authenticated!");
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    const { id } = decoded;
    const user = await User.findOne({ _id: id });
    user = { id, isAdmin: user.isAdmin };
    return user;
  } catch (err) {
    throw new unauthenticatedError("Token is not valid!");
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const user = await verifyToken(req, res, next);
  } catch (err) {
    console.log(err);
  }
  return next();
};
// const verify = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       return next();
//     } else {
//       throw new forbiddenError("You are not allowed to do this action!");
//     }
//   });
// };

const verifyAdmin = (req, res, next) => {
  const user = verifyToken(req, res, next);
  console.log(user.id);
  return next();
};
// const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.isAdmin) {
//       return next();
//     } else {
//       throw new forbiddenError("You are not allowed to do this action!");
//     }
//   });
// };

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
