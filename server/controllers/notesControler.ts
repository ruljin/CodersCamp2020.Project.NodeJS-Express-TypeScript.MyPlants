import * as express from 'express';
import User from '../models/user';
import Note from '../models/user';
import { Request, Response } from 'express';


const router = express.Router();

//POST - dodawanie notatek
router.post('/notes', async (req: Request, res: Response) => {
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
router.put('./notes/:id', async (req: Request, res: Response) => {
    const editNote = await User.Note.findById(req.params.id);
        if (!editNote) {
            return res
            .status(404)
            .json({error: 'Note with the given id doesn\'t exist'});
        }
        
    });
    
});

//DELETE - usuwanie notatek
router.delete('./notes/:id', async (req: Request, res: Response) => {
    const id =  req.params.id;
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
router.get('./notes', async (req: Request, res: Response) => {
    const notes = await User.Note.find();
    if (!notes) {
        return res.status(404).json({error: 'Notes not found'}).end();
    }
    return res.status(200).json(notes).end();
});

//GET - pobieranie ze względu na prywatnośc


export default router;