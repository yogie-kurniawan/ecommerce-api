const router = require("express").Router();
const { postRegister, postLogin } = require("../controllers/auth");

// REGISTER
router.post("/register", postRegister);

// LOGIN
router.post("/login", postLogin);

module.exports = router;
