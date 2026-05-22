const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");
const router = express.Router();

// all products
router
  .route("/")
  .get(getProducts)
  .post(authMiddleware, adminMiddleware, createProduct);

// specific product
router
  .route("/:id")
  .get(getProduct)
  .put(authMiddleware, adminMiddleware, updateProduct)
  .delete(authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
