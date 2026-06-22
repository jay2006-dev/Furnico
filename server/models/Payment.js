const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  stripePaymentIntentId: {
    type: String,
    unique: true,
  },
  amount: Number,
  currency: String,

  status: String,

  paymentMethod: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
