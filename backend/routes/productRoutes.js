const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");
const upload = require("../config/multer");

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const router = express.Router();

// all products
router
  .route("/")
  .get(getProducts)
  .post(authMiddleware, adminMiddleware, upload.single("image"), createProduct);

// specific product
router
  .route("/:id")
  .get(getProductById)
  .put(authMiddleware, adminMiddleware, upload.single("image"), updateProduct)
  .delete(authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
