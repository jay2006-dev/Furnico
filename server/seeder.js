const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");
const Category = require("./models/Category");

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();

    const categories = await Category.insertMany([
      { name: "Sofa", description: "Luxury Sofas" },
      { name: "Chair", description: "Modern chairs" },
      { name: "Table", description: "Dining  Tables" },
    ]);
    await Product.insertMany([
      {
        name: "Luxury Leather Sofa",
        description: "Premium leather sofa",
        price: 45999,
        discountPrice: 39999,
        category: categories[0]._id,
        stock: 5,
        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        ],
        isFeatured: true,
        isNewArrival: true,
      },
      {
        name: "Modern Dining Chair",
        description: "Comfortable velvet chair",
        price: 8999,
        discountPrice: 7499,
        category: categories[1]._id,
        stock: 10,
        images: [
          "https://images.unsplash.com/photo-1616628182500-9e3c47a032e0",
        ],
        isFeatured: true,
      },
      {
        name: "Wooden Dining Table",
        description: "Solid oak wood table",
        price: 25999,
        category: categories[2]._id,
        stock: 3,
        images: [
          "https://images.unsplash.com/photo-1600573472556-e6c1b58f1a1a",
        ],
        isNewArrival: true,
      },
    ]);

    console.log("Data Imported");
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

importData();
