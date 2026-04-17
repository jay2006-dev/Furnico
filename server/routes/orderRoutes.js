const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrdersById,
  updateOrderStatus,
} = require("../controllers/orderControllers");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.get("/:id", protect, getOrdersById);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;
