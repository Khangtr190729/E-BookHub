const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const getWalletByUserId = async (userId) => {
  let wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: {
        userId,
        balance: 0,
      },
    });
  }

  return wallet;
};

const getWalletTransactions = async (userId) => {
  const wallet = await getWalletByUserId(userId);
  return await prisma.walletTransaction.findMany({
    where: { walletId: wallet.id },
    orderBy: { createdAt: "desc" },
  });
};

module.exports = {
  getWalletByUserId,
  getWalletTransactions,
};
