const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} = require("../controllers/orderControllers");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, createOrder);
router.get("/my-orders/", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.put("/", protect, admin, updateOrderStatus);

module.exports = router;
