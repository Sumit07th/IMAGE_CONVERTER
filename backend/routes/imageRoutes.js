const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Multer middleware for file uploads
const imageController = require('../controllers/imageController');
const authenticateToken = require("../middleware/authMiddleware");

// Image processing routes (accessible to all users)
router.post('/convert/:targetFormat', authenticateToken, upload.single('image'), imageController.convertImage);
router.post('/resize', authenticateToken, upload.single('image'), imageController.resizeImage);
router.post('/crop', authenticateToken,upload.single('image'), imageController.cropImage);
router.post('/compress', authenticateToken,upload.single('image'), imageController.compressImage);
router.post('/grayscale', authenticateToken,upload.single('image'), imageController.convertToGrayscale);
router.post('/tint', authenticateToken,upload.single('image'), imageController.tintImage);
router.post('/rotate', authenticateToken,upload.single('image'), imageController.rotateImage);
router.post('/blur', authenticateToken,upload.single('image'), imageController.blurImage);
router.post('/sharpen', authenticateToken,upload.single('image'), imageController.sharpenImage);
router.post('/flip', authenticateToken,upload.single('image'), imageController.flipImage);
router.post('/add-text', authenticateToken,upload.single('image'), imageController.addTextToImage);

module.exports = router;
