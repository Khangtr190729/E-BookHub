const libraryService = require("./library.service");
const { successResponse } = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");

const getLibrary = asyncHandler(async (req, res) => {
  const library = await libraryService.getLibraryByUserId(req.user.id);
  return successResponse(res, "Lấy thư viện thành công", library);
});

const getPurchasedChapters = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const chapters = await libraryService.getPurchasedChapters(req.user.id, parseInt(productId));
  return successResponse(res, "Lấy danh sách chương đã mua thành công", chapters);
});

module.exports = {
  getLibrary,
  getPurchasedChapters,
};
