const cloudinary = require('../../config/cloudinary');
const env = require('../../config/env');
const fs = require('fs').promises;
const path = require('path');

const uploadFile = async (file, type) => {
  if (env.uploadDriver === 'cloudinary') {
    return uploadToCloudinary(file, type);
  } else {
    return uploadToLocal(file, type);
  }
};

const uploadToCloudinary = async (file, type) => {
  const folder = type === 'image' ? 'ebookhub/images' : 'ebookhub/ebooks';
  const resourceType = type === 'image' ? 'image' : 'raw';

  // Upload buffer directly to Cloudinary
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: path.parse(file.originalname).name + '-' + Date.now(),
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
          format: result.format,
          bytes: result.bytes,
          originalName: file.originalname,
          mimeType: file.mimetype,
        });
      }
    );

    uploadStream.end(file.buffer);
  });
};

const uploadToLocal = async (file, type) => {
  const filename = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(env.uploadDir, filename);

  await fs.writeFile(filePath, file.buffer);

  return {
    url: `${env.localFileBaseUrl}/${filename}`,
    publicId: filename,
    resourceType: type,
    format: path.extname(file.originalname).substring(1),
    bytes: file.size,
    originalName: file.originalname,
    mimeType: file.mimetype,
  };
};

module.exports = {
  uploadFile,
};
