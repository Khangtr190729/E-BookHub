const app = require("./app");
const env = require("./config/env");

const PORT = env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Máy chủ đang chạy tại: http://localhost:${PORT}`);
  console.log(`🔧 Chế độ: ${env.NODE_ENV}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Đang tắt máy chủ...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
