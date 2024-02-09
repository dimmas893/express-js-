const handleServerError = (res, error) => {
  console.error("Server error:", error);
  res.status(500).json({
    code: 500,
    message: "Internal server error",
    error: error.message,
  });
};
module.exports = {
  handleServerError,
};
