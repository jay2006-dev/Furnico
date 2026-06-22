const express = require("express");
require("dotenv").config();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

connectDB();

const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors(
    //{
    //   origin: (origin, callback) => {
    //     // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    //     if (!origin) return callback(null, true);

    //     // If CLIENT_URL is defined in env, restrict access. Otherwise, allow all for dev.
    //     if (process.env.CLIENT_URL) {
    //       if (allowedOrigins.includes(origin)) {
    //         return callback(null, true);
    //       } else {
    //         return callback(new Error("Not allowed by CORS"));
    //       }
    //     }
    //     return callback(null, true);
    //   },
    //   credentials: true,
    // })
  ));
app.use("/api/webhook", webhookRoutes);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/categories", require("./routes/categoryRoutes"));
app.use("/api/v1/payment", paymentRoutes);

app.get("/api/v1/health", (req, res) => {
  console.log("Furnico API running Successfully");
  return res.status(200).json({ message: "Furnico API running.." });
});

app.use(notFound);
app.use(errorHandler);

// app.use((req, res, next) => {
//   res.status(404);
//   next(new Error(`Not Found - ${req.originalUrl}`));
// });
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
