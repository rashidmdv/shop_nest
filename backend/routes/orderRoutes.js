const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderStatusById,
  updateOrderStatusById,
} = require("../controllers/orderController");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, adminMiddleware, getOrders)
  .post(authMiddleware, adminMiddleware, createOrder);

router
  .route("/:id")
  .put(authMiddleware, adminMiddleware, updateOrder)
  .get(authMiddleware, getOrderById)
  .delete(authMiddleware, adminMiddleware, deleteOrder);

router
  .route("/:id/status")
  .get(authMiddleware, getOrderStatusById)
  .put(authMiddleware, adminMiddleware, updateOrderStatusById);

module.exports = router;
