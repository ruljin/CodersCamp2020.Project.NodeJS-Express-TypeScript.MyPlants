import * as express from 'express';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as plant from '../models/plant';

const router = express.Router();

// new plant
router.post('/', (req: Request, res: Response) => {
  req.body.accepted = false;
  const newPlant = new plant.Plant(req.body);
  newPlant.save((err: Error) => {
    if (err) {
      return res.status(404).json({ error: 'Plant not saved!' });
    }
    return res.status(200);
  });
});

router.put('/:id', (req: Request, res: Response) => {
  plant.Plant.findByIdAndUpdate(req.params.id, { accepted: true }, { new: true }, (err: Error) => {
    if (err) {
      return res.sendStatus(404).json({ error: 'Plant not saved!' });
    }
    return res.sendStatus(200);
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  const plantId = req.params.id;
  plant.Plant.findByIdAndDelete(
    plantId,
    {},
    (err: Error, plantObject: mongoose.Document) => {
      if (err) {
        return res.status(404).json({ error: 'Cannot find this plant!' });
      }
      return res.status(200).json({ response: `${plantObject} was deleted.` });
    }
  );
});

export default router;
