const express = require("express");
const router = express.Router();

const {
  createPaymentIntent,
  getAllPayments,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", protect, admin, getAllPayments);
router.post("/create-payment-intent", protect, createPaymentIntent);

module.exports = router;
