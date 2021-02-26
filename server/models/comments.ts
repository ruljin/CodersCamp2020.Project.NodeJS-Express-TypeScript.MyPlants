const mongoose = require('mongoose');

const url = 'http://putyoururlhere.com';

const CommentSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image_path: {
        type: String,
        default: url
    }
})

const CommentEl = mongoose.model('comment', CommentSchema);

module.exports = CommentEl