const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Chair", "Table", "Sofa", "Bed", "Storage"],
      required: true,
    },
    material: {
      type: String,
    },
    description: { type: String },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
