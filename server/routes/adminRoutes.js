const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getAllOrders,
  getAllProducts,
  updateProduct,
  deleteProduct,
  updateOrderStatus,
  getRevenueStats,
  getAllPayments,
} = require("../controllers/adminController");

// All admin routes require authentication and admin role
router.use(protect, isAdmin);

// Dashboard stats
router.get("/stats", getDashboardStats);

// Orders
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);

// Products
router.get("/products", getAllProducts);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Revenue
router.get("/revenue", getRevenueStats);

router.get("/payments", getAllPayments);

module.exports = router;
