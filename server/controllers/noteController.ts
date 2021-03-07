import * as express from 'express';
import { Request, Response } from 'express';
import { Note } from '../models/user';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const newNote = await Note.create(req.body);
  newNote.save((err: Error) => {
    if (err) {
      return res
        .status(404)
        .json({ error: 'Note not saved.' })
        .end();
    }
    return res.status(200).json(newNote).end();
  });
});

router.put('/:id', async (req: Request, res: Response) => {
  Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err: Error) => {
    if (err) {
      return res
        .status(404)
        .json({ error: 'Note not saved.' })
        .end();
    }
    return res.status(200).end();
  });
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id, {}, (err) => {
    if (err) {
      return res
        .status(404)
        .json({ error: 'Note with given id doesn\'t exist.' })
        .end();
    }
    return res
      .status(200)
      .json({ response: 'Note deleted.' })
      .end();
  });
});

router.get('/', async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.json(notes);
});

router.get('/private', async (req: Request, res: Response) => {
  const notes = await Note.find({ private: true });
  res.json(notes);
});

export default router;
