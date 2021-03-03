import * as express from 'express';
import { Message } from '../models/message';

const router = express.Router();

// Add Message
router.post('/messages', async (req, res) => {
  if (!req.params.text || !req.params.date) {
    res.status(400).json({ msg: `No message with the id of ${req.params.id}` });
  }

  const message = await Message.create(req.params.date ? {
    text: req.params.text,
    user: req.params.user,
    date: req.params.date
  } : {
    text: req.params.text,
    user: req.params.user
  });

  message.save();
  res.json(message);
});

// Get 50 Messages
router.get('/messages', async (req, res) => {
  const messages = await Message.find().limit(50);
  res.json(messages);
});

// Delete Message
router.delete('/:id', async (req, res) => {
  const query = { _id: req.params.id };
  const message = await Message.findById(req.params.id);

  if (message) {
    await Message.findByIdAndRemove(query);
    res.json(message);
  } else {
    res.status(400).json({ msg: `No message with the id of ${req.params.id}` });
  }
});
