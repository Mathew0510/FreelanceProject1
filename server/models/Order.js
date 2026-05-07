const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        image: String,
        quantity: Number
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    paymentId: {
      type: String
    },

    razorpayOrderId: {
      type: String
    },

    paymentStatus: {
      type: String,
      default: "Pending"
    },

    orderStatus: {
      type: String,
      default: "Processing"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);