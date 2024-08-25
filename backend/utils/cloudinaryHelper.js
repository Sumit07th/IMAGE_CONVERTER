// utils/cloudinaryHelper.js
const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = (imageBuffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
        uploadStream.end(imageBuffer);
    });
};

module.exports = {
    uploadToCloudinary
};
