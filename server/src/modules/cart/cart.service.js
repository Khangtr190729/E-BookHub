const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const getCartByUserId = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  return cart;
};

const addItemToCart = async (userId, productId) => {
  const cart = await getCartByUserId(userId);

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new AppError("Không tìm thấy sản phẩm", 404);
  }

  // Check if already in library
  const inLibrary = await prisma.userLibrary.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (inLibrary) {
    throw new AppError("Sản phẩm đã có trong thư viện của bạn", 400);
  }

  // Check if already in cart
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (existingItem) {
    return existingItem;
  }

  return await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
    },
  });
};

const removeItemFromCart = async (userId, productId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new AppError("Không tìm thấy giỏ hàng", 404);
  }

  return await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
      productId,
    },
  });
};

module.exports = {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
};
