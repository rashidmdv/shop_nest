const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const { generateRandomOtp } = require("../helpers/helper");
const { apiResponse } = require("../helpers/apiResponse");
const { hashPassword, verifyPassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      // Hash The Password
      const hashedPassword = await hashPassword(password);
      const user = await User.create({ name, email, password: hashedPassword });
      if (user) {
        const otp = generateRandomOtp();
        const message = `Your OTP is ${otp}`;

        sendEmail(email, message).catch((err) => {
          console.error("Email send failed:", err.message);
        });

        return res.status(201).json({
          message: "User registered successfully",
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        return res.status(400).json({ message: "User registration failed" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  } else {
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
    return apiResponse(res, "Login successful", data);
  }
}

const getUserData = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json(users);
  } catch (error) {}
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
};
