const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    //   createdAt:Date.now() // you don't have to do this if you use mongoose
  },
  { timestamps: true } // it's going to create createdAt and updatedAt times
);

module.exports = mongoose.model("Cart", CartSchema);
