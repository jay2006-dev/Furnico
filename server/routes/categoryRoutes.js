const experss = require("express");
const router = experss.Router();

const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", getCategories).post("/", protect, admin, createCategory);

router.route("/:id").delete(protect, admin, deleteCategory);

module.exports = router;
