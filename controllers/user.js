const User = require("../models/User");
const { notFoundError } = require("../errors");

// GET ALL USERS
const getAllUsers = async (req, res, next) => {
  const query = req.query.new;
  const limit = 5;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(limit)
      : await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET USER
const getUser = async (req, res, next) => {
  let id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new notFoundError("User not found!");
    }
    const { password, ...rest } = user._doc;

    return res.status(200).json({ user: rest });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateUser = async (req, res, next) => {
  let id = req.params.id;
  let password = req.body.password;

  if (password) {
    password = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!user) {
      throw new notFoundError("User not found!");
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteUser = async (req, res, next) => {
  let id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new notFoundError("User not found!");
    }
    return res.status(200).json({ message: "User has been deleted!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET USER STATS
const getUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats,
};
