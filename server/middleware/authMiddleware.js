const jwt = require("jsonwebtoken");
const user = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.id).select("-password");
      console.log("Protect middleware success. User ID:", req.user ? req.user._id : "NULL");
      next();
    } catch (err) {
      console.error("Protect middleware error:", err.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    console.log("Protect middleware: No token found");
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
