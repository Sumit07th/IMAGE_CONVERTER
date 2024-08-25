// historyRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const historyController = require('../controllers/historyController');

// Get user history
router.get('/history', authenticateToken, historyController.getUserHistory);

module.exports = router;
