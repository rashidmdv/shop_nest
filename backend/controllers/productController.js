const { apiResponse } = require("../helpers/apiResponse");
const Product = require("../models/Product");
const { uploadFile } = require("../config/cloudinary");
const { generateProductCode } = require("../helpers/helper");

const getProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    return apiResponse(res, "Products", product);
  } catch (error) {
    return apiResponse(res, "Error", error.message, 400);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return apiResponse(res, "Product not found", null, 404);
    return apiResponse(res, "Products", product);
  } catch (error) {
    return apiResponse(res, "Error", error.message, 400);
  }
};

const createProduct = async (req, res) => {
  // req.check("name", "Name is required").notEmpty();
  // req.check("price", "Price is required").notEmpty();
  // var errors = req.validationErrors();
  // if (errors) {
  //   console.log(errors);
  //   res.json({
  //     success: false,
  //     message: "Invalid inputs",
  //     errors: errors,
  //   });
  // }
  const { name, price, description, category, stock } = req.body || {};
  let imageUrl = "";
  try {
    if (req.file) {
      const result = await uploadFile(req.file.path);
      imageUrl = result.secure_url;
    }
    const productCode = await generateProductCode();
    const data = await Product.create({
      name,
      price,
      productCode,
      imageUrl,
      description,
      category,
      stock,
    });
    return apiResponse(res, "Product created successfully", data);
  } catch (error) {
    return apiResponse(res, "Error", error.message, 400);
  }
};

const updateProduct = async () => {
  const { name, price, description, category, stock } = req.body || {};
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return apiResponse(res, "Product not found", null, 404);
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    if (req.file) {
      const result = await uploadFile(req.file.path);
      product.imageUrl = result.secure_url;
    }
    const data = await product.save();
    return apiResponse(res, "Product Updated successfully", data);
  } catch (error) {
    return apiResponse(res, "Error", error.message, 400);
  }
};

const deleteProduct = async () => {
  try {
    const product = await Prfoduct.findById(req.params.id);
    if (!product) return apiResponse(res, "Product not found", null, 404);
    const data = await product.deleteOne();
    return apiResponse(res, "Product deleted successfully", data);
  } catch (error) {
    return apiResponse(res, "Error", error.message, 400);
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
