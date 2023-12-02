const router = require("express").Router();
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getIncome,
} = require("../controllers/Order");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

router.get("/", verifyAdmin, getAllOrders);
router.get("/find/:id", verifyUser, getOrder);
router.post("/", verifyUser, createOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.delete("/:id", verifyUser, deleteOrder);
router.get("/income", verifyUser, getIncome);

module.exports = router;
