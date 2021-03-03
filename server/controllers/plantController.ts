import * as express from 'express';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as plant from '../models/plant';

const router = express.Router();

// plant
router.get('/', (req: Request, res: Response) => {
  plant.Plant.find({}, (err: Error, plants: mongoose.Document[]) => {
    if (err) {
      return res.status(404).json({ error: 'Cannot find plants!' });
    }
    return res.status(200).json(plants);
  });
});

router.get('/:id', (req: Request, res: Response) => {
  const plantId = req.params.id;
  plant.Plant.findById(plantId, (err: Error, plantObject: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: `Cannot find plant with id: ${plantId}` });
    }
    return res.status(200).json(plantObject);
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

// comment
router.get('/:id/comments', (req: Request, res: Response) => {
  const plantId = req.params.id;
  plant.Plant.findById(plantId, (err: Error, plantObject: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Comments not found!' });
    }
    const plantComments = plantObject.get('comments');
    return res.status(200).json(plantComments);
  });
});

router.post('/:id/comments', (req: Request, res: Response) => {
  const newComment = new plant.Comment(req.body);
  const plantId = req.params.id;
  plant.Plant.findById(plantId, (err: Error, plantObject: mongoose.Document) => {
    if (err) {
      return res.sendStatus(404).json({ error: 'Comment not found!' });
    }
    const plantComments = plantObject.get('comments');
    plantComments.push(newComment);
    return res.status(200);
  });
});

router.delete('/:id/comments/:cid', (req: Request, res: Response) => {
  const commentId = req.params.cid;
  plant.Plant.findByIdAndRemove(commentId, {}, (err: Error, commentObj: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Cannot find this comment!' });
    }
    plant.Plant.updateOne({ $pull: { comments: commentId } });
    return res.status(200).json({ response: `${commentObj} was deleted.` });
  });
});

router.put('/comments/:id', (req: Request, res: Response) => {
  const commentId = req.params.id;
  plant.Comment.findByIdAndUpdate(
    commentId,
    { text: req.params.text },
    { new: true },
    (err: Error) => {
      if (err) {
        return res.sendStatus(404).json({ error: 'Your comment was not modified!' });
      }
      return res.sendStatus(200);
    }
  );
});

export default router;
