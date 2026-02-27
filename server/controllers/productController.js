const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

const getProducts = asyncHandler(async (req, res) => {
  try {
    const { category, featured, newArrival, minPrice, maxPrice, search } =
      req.query;

    let filter = {};
    if (category) filter.category = category;
    if (newArrival === true) filter.newArrival = true;
    if (featured === true) filter.featured = true;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$gte = Number(maxPrice);
    }

    if (search) {
      filter.name = { $regex: search, $options: i };
    }

    const products = await Product.find(filter).populate(category);
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: "Products Not Fetched" });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: "Product Not Found" });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product, { message: "Product Added Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Products Not Added, Failed" });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product Not Found");
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.material = req.body.material || product.material;
    product.description = req.body.description || product.description;
    product.material = req.body.material || product.material;
    product.stock = req.body.stock || product.stock;

    const updatedProduct = await product.save();
    res.status(200).json({ message: "Product Updated" }, updatedProduct);
  } catch (err) {
    res.status(404).json({ message: "Error in Updation" });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product Not Found");
    }
    await product.deleteOne();
    res.json({ message: "Product Deleted" });
  } catch (err) {
    res.status(404).json({ message: "Error in Deletion" });
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
