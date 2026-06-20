const multer = require('multer');

// Use memory storage for Cloudinary compatibility
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'file') {
      cb(null, true);
    } else {
      cb(new Error('Trường tải lên không hợp lệ'), false);
    }
  },
});

module.exports = upload;
