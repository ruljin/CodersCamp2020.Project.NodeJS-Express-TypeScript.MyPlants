import * as express from 'express';
import User  from '../models/user';
import { Request, Response } from 'express';
import user from '../models/user';

const router = express.Router();

//POST - dodawanie notatek
router.post('/', async (req: Request, res: Response) => {
    const newNote = await User.Note.create(req.body);
    await newNote.save((err: Error) => {
        if (err) {
            return res
                .status(404)
                .json({error: 'Comment not saved.'})
                .end();
        }
        return res
            .status(200)
            .json(newNote)
            .end();
    })
});

//PUT - edycja notatek
router.put('./:id', async (req: Request, res: Response) => {
    const editNote = await User.Note.findByIdAndUpdate(req.params.id);
    if (editNote) {
        return res
            .status(200)
            .end();
    }
    return res.status(400).json({error: 'Comment not saved.'});
});

//DELETE - usuwanie notatek
router.delete('./:id', async (req: Request, res: Response) => {
    const id = { _id: req.params.id };
    const deleteNote = await User.Note.findById(req.params.id);
    if (deleteNote) {
        await User.Note.findByIdAndRemove(id);
        return res
            .status(200)
            .json({response: `{req.params.id} was deleted.`})
            .end();
    }
    return res
        .status(404)
        .json({error: 'Comment doesn\'t exist.'})
        .end();
});

//GET - pobieranie wszystkich notatek
router.get('./', async (req: Request, res: Response) => {

});

//GET - pobieranie ze względu na prywatnośc


export default router;