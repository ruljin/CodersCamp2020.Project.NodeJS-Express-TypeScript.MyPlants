import * as express from 'express';
import { Chat } from '../models/chat';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.chat) {
    res.status(400).json({ msg: 'You have to specify chat name' });
  }

  const chat = await Chat.create({ name: req.body.name });

  await chat.save();
  res.status(200).json(chat);
});
