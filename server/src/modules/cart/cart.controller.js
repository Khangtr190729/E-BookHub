const cartService = require("./cart.service");
const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");

const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCartByUserId(req.user.id);
  return successResponse(res, "Lấy giỏ hàng thành công", cart);
});

const addItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const cartItem = await cartService.addItemToCart(req.user.id, parseInt(productId));
  return successResponse(res, "Thêm sản phẩm vào giỏ hàng thành công", cartItem);
});

const removeItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  await cartService.removeItemFromCart(req.user.id, parseInt(productId));
  return successResponse(res, "Xóa sản phẩm khỏi giỏ hàng thành công");
});

module.exports = {
  getCart,
  addItem,
  removeItem,
};
