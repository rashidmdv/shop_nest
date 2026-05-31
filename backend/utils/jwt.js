const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || "10d";
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  generateToken,
  verifyToken,
};
