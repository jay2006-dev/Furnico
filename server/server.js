const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/categories", require("./routes/categoryRoutes"));
app.use(notFound);
app.use(errorHandler);

// app.use((req, res, next) => {
//   res.status(404);
//   next(new Error(`Not Found - ${req.originalUrl}`));
// });
// app.use(errorHandler);

app.get("/api/v1/health", (req, res) => {
  console.log("Furnico API running Successfully");
  return res.status(200).json({ message: "Furnico API running.." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
