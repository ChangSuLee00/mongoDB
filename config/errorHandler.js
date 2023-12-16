const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  let stack = "";

  console.error("Error: ", error.message);

  if (process.env.NODE_ENV === "development") {
    stack = error.stack;

    console.error("Stack: ", stack);
  }

  res.status(statusCode).json({
    success: false,
    message: message || "An unexpected error occurred",
    stack: stack,
  });
};

export default errorHandler;
