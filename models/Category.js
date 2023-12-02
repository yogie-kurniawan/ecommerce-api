const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    //   createdAt:Date.now() // you don't have to do this if you use mongoose
  },
  { timestamps: true } // it's going to create createdAt and updatedAt times
);

module.exports = mongoose.model("Category", CategorySchema);
