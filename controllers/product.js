const Product = require("../models/Product");
const { badRequestError, notFoundError } = require("../errors");
const path = require("path");

// GET ALL PRODUCTS
const getAllProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const limit = 5;
  try {
    let products = {};

    if (qNew) {
      products = await Product.find().sort({ _id: -1 }).limit(limit);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET PRODUCT
const getProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new notFoundError("Product not found!");
    }
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res, next) => {
  let {title, desc, categories, price} = req.body;
  let img = req.files.img;
  if (!title || !desc || !img || !categories || !price) {
    throw new badRequestError(
      "Title, desc, img, categories, and price cannot be empty!"
    );
  }

  let imgOriName = req.files.img.name;
  let imgExt = path.extname(imgOriName);
  let imgName = Date.now() + imgExt;
  let newProduct = new Product({
    title,
    desc,
    categories,
    price,
    img: imgName,
  });

  try {
    let dest = path.join(__dirname, "../public/assets/img/product/", imgName);
    const product = await Product.create(newProduct);
    img.mv(dest, function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
    });
    return res
      .status(201)
      .json({ message: "Product saved successfully", product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  let {title, desc, categories, price} = req.body;
const img = req.files.img;

  try {
let dest = path.join(__dirname, "../public/assets/img/product", imgName);
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: { title, 
desc, 
categories, 
price,img: imgName},
      },
      { new: true }
    );
    if (!product) {
      throw new notFoundError("Product not found!");
img.mv(dest, (err) => { if(err) return res.status(500).json({ message: err.message })})
    }
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new notFoundError("Product not found!");
    }
    return res.status(200).json({ message: "Product has been deleted!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
