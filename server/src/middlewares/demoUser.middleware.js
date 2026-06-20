/**
 * Middleware giả lập người dùng cho giai đoạn MVP (Development).
 * Sẽ được thay thế bằng module Auth (JWT) sau này.
 */
const demoUserMiddleware = (req, res, next) => {
  // TODO: Thay thế bằng logic xác thực JWT thực tế khi module Auth hoàn thiện.
  req.user = {
    id: 1, // ID của user reader01 trong seed.js
    role: "USER"
  };
  next();
};

module.exports = demoUserMiddleware;
