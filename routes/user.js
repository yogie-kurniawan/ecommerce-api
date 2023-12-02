const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats,
} = require("../controllers/user");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

router.get("/", verifyAdmin, getAllUsers);
router.get("/find/:id", verifyAdmin, getUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/stats", verifyAdmin, getUserStats);

module.exports = router;
