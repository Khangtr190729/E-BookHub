const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const checkout = async (userId) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Get cart items
    const cart = await tx.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError("Giỏ hàng của bạn đang trống", 400);
    }

    // 2. Calculate total price
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price);
    }, 0);

    // 3. Check wallet balance
    const wallet = await tx.wallet.findUnique({
      where: { userId },
    });

    if (!wallet || Number(wallet.balance) < totalAmount) {
      throw new AppError("Số dư ví không đủ để thanh toán", 400);
    }

    // 4. Create store order
    const order = await tx.storeOrder.create({
      data: {
        userId,
        totalAmount,
        status: "COMPLETED",
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // 5. Deduct wallet balance
    await tx.wallet.update({
      where: { userId },
      data: {
        balance: {
          decrement: totalAmount,
        },
      },
    });

    // 6. Create wallet transaction
    await tx.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: "PURCHASE",
        amount: totalAmount,
        description: `Thanh toán đơn hàng #${order.id}`,
        referenceType: "ORDER",
        referenceId: order.id,
      },
    });

    // 7. Add to library
    for (const item of cart.items) {
      await tx.userLibrary.upsert({
        where: {
          userId_productId: {
            userId,
            productId: item.productId,
          },
        },
        update: {},
        create: {
          userId,
          productId: item.productId,
        },
      });
    }

    // 8. Clear cart
    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return order;
  });
};

const getOrdersByUserId = async (userId) => {
  return await prisma.storeOrder.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getOrderById = async (userId, orderId) => {
  const order = await prisma.storeOrder.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order || order.userId !== userId) {
    throw new AppError("Không tìm thấy đơn hàng", 404);
  }

  return order;
};

module.exports = {
  checkout,
  getOrdersByUserId,
  getOrderById,
};
