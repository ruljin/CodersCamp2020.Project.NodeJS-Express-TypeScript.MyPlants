import * as express from 'express';
import { Request, Response } from 'express';
import { Plant } from '../models/plant';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const newPlant = await Plant.create(req.body);
  await newPlant.save((err: Error) => {
    if (err) {
      return res.status(404).json({ error: 'Plant not saved!' }).end();
    }
    return res.status(200).json(newPlant).end();
  });
});

router.put('/:id', async (req: Request, res: Response) => {
  await Plant.findByIdAndUpdate(req.params.id, { accepted: true }, { new: true }, (err: Error) => {
    if (err) {
      return res.status(404).json({ error: 'Plant not saved!' }).end();
    }
    return res.status(200).end();
  });
});

router.delete('/:id', async (req: Request, res: Response) => {
  const plantId = { _id: req.params.id };
  const plantToDelete = await Plant.findById(req.params.id);

  if (plantToDelete) {
    await Plant.findByIdAndRemove(plantId);
    return res.status(200).json({ response: `${req.params.id} was deleted.` }).end();
  }
  return res.status(404).json({ error: 'Cannot find this plant!' }).end();
});

export default router;
