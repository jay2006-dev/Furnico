const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: "Products Not Fetched" });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findOne(req.params._id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: "Product Not Found" });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product, { message: "Product Added Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Products Not Added, Failed" });
  }
};

module.exports = { getProducts, getProductDetails, createProduct };
