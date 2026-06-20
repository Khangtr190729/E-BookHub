const orderService = require("./order.service");
const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");

const checkout = asyncHandler(async (req, res) => {
  const result = await orderService.checkout(req.user.id);
  return successResponse(res, "Thanh toán thành công", result);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getOrdersByUserId(req.user.id);
  return successResponse(res, "Lấy danh sách đơn hàng thành công", orders);
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.user.id, parseInt(req.params.id));
  return successResponse(res, "Lấy chi tiết đơn hàng thành công", order);
});

module.exports = {
  checkout,
  getOrders,
  getOrder,
};
