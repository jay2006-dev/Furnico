const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(200).json({ message: "No Order Items" });
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });
  res.status(201).json(order);
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: "Fetch Error Occured" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: "Fetch Error Occured" });
  }
};

const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order Not Found" });
  }

  order.status = req.body.status || order.status;
  await order.save();

  res.json(order);
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
