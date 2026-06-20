const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const getLibraryByUserId = async (userId) => {
  return await prisma.userLibrary.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
      },
    },
    orderBy: { purchasedAt: "desc" },
  });
};

const getPurchasedChapters = async (userId, productId) => {
  // Check if product is in library
  const inLibrary = await prisma.userLibrary.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (!inLibrary) {
    // If not in library, user can only see free chapters
    return await prisma.chapter.findMany({
      where: {
        productId,
        isFree: true,
      },
      orderBy: { chapterNumber: "asc" },
    });
  }

  // If in library, user can see all chapters
  return await prisma.chapter.findMany({
    where: { productId },
    orderBy: { chapterNumber: "asc" },
  });
};

module.exports = {
  getLibraryByUserId,
  getPurchasedChapters,
};
