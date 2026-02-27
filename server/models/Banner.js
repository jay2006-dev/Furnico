const { timeStamp } = require("console");

const mongoose = reuire("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: String,
    sutitle: String,
    image: String,
    buttonText: String,
    buttonLink: String,
    isActive: { type: Boolean, default: true },
  },
  { timeStamp: true },
);

module.exports = mongoose.model("Banner", bannerSchema);
