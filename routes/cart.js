const router = require("express").Router();
const {
  getAllCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

router.get("/", verifyAdmin, getAllCarts);
router.get("/find/:id", verifyUser, getCart);
router.post("/", verifyUser, createCart);
router.put("/:id", verifyUser, updateCart);
router.delete("/:id", verifyUser, deleteCart);

module.exports = router;
