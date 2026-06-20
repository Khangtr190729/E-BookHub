const express = require('express');
const router = express.Router();
const uploadController = require('./upload.controller');
const uploadMiddleware = require('./upload.middleware');

router.post('/image', uploadMiddleware.single('file'), uploadController.uploadImage);
router.post('/ebook', uploadMiddleware.single('file'), uploadController.uploadEbook);

module.exports = router;
