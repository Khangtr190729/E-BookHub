const AppError = require("../utils/AppError");

const notFoundMiddleware = (req, res, next) => {
  next(new AppError(`Không tìm thấy đường dẫn ${req.originalUrl} trên máy chủ này!`, 404));
};

module.exports = notFoundMiddleware;
