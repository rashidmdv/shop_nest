const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, adminMiddleware, getUserData);

module.exports = router;
