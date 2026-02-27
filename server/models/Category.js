const { timeStamp } = require("console");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: String,
    image: String,
  },
  { timeStamp: true },
);

module.exports = mongoose.model("Category", categorySchema);
