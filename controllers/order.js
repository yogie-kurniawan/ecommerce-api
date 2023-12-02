const { badRequestError, notFoundError } = require("../errors");
const Order = require("../models/Order");

// GET ALL OrderS
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort("createdAt");
    return res.status(200).json({ orders });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET USER Order
const getOrder = async (req, res, next) => {
  let id = req.params.id;

  try {
    const orders = await Order.find({ userId: id });
    if (!orders) {
      throw new notFoundError("Order not found!");
    }
    return res.status(200).json({ orders });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// CREATE Order
const createOrder = async (req, res, next) => {
  let newOrder = new Order(req.body);
  try {
    const order = await Order.create(newOrder);
    return res.status(201).json({ order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE Order
const updateOrder = async (req, res, next) => {
  let id = req.params.id;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!order) {
      throw new notFoundError("Order not found!");
    }
    return res.status(200).json({ order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE Order
const deleteOrder = async (req, res, next) => {
  let id = req.params.id;

  try {
    let order = await Order.findByIdAndDelete(id);
    if (!order) {
      throw new notFoundError("Order not found!");
    }
    return res.status(200).json({ message: "Order has been deleted!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET MONTHLY INCOME
const getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonthMonth = new Date(new Date().setMonth(date.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({ income });
  } catch (err) {
    re.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getIncome,
};
