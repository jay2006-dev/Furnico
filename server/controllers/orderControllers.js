const Order = require("../models/Order");
const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/Product");

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(200).json({ message: "No Order Items" });
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

  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.qty },
    });
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });
  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product",
      "name price",
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

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order Not Found" });
  }

  order.status = req.body.status || order.status;
  await order.save();

  res.json(order);
});

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
