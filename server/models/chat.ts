import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const ChatSchema = new mongoose.Schema({
  messages: [MessageSchema],
});

export const message = mongoose.model('message', MessageSchema);
export const chat = mongoose.model('chat', ChatSchema);
