const Razorpay = require("razorpay");

const createRazorpayOrder = async (
  amount,
  order_id,
  notes,
  currency = "INR",
) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount, // Amount is in currency subunits.
      currency: currency,
      receipt: order_id,
      notes: notes,
    };

    const order = await instance.orders.create(options);
    return {
      success: true,
      message: "Order created successfully",
      data: order,
    };
  } catch (e) {
    return {
      success: false,
      message: "Order creation failed",
      data: [],
    };
  }
};

const verifyRazorpayPayment = (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
) => {
  try {
    const verificationBody = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(verificationBody.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return {
        success: true,
        message: "Payment verified successfully",
      };
    } else {
      // Signatures do not match; potential fraud attempt
      return {
        success: false,
        message: "Payment verification failed",
      };
    }
  } catch (e) {
    return {
      success: false,
      message: "Payment verification failed",
    };
  }
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment,
};

// success response of create order

// {
//   "id": "order_DaZlswtdcn9UNV",
//   "entity": "order",
//   "amount": 50000,
//   "amount_paid": 0,
//   "amount_due": 50000,
//   "currency": "<currency>",
//   "receipt": "Receipt #20",
//   "status": "created",
//   "attempts": 0,
//   "notes": {
//     "key1": "value1",
//     "key2": "value2"
//   },
//   "created_at": 1572502745
// }
