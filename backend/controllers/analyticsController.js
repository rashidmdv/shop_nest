const { apiResponse } = require("../helpers/apiResponse");
const { Order } = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const orders = await Order.find({});
    const totalRevenue = orders.reduce(
      (total, order) => total + order.totalAmount,
      0,
    );
    return apiResponse(res, "Analytics", {
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
    });
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

module.exports = {
  getAdminAnalytics,
};
