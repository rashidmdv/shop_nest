const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    // products: [
    //   {
    //     productId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Product",
    //       required: true,
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    // ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
    },
    address: {
      fullName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

// A clean, reusable string of your specific fields
const MINIMAL_ORDER_FIELDS =
  "address.fullName address.address address.pincode items totalAmount status _id";

const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
  MINIMAL_ORDER_FIELDS,
};
