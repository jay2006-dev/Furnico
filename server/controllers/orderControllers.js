const Order = require("../models/Order");
const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/Product");
const stripe = require("../config/stripe");

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No Order Items" });
  }

  //Validate Product IDs
  if (
    !orderItems.every((item) => mongoose.Types.ObjectId.isValid(item.product))
  ) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  //Checking Stock availability

  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      res.status(404);
      throw new Error("Product Not Found");
    }

    if (product.stock < item.qty) {
      res.status(400);
      throw new Error(`Insufficient Stock for ${product.name}`);
    }
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalPrice * 100),
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

  res.status(201).json({
    order,
    clientSecret: paymentIntent.client_secret,
  });
});

const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product",
      "name price images",
    );
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: "Fetch Error Occured" });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: "Fetch Error Occured" });
  }
});

const getOrdersById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("orderItems.product", "name price images");


  if (!order) {
    return res.status(404).json({ message: "Order Not Found" });
  }


  // 🔐 Authorization check
  if (order.user._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  res.json(order);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order Not Found" });
  }

  order.status = req.body.status || order.status;
  await order.save();

  res.json(order);
});

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrdersById,
  updateOrderStatus,
};
