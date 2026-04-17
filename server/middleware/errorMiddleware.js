const errorHandler = (err, req, res, next) => {
  console.error("ERROR HANDLER CAUGHT:", err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Mask internal code errors with a generic message for 500 status codes
  const message = statusCode === 500 ? "Something went wrong" : err.message;

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const notFound = async (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
