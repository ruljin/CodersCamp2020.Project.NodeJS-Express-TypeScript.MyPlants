import * as express from 'express';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
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
      return res.status(404).json({ error: `Cannot find plant with id: ${plantId}` }).end();
    }
    return res.status(200).json(plantObject).end();
  });
});

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

router.get('/:id/comments/:cid/likes', async (req: Request, res: Response) => {
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

router.post('/:id/comments/:cid/likes', async (req: Request, res: Response) => {
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

// { _id: req.params.id },
// { $pull: { comments: { _id: { $in: [req.params.cid] } } } },

router.delete('/:id/comments/:cid/likes/:lid', async (req: Request, res: Response) => {
  await Plant.updateOne(
    { _cid: req.params.cid },
    { $pull: { 'comments.likes': { _cid: [req.params.lid] } } },
    {},
    ((err: Error) => {
      if (err) {
        return res.status(404).end();
      }
      return res.status(200).end();
    })
  );
});

// router.delete('/:id/comments/:cid/likes/:lid', async (req: Request, res: Response) => {
//   await Plant.updateOne(
//     { _id: req.params.id },
//     { $pull: { comments: { _id: { likes: { $in: [req.params.lid] } } } } },
//     {},
//     ((err: Error) => {
//       if (err) {
//         return res.status(404).end();
//       }
//       return res.status(200).end();
//     })
//   );
// });

export default router;
