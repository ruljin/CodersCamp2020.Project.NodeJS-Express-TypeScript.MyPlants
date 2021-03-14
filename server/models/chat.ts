import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const Chat = mongoose.model('chat', ChatSchema);
