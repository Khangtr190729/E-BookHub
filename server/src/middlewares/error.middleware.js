const { errorResponse } = require("../utils/response");

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Lỗi máy chủ nội bộ";

  console.error("Error Middleware:", err);

  // Prisma unique constraint error
  if (err.code === "P2002") {
    return errorResponse(res, "Dữ liệu đã tồn tại", 400);
  }

  // Zod validation error
  if (err.name === "ZodError") {
    return errorResponse(res, "Dữ liệu không hợp lệ", 400, err.errors);
  }

  return errorResponse(res, err.message, err.statusCode);
};

module.exports = errorMiddleware;
