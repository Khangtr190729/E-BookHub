const uploadService = require('./upload.service');
const { successResponse } = require('../../utils/response');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError('Vui lòng chọn ảnh để tải lên', 400);
  }

  const result = await uploadService.uploadFile(req.file, 'image');
  return successResponse(res, 'Tải ảnh lên thành công', result);
});

const uploadEbook = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError('Vui lòng chọn file ebook để tải lên', 400);
  }

  const result = await uploadService.uploadFile(req.file, 'ebook');
  return successResponse(res, 'Tải file ebook lên thành công', result);
});

module.exports = {
  uploadImage,
  uploadEbook,
};
