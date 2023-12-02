const { badRequestError, notFoundError } = require("../errors");
const Cart = require("../models/Cart");

// GET ALL CARTS
const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find().sort("createdAt");
    return res.status(200).json({ carts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET USER CART
const getCart = async (req, res, next) => {
  let userId = req.params.id;
  try {
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      throw new notFoundError("Cart not found!");
    }
    return res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// CREATE CART
const createCart = async (req, res, next) => {
  let newCart = new Cart(req.body);
  try {
    const cart = await Cart.create(newCart);
    return res.status(201).json({ cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE CART
const updateCart = async (req, res, next) => {
  let id = req.params.id;

  try {
    const cart = await Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!cart) {
      throw new notFoundError("Cart not found!");
    }
    return res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE CART
const deleteCart = async (req, res, next) => {
  let id = req.params.id;

  try {
    let cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      throw new notFoundError("Cart not found!");
    }
    return res.status(200).json({ message: "Cart has been deleted!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
};
