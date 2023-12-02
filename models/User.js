const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    //   createdAt:Date.now() // you don't have to do this if you use mongoose
  },
  { timestamps: true } // it's going to create createdAt and updatedAt times
);

module.exports = mongoose.model("User", UserSchema);
