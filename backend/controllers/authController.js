const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const { generateToken } = require("../helpers/helper");
const { responseWithSuccess } = require("../helpers/apiResponse");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      // Hash The Password
      // with out salt - same password will have same hash
      // const hashedPassword = await bcrypt.hash(password, 10);
      // with salt - this is more secure, same password will have different hash
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({ name, email, password: hashedPassword });
      if (user) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
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
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // return res.status(200).json({
      //   message: "Login successful",
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   role: user.role,
      //   token: generateToken(user._id),
      // });
      responseWithSuccess(res,)
    } else {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
  }
}

const getUserData = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {}
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
};
