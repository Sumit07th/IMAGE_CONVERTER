// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Configure Multer storage options
const storage = multer.memoryStorage(); // Store file in memory

// Initialize Multer with storage options
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
    fileFilter: (req, file, cb) => {
        // Accept only image files
        const filetypes = /jpeg|jpg|png|gif|tiff|avif|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed!'));
    }
});

module.exports = upload;
