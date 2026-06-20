const productService = require("./product.service");
const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts(req.query);
  return successResponse(res, "Lấy danh sách sản phẩm thành công", products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(parseInt(req.params.id));
  return successResponse(res, "Lấy chi tiết sản phẩm thành công", product);
});

const getChapters = asyncHandler(async (req, res) => {
  const chapters = await productService.getChaptersByProductId(parseInt(req.params.productId));
  return successResponse(res, "Lấy danh sách chương thành công", chapters);
});

const getChapter = asyncHandler(async (req, res) => {
  const chapter = await productService.getChapterById(parseInt(req.params.id));
  return successResponse(res, "Lấy nội dung chương thành công", chapter);
});

module.exports = {
  getProducts,
  getProduct,
  getChapters,
  getChapter,
};
