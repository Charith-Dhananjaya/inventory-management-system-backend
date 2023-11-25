const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout } = require("../controllers/userController");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

module.exports = router;