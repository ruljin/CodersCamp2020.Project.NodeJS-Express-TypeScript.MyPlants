import { mongoose } from '../server';

const MessageSchema = new mongoose.Schema({
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
    default: Date.now,
    required: true,
  },
});

const ChatSchema = new mongoose.Schema({
  messages: [MessageSchema],
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
