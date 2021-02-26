import {mongoose} from './example';

const url = 'http://putyoururlhere.com';

const CommentsSchema = new mongoose.Schema({
    user_id: {
        type: String,
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
        default: url,
        required: true
    }
})

const Comments = mongoose.model('comments', CommentsSchema);

module.exports = Comments