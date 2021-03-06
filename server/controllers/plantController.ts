import * as express from 'express';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { Plant, Comment } from '../models/plant';

const router = express.Router();

// plant
router.get('/', async (req: Request, res: Response) => {
  await Plant.find({}, (err: Error, plants: mongoose.Document[]) => {
    if (err) {
      return res.status(404).json({ error: 'Cannot find plants!' }).end();
    }
    return res.status(200).json(plants).end();
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  const plantId = req.params.id;
  await Plant.findById(plantId, (err: Error, plantObject: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: `Cannot find plant with id: ${plantId}` }).end();
    }
    return res.status(200).json(plantObject).end();
  });
});

router.delete('/:id', async (req: Request, res: Response) => {
  const plantId = req.params.id;
  await Plant.findByIdAndDelete(
    plantId,
    {},
    (err: Error, plantObject: mongoose.Document) => {
      if (err) {
        return res.status(404).json({ error: 'Cannot find this plant!' }).end();
      }
      return res.status(200).json({ response: `${plantObject} was deleted.` }).end();
    }
  );
});

// comment
router.get('/:id/comments', async (req: Request, res: Response) => {
  const plantId = req.params.id;
  await Plant.findById(plantId, (err: Error, plantObject: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Comments not found!' }).end();
    }
    const plantComments = plantObject.get('comments');
    return res.status(200).json(plantComments).end();
  });
});

router.post('/:id/comments', async (req: Request, res: Response) => {
  const newComment = new Comment(req.body);
  const plantId = req.params.id;
  await Plant.findById(plantId, (err: Error, plantObject: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Comment not found!' }).end();
    }
    plantObject.get('comments').push(newComment);
    plantObject.save();
    return res.status(200).end();
  });
});

router.delete('/:id/comments/:cid', async (req: Request, res: Response) => {
  await Plant.updateOne(
    { _id: req.params.id },
    { $pull: { comments: { _id: { $in: [req.params.cid] } } } },
    {},
    ((err: Error) => {
      if (err) {
        return res.status(404).end();
      }
      return res.status(200).end();
    })
  );
});

router.put('/:id/comments/:cid', async (req: Request, res: Response) => {
  await Plant.findById(req.params.id, (err, foundPlant) => {
    if (err) {
      return res.status(404).end();
    }
    foundPlant.comments = foundPlant.comments.map((comment) => {
      if (`${comment._id}` === `${req.params.cid}`) {
        comment.text = req.body.text;
      }
      return comment;
    });
    foundPlant.save();
    return res.status(200).end();
  });
});

export default router;
