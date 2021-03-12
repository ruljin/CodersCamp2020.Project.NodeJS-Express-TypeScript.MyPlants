import * as express from 'express';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { isAuth, isAdmin } from '../middleware/check-auth';
import { Plant, Comment, Like } from '../models/plant';

const router = express.Router();

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
      return res
        .status(404)
        .json({ error: `Cannot find plant with id: ${plantId}` })
        .end();
    }
    return res.status(200).json(plantObject).end();
  });
});

router.post('/', isAuth, async (req: Request, res: Response) => {
  const newPlant = await Plant.create(req.body);
  await newPlant.save((err: Error) => {
    if (err) {
      return res.status(404).json({ error: 'Plant not saved!' }).end();
    }
    return res.status(200).json(newPlant).end();
  });
});

router.put('/:id', isAdmin, async (req: Request, res: Response) => {
  await Plant.findByIdAndUpdate(req.params.id, { accepted: true }, { new: true }, (err: Error) => {
    if (err) {
      return res.status(404).json({ error: 'Plant not saved!' }).end();
    }
    return res.status(200).end();
  });
});

router.delete('/:id', isAdmin, async (req: Request, res: Response) => {
  const plantId = req.params.id;
  await Plant.findByIdAndDelete(plantId, {}, (err: Error, plantObject: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Cannot find this plant!' }).end();
    }
    return res
      .status(200)
      .json({ response: `${plantObject} was deleted.` })
      .end();
  });
});

router.get('/:id/comments', async (req: Request, res: Response) => {
  const plantId = req.params.id;
  await Plant.findById(plantId, (err: Error, plantObject: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Comments not found!' }).end();
    }
    const plantComments = plantObject.get('comments');
    const sortedComments = plantComments.sort((a, b) => b.likes.length - a.likes.length);
    return res.status(200).json(sortedComments).end();
  });
});

router.post('/:id/comments', isAuth, async (req: Request, res: Response) => {
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

router.delete('/:id/comments/:cid', isAuth, async (req: Request, res: Response) => {
  await Plant.updateOne(
    { _id: req.params.id },
    { $pull: { comments: { _id: { $in: [req.params.cid] } } } },
    {},
    (err: Error) => {
      if (err) {
        return res.status(404).end();
      }
      return res.status(200).end();
    }
  );
});

router.put('/:id/comments/:cid', isAuth, async (req: Request, res: Response) => {
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

router.get('/:id/comments/:cid/likes', isAuth, async (req: Request, res: Response) => {
  await Plant.findById(req.params.id, (err, foundPlant) => {
    if (err) {
      return res.status(404).end();
    }
    foundPlant.comments = foundPlant.comments.map((comment) => {
      if (`${comment._id}` === `${req.params.cid}`) {
        const likes = comment.get('likes');
        return res.json(likes).end();
      }
      return comment;
    });
    return res.status(200).end();
  });
});

router.post('/:id/comments/:cid/likes', isAuth, async (req: Request, res: Response) => {
  await Plant.findById(req.params.id, (err, foundPlant) => {
    if (err) {
      return res.status(404).end();
    }
    foundPlant.comments = foundPlant.comments.map((comment) => {
      if (`${comment._id}` === `${req.params.cid}`) {
        const likes = comment.get('likes');
        const newLike = new Like(req.body);
        likes.push(newLike);
      }
      return comment;
    });
    foundPlant.save();
    return res.status(200).end();
  });
});

router.delete('/:id/comments/:cid/likes/:lid', isAuth, async (req: Request, res: Response) => {
  await Plant.findById(req.params.id, (err, plant) => {
    if (err) {
      return res.sendStatus(404).end();
    }
    plant.comments = plant.comments.map((comment) => {
      if (`${comment._id}` === `${req.params.cid}`) {
        comment.likes = comment.likes.filter((like) => `${like._id}` !== `${req.params.lid}`);
        console.log(comment.likes);
        return comment;
      }
      return comment;
    });

    plant.save();
    return res.sendStatus(200).end();
  });
});

export default router;
