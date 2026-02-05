const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductDetails,
  createProduct,
} = require("../controllers/productController.js");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", getProducts);
router.get("/:id", getProductDetails);
router.post("/", protect, admin, createProduct);

module.exports = router;
