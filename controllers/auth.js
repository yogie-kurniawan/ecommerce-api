const User = require("../models/User");
const { badRequestError, unauthenticatedError } = require("../errors");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
const postRegister = async (req, res, next) => {
  let { name, username, email, password } = req.body;
  if (!name) {
    throw new badRequestError("Please provide name");
  }

  if (!username) {
    throw new badRequestError("Please provide username");
  }

  if (!email) {
    throw new badRequestError("Please provide email");
  }

  if (!password) {
    throw new badRequestError("Please provide password");
  }

  password = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
  const newUser = new User({ username, email, password });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
const postLogin = async (req, res, next) => {
  let { username, password } = req.body;
  if (!username) {
    throw new badRequestError("Please provide username");
  }

  if (!password) {
    throw new badRequestError("Please provide password");
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new unauthenticatedError("Wrong credentials!");
    }

    // Check Password
    const oriPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (password !== oriPassword) {
      throw new unauthenticatedError("Wrong credentials!");
    }

    const token =
      "Bearer " +
      jwt.sign(
        {
          userId: user._id,
          username: username,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

    return res.status(200).json({
      message: "Logged in Succesfully!",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  postRegister,
  postLogin,
};
