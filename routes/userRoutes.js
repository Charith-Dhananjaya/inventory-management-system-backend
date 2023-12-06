const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser, changePasssword } = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateUser", protect, updateUser);
router.patch("/changepasssword", protect, changePasssword);



module.exports = router;