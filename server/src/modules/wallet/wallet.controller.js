const walletService = require("./wallet.service");
const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");

const getWallet = asyncHandler(async (req, res) => {
  const wallet = await walletService.getWalletByUserId(req.user.id);
  return successResponse(res, "Lấy thông tin ví thành công", wallet);
});

const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await walletService.getWalletTransactions(req.user.id);
  return successResponse(res, "Lấy lịch sử giao dịch thành công", transactions);
});

module.exports = {
  getWallet,
  getTransactions,
};
