const { successResponse } = require("../../utils/response");

const checkHealth = (req, res) => {
  return successResponse(res, "Máy chủ đang hoạt động bình thường", {
    status: "OK",
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  checkHealth,
};
