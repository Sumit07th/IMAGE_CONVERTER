// historyController.js
const History = require('../models/historyModel');

// Save user history
exports.saveHistory = async (userId, operation, originalFormat, convertedFormat, imageUrl) => {
    try {
        const historyEntry = new History({ userId, operation, originalFormat, convertedFormat, timestamp: new Date(), imageUrl });
        await historyEntry.save();
    } catch (error) {
        console.error('Error saving history:', error);
    }
};

// Get user history
exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const history = await History.find({ userId }).sort({ timestamp: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving history.', error });
    }
};
