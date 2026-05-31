const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Get token from header
      token = req.headers.authorization.split(" ")[1];
      if (!token) return res.status(403).json({ message: "No token provided" });
      const decoded = verifyToken(token);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = { authMiddleware };
