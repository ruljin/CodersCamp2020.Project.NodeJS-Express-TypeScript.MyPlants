import * as express from 'express';
import user from '../models/user';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';


const router = express.Router();

//POST - dodawanie notatek
router.post('/', async (req: Request, res: Response) => {
  const newNote = await user.Note.create(req.body);
  newNote.save((err: Error) => {
      if (err) {
          return res
          .status(404)
          .json({error: 'Note not saved'})
          .end();
      }
      return res.status(200).json(newNote).end();
  })
});

//PUT - edycja notatek
router.put('/:id', async (req: Request, res: Response) => {
  user.Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err: Error) =>{
      if (err) {
          return res
          .status(404)
          .json({error: 'Note not saved.'})
          .end();
      }
      return res.status(200).end();
  })
});

//DELETE - usuwanie notatek
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  await user.Note.findByIdAndDelete(id, {}, (err) => {
    if (err) {
      return res
        .status(404)
        .json({error: 'Comment with given id doesn\'t exist.'})
        .end();
        }
        return res
          .status(200)
          .json({ response: `Note deleted.`})
          .end();
    });
});

//GET - pobieranie wszystkich notatek
router.get('/', async (req: Request, res: Response) => {
  const notes = await user.Note.find();
  res.json(notes);
});

//GET - pobieranie ze względu na prywatność
router.get('/private', async (req: Request, res: Response) => {
  const notes = await user.Note.find({ private: true });
  res.json(notes);
});

export default router;