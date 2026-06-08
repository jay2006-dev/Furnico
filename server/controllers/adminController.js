const asyncHandler = require("../middleware/asyncHandler");
const { isAdmin } = require("../middleware/adminMiddleware");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Get dashboard statistics
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $match: { status: "Delivered" } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  res.json({
    totalOrders,
    totalProducts,
    totalRevenue: totalRevenue[0]?.total || 0,
  });
});

// Get all orders for admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "orderItems.product",
      select: "name price category",
      populate: {
        path: "category",
        select: "name",
      },
    })
    .sort({ createdAt: -1 });

  res.json({ orders });
});

// Get all products for admin
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .sort({ createdAt: -1 });

  res.json({ products });
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
});

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["Pending", "Processing", "Shipped", "Delivered"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate("user", "name email");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

// Get revenue statistics
const getRevenueStats = asyncHandler(async (req, res) => {
  const totalRevenue = await Order.aggregate([
    { $match: { status: "Delivered" } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  // Count only delivered orders for average calculation
  const deliveredOrdersCount = await Order.countDocuments({ status: "Delivered" });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todayRevenue = await Order.aggregate([
    {
      $match: {
        status: "Delivered",
        updatedAt: { $gte: todayStart, $lte: todayEnd },
      },
    },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  const avgOrderValue =
    deliveredOrdersCount > 0 ? (totalRevenue[0]?.total || 0) / deliveredOrdersCount : 0;

  res.json({
    totalRevenue: totalRevenue[0]?.total || 0,
    totalOrders: deliveredOrdersCount,
    avgOrderValue: avgOrderValue.toFixed(2),
    todayRevenue: todayRevenue[0]?.total || 0,
  });
});

module.exports = {
  getDashboardStats,
  getAllOrders,
  getAllProducts,
  updateProduct,
  deleteProduct,
  updateOrderStatus,
  getRevenueStats,
};
