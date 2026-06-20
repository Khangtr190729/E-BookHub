const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const getAllProducts = async (query) => {
  const { genre, type, search } = query;
  
  const where = {
    status: "PUBLISHED",
  };

  if (genre) {
    where.genres = {
      some: {
        genre: {
          slug: genre,
        },
      },
    };
  }

  if (type) {
    where.productType = type;
  }

  if (search) {
    where.title = {
      contains: search,
    };
  }

  return await prisma.product.findMany({
    where,
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      creator: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      creator: true,
      chapters: {
        orderBy: {
          chapterNumber: "asc",
        },
        select: {
          id: true,
          title: true,
          chapterNumber: true,
          isFree: true,
          createdAt: true,
        },
      },
    },
  });

  if (!product) {
    throw new AppError("Không tìm thấy sản phẩm", 404);
  }

  return product;
};

const getChaptersByProductId = async (productId) => {
  return await prisma.chapter.findMany({
    where: { productId },
    orderBy: {
      chapterNumber: "asc",
    },
    select: {
      id: true,
      title: true,
      chapterNumber: true,
      isFree: true,
      createdAt: true,
    },
  });
};

const getChapterById = async (id) => {
  const chapter = await prisma.chapter.findUnique({
    where: { id },
    include: {
      product: true,
    },
  });

  if (!chapter) {
    throw new AppError("Không tìm thấy chương truyện", 404);
  }

  return chapter;
};

module.exports = {
  getAllProducts,
  getProductById,
  getChaptersByProductId,
  getChapterById,
};
