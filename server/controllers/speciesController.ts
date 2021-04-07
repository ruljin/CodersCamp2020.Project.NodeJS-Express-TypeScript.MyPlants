import * as express from 'express';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { Species } from '../models/species';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  await Species.find({}, (err: Error, plants: mongoose.Document[]) => {
    if (err) {
      return res.status(404).json({ error: 'Cannot find species!' }).end();
    }
    return res.status(200).json(plants).end();
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  const specieId = req.params.id;
  await Species.findById(specieId, (err: Error, specieObject: mongoose.Document) => {
    if (err) {
      return res
        .status(404)
        .json({ error: `Cannot find species with id: ${specieId}` })
        .end();
    }
    return res.status(200).json(specieObject).end();
  });
});

export default router;
