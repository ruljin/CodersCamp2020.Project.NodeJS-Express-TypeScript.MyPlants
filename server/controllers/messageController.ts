import * as express from 'express';
import { isAuth, isAdmin } from '../middleware/check-auth';
import { Message } from '../models/message';

const router = express.Router();

router.post('/', isAuth, async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ msg: 'You have to specify text of the message' });
  }

  const message = await Message.create(req.body.date ? {
    chat: req.body.chat,
    text: req.body.text,
    user: req.body.user,
    date: req.body.date
  } : {
    chat: req.body.chat,
    text: req.body.text,
    user: req.body.user
  });

  await message.save();
  res.status(200).json(message);
});

router.get('/', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

router.delete('/:id', isAdmin, async (req, res) => {
  const query = { _id: req.params.id };
  const message = await Message.findById(req.params.id);

  if (message) {
    await Message.findByIdAndRemove(query);
    res.json({ message, msg: 'Successfully deleted message' });
  } else {
    res.status(400).json({ msg: `No message with the id of ${req.params.id}` });
  }
});

export default router;
