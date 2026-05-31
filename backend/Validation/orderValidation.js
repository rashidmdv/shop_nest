const Joi = require("@hapi/joi");
const { objectIdRegex } = require("../helpers/validationHelper");

const orderValidationSchema = Joi.object({
  // 1. User Validation
  userId: Joi.string().regex(objectIdRegex).required().messages({
    "string.empty": "User ID is required",
    "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
    "any.required": "User ID is a required field",
  }),

  // 2. Items Array Validation
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().regex(objectIdRegex).required().messages({
          "string.empty": "Product ID is required for items",
          "string.pattern.base": "Product ID must be a valid MongoDB ObjectId",
          "any.required": "Product ID is required for each item",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Quantity must be a number",
          "number.min": "Quantity must be at least 1",
          "any.required": "Quantity is required",
        }),
        price: Joi.number().positive().required().messages({
          "number.base": "Price must be a number",
          "number.positive": "Price must be a positive number",
          "any.required": "Price is required",
        }),
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.min": "Order must contain at least one item",
      "any.required": "Items list is required",
    }),

  // 3. Financials & Metadata
  totalAmount: Joi.number().positive().required().messages({
    "number.base": "Total amount must be a number",
    "number.positive": "Total amount must be greater than 0",
    "any.required": "Total amount is required",
  }),

  status: Joi.string()
    .valid("pending", "shipped", "delivered", "cancelled")
    .default("pending")
    .messages({
      "any.only":
        "Status must be either pending, shipped, delivered, or cancelled",
    }),

  paymentId: Joi.string()
    .allow("", null) // Payment ID can be optional/empty initially
    .messages({
      "string.base": "Payment ID must be a string",
    }),

  // 4. Address Object Validation
  address: Joi.object({
    fullName: Joi.string().trim().required().messages({
      "string.empty": "Full name is required in address",
      "any.required": "Full name is required in address",
    }),
    address: Joi.string().trim().allow("", null),
    city: Joi.string().trim().allow("", null),
    state: Joi.string().trim().allow("", null),
    pincode: Joi.string().trim().required().messages({
      "string.empty": "Pincode is not given",
      "any.required": "Pincode is required in address",
    }),
  })
    .required()
    .messages({
      "any.required": "Shipping address is required",
    }),
});

module.exports = orderValidationSchema;
