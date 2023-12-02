const router = require("express").Router();
const { getAllUsers } = require("../controllers/user");
const { verifyAdmin } = require("../middleware/auth");

router.get("/users", verifyAdmin, getAllUsers);

module.exports = router;
