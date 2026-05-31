const { apiResponse } = require("../helpers/apiResponse");

const { Order, MINIMAL_ORDER_FIELDS } = require("../models/Order");
const orderValidationSchema = require("../Validation/orderValidation");

const createOrder = async (req, res) => {
  const { error, value } = orderValidationSchema.validate(req.body);
  if (error) return apiResponse(res, "Error", error.details[0].message, 400);
  try {
    const data = await Order.create(value);
    return apiResponse(res, "Order created successfully", data);
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

const getOrders = async (req, res) => {
  try {
    const fieldsWithoutPincode = MINIMAL_ORDER_FIELDS.replace(
      "address.pincode",
      "",
    );
    const data = await Order.find({}).select(fieldsWithoutPincode);
    return apiResponse(res, "Orders", data);
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

const getOrderById = async (req, res) => {
  try {
    const data = await Order.findById(req.params.id);
    return apiResponse(res, "Orders", data);
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

const updateOrder = async (req, res) => {
  const { error, value } = orderValidationSchema.validate(req.body);
  if (error) return apiResponse(res, "Error", error.details[0].message, 400);
  try {
    const item = await Order.findById(req.params.id);
    if (!item) {
      return apiResponse(res, "Error", "Order not found", 404);
    }
    Object.assign(item, value);
    const data = await item.save();
    return apiResponse(res, "Orders", data);
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

const deleteOrder = async () => {
  try {
    const data = await Order.findById(req.params.id);
    return apiResponse(res, "Orders", data);
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

const getOrderStatusById = async (req, res) => {
  try {
    const data = await Order.findById(req.params.id).select("status");
    return apiResponse(res, "Orders", data);
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

const updateOrderStatusById = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    order.status = req.body.status;
    const data = await order.save();
    return apiResponse(res, "Orders", data);
  } catch (e) {
    return apiResponse(res, "Error", e.message, 500);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderStatusById,
  updateOrderStatusById,
};
