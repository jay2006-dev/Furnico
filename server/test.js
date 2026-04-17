const mongoose = require("mongoose");
require("dotenv").config();
const Order = require("./models/Order");
require("./models/User");
require("./models/Product");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const order = await Order.findOne().sort({ createdAt: -1 }).populate("user").populate("orderItems.product");
  console.log("Latest Order:");
  if (order) {
    console.log("Order ID:", order._id);
    console.log("User:", order.user);
    if(order.user) {
      console.log("User _id string:", order.user._id.toString());
    } else {
      console.log("USER IS NULL WHEN POPULATED!");
    }
  } else {
    console.log("No orders found");
  }
  process.exit(0);
});
