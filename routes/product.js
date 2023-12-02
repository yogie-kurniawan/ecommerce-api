const router = require("express").Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { verifyUser, verifyAdmin } = require("../middleware/auth");
// index.js

router.get("/", getAllProducts);
router.get("/find/:id", getProduct);
// router.get("/create", (req, res) => {
//   return res.render("product/create");
// });
router.post("/create", createProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

module.exports = router;
