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
    return res.status(200).send(plants);
  });
});

router.get('/:id', (req: Request, res: Response) => {
  const plantId = req.params.id;
  plant.Plant.findById(plantId, (err: Error, plantObject: mongoose.Document) => {
    if (err) {
      return res.sendStatus(404).json({ error: `Cannot find plant with id: ${plantId}` });
    }
    return res.sendStatus(200).json(plantObject);
  });
});

router.post('/', (req: Request, res: Response) => {
  req.body.accepted = true;
  const newPlant = new plant.Plant(req.body);
  newPlant.save((err: Error) => {
    if (err) {
      return res.sendStatus(404).json({ error: 'Plant not saved!' });
    }
    return res.sendStatus(200);
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  const plantId = req.params.id;
  plant.Plant.find({}, (err: Error, plants: mongoose.Document[]) => {
    if (err) {
      return res.status(404).json({ error: 'Cannot find this plant!' });
    }
    const modifiedPlants = plants.filter((plantToDelete) => plantToDelete.id !== plantId);
    return res.status(200).send(modifiedPlants);
  });
});

// comments
router.get('/:id/comments', (err: Error, req: Request, res: Response) => {
  const allComments = req.body.comments;
  if (err) {
    return res.sendStatus(404).json({ error: 'Comments not found!' });
  }
  return res.sendStatus(200).send(allComments);
});

router.post('/:id/comments', (req: Request, res: Response) => {
  const newComment = new plant.Comment(req.body);
  newComment.save((err: Error) => {
    if (err) {
      return res.sendStatus(404).json({ error: 'Comment not saved!' });
    }
    return res.sendStatus(200);
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  const commentId = req.params.id;
  plant.Comment.find({}, (err: Error, comments: mongoose.Document[]) => {
    if (err) {
      return res.status(404).json({ error: 'Cannot find this comment!' });
    }
    const modifiedComments = comments.filter((commentToDelete) => commentToDelete.id !== commentId);
    return res.status(200).send(modifiedComments);
  });
});

router.put('/comments/:id', (req: Request, res: Response) => {
  const commentId = req.params.id;
  const allComments = req.body.comments;
  const commentIndex = allComments.findIndex((comment) => comment.id === commentId);
  if (commentIndex >= 0) {
    allComments[commentIndex] = new plant.Comment(req.body);
    return res.sendStatus(200).send(allComments);
  }
  return res.sendStatus(404).json({ error: 'Your comment was not modified!' });
});

// new plants
router.post('/', (req: Request, res: Response) => {
  req.body.accepted = false;
  const newPlant = new plant.Plant(req.body);
  newPlant.save((err: Error) => {
    if (err) {
      return res.sendStatus(404).json({ error: 'Plant not saved!' });
    }
    return res.sendStatus(200);
  });
});

router.put('/:id', (req: Request, res: Response) => {
  req.body.accepted = true;
  const newPlant = new plant.Plant(req.body);
  newPlant.save((err: Error) => {
    if (err) {
      return res.sendStatus(404).json({ error: 'Plant not saved!' });
    }
    return res.sendStatus(200);
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  const plantId = req.params.id;
  plant.Plant.find({}, (err: Error, plants: mongoose.Document[]) => {
    if (err) {
      return res.status(404).json({ error: 'Cannot find this plant!' });
    }
    const modifiedPlants = plants.filter((plantToDelete) => plantToDelete.id !== plantId);
    return res.status(200).send(modifiedPlants);
  });
});

export default router;
