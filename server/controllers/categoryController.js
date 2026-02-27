const Category = require("../models/Category");

const createCategory = async (req, res) => {
  const { name, description, image } = req.body;

  const exists = await Category.findOne({ name });
  if (exists) {
    return res.status(400).json({ message: "Category Already Exists" });
  }

  const category = await Category.create({ name, description, image });
  res.status(201).json(category);
};

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

const deleteCategory = async (req, res) => {
  const category = await Category.findOne(req.params.id);
  if (!category) {
    req.status(404).json({ message: "Category Not Found" });
  }
  await category.deleteOne();
  res.json({ message: "Category Removed" });
};

module.exports = { createCategory, getCategories, deleteCategory };
