import * as express from 'express';
import user from '../models/user';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';


const router = express.Router();

//POST - dodawanie notatek
router.post('/notes', async (req: Request, res: Response) => {
    const newNote = new user.Note(req.body);
    const id = req.params.id;
    await user.Note.findById(id, (err: Error, noteObject: mongoose.Document) => {
        if (err) {
         return res
         .status(404)
         .json({ error: 'Note not found!' })
         .end();
        }
        noteObject.get('notes').push(newNote);
        noteObject.save();
        return res.status(200).end();
    });
});

//PUT - edycja notatek
router.put('/notes/:id', async (req: Request, res: Response) => {
    
});

//DELETE - usuwanie notatek
router.delete('/notes/:id', async (req: Request, res: Response) => {
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
            .en();
    });
});

//GET - pobieranie wszystkich notatek
router.get('/notes', async (req: Request, res: Response) => {
    const notes = await user.Note.find();
    res.json(notes);
});

//GET - pobieranie ze względu na prywatnośc


export default router;