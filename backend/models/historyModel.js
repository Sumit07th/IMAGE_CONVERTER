// models/historyModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define allowed operation types
const operationTypes = ['convert', 'resize', 'crop', 'compress', 'grayscale', 'tint', 'rotate', 'blur', 'sharpen', 'flip', 'add-text'];

const historySchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    operation: { 
        type: String, 
        enum: operationTypes, // Ensure only allowed operations are used
        required: true 
    },
    originalFormat: {
        type: String, 
        required: true 
    },
    convertedFormat: {
        type: String,
        required: true
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    imageUrl: {
        type: String // Store the URL of the image
    }
});

// Create indexes for performance
historySchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('History', historySchema);
