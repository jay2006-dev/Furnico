const stripe = require("../config/stripe");
const Payment = require("../models/Payment");
const Order = require("../models/Order");

const createPaymentIntent = async (req, res) => {
  try {

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Authorization check: User must own the order or be admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to pay for this order" });
    }

    if (order.isPaid) {
      return res.status(400).json({ message: "Order has already been paid" });
    }

    let clientSecret;

    // Check if there is already an existing payment intent on the order
    if (order.stripePaymentIntentId) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(order.stripePaymentIntentId);
        // If the amount matches the order total price, reuse the client secret
        if (paymentIntent.amount === Math.round(order.totalPrice * 100)) {
          clientSecret = paymentIntent.client_secret;
        }
      } catch (err) {
        console.warn("Could not retrieve existing payment intent, creating a new one:", err.message);
      }
    }

    if (!clientSecret) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.totalPrice * 100),
        currency: "inr",
        metadata: {
          orderId: order._id.toString(),
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      order.stripePaymentIntentId = paymentIntent.id;
      await order.save();

      clientSecret = paymentIntent.client_secret;
    }

    res.json({
      clientSecret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate("user", "name email")
      .populate("order")
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPaymentIntent,
  getAllPayments,
};
