// controllers/webhookController.js

const stripe = require("../config/stripe");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Payment = require("../models/Payment");

const stripeWebhook = async (req, res) => {
  console.log("Webhook received");

  const signature = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    console.log("Event Type:", event.type);

    if (event.type === "payment_intent.succeeded") {
      console.log("PAYMENT SUCCESS");

      const paymentIntent = event.data.object;

      console.log("Payment Intent ID:", paymentIntent.id);
      console.log("Metadata:", paymentIntent.metadata);

      const orderId = paymentIntent.metadata.orderId;

      if (!orderId) {
        console.log("No orderId found in metadata");
        return res.json({ received: true });
      }

      const order = await Order.findById(orderId);

      if (!order) {
        console.log("Order not found");
        return res.json({ received: true });
      }

      // Mark order as paid and status as Processing
      if (!order.isPaid) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.status = "Processing";

        await order.save();

        console.log("ORDER UPDATED");

        // Reduce stock
        for (const item of order.orderItems) {
          const updatedProduct = await Product.findByIdAndUpdate(
            item.product,
            { $inc: { stock: -item.qty } },
            { new: true }
          );
          if (updatedProduct && updatedProduct.stock < 0) {
            console.warn(`WARNING: Product ${updatedProduct.name} stock went negative (${updatedProduct.stock}) due to potential concurrent checkout.`);
          }
        }

        console.log("STOCK UPDATED");
      }

      // Save payment record (only once)
      // const existingPayment = await Payment.findOne({
      //   stripePaymentIntentId: paymentIntent.id,
      // });
      console.log("Payment Intent ID:", paymentIntent.id);

      const existingPayment = await Payment.findOne({
        stripePaymentIntentId: paymentIntent.id,
      });

      console.log("Existing Payment:", existingPayment);

      if (!existingPayment) {
        const payment = await Payment.create({
          order: order._id,
          user: order.user,
          stripePaymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          paymentMethod: "card",
        });
        console.log("PAYMENT RECORD CREATED:", payment);

        console.log("PAYMENT SAVED:", payment._id);
      } else {
        console.log("PAYMENT ALREADY EXISTS");
      }
    }

    res.status(200).json({
      received: true,
    });
  } catch (err) {
    console.error("WEBHOOK ERROR");
    console.error(err);

    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = {
  stripeWebhook,
};
