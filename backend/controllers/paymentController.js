const Razorpay = require("razorpay");
const Order = require("../models/Order");
const crypto = require("crypto");
const {
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../utils/razorpay");

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const respose = await createRazorpayOrder(amount);
    return res.status(200).json(respose);
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const respose = await verifyRazorpayPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    );
    if (respose.success) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};


