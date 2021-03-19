import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { isAuth } from '../middleware/check-auth';
import { User, Note, Favourites } from '../models/user';

dotenv.config();
const { JWT_KEY } = process.env;

const router = express.Router();

router.post(
  '/',
  [
    body('login').custom((value) => User.findOne({ login: value }).then((user) => {
      if (user) {
        return Promise.reject(new Error('Login exists already, please pick a different one.'));
      }

      return null;
    })),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value) => User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail exists already, please pick a different one.'));
        }

        return null;
      })),
    body('password').isLength({ min: 5 }).withMessage('Please enter a password with at least 5 characters.'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password have to match!');
      }

      return true;
    }),
    body('name').isAlpha().withMessage('Name must be alphabetic.'),
    body('surname').isAlpha().withMessage('Surname must be alphabetic.')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    req.body.password = await bcrypt.hash(req.body.password, 12);
    req.body.confirmPassword = await bcrypt.hash(req.body.confirmPassword, 12);
    const newUser = new User(req.body);
    newUser.save();
    return res.sendStatus(200).end();
  }
);

router.post('/login', (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((user: mongoose.Document) => {
      if (!user) {
        res.status(404).json({ error: "User doesn't exist." });
      } else {
        const userPassword = user.get('password');
        const { password } = req.body;

        bcrypt
          .compare(password, userPassword)
          .then((doMatch: Boolean) => {
            if (doMatch) {
              const token = jwt.sign(
                { id: user.get('_id'), email: user.get('email'), admin: user.get('admin') },
                JWT_KEY,
                { expiresIn: '1h' }
              );
              res.status(200).json({ response: 'Succesful login!', token });
            } else {
              res.status(404).json({ error: 'Invalid password!' });
            }
          })
          .catch((err: Error) => {
            console.error(err);
          });
      }
    })
    .catch((err: Error) => console.error(err));
});

router.get('/:id', isAuth, (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then(async (user: mongoose.Document) => {
      if (!user) {
        return res.status(400).json({ error: `Cannot find user with the id of ${req.params.id}` });
      }

      return res.status(200).json(user).end();
    })
    .catch((err: Error) => console.error(err));
});

router.delete('/:id', isAuth, (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then(async (userToRemove: mongoose.Document) => {
      if (!userToRemove) {
        return res.status(400).json({ error: `Cannot find user with the id of ${req.params.id}` });
      }

      const userId = { _id: req.params.id };
      await User.findByIdAndRemove(userId);
      return res
        .status(200)
        .json({ response: `User of id ${req.params.id} was deleted.` })
        .end();
    })
    .catch((err: Error) => console.error(err));
});

router.put('/:id', isAuth, (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then(async (result: mongoose.Document) => {
      if (!result) {
        return res.status(400).json({ error: `Cannot find user with the id of ${req.params.id}` });
      }

      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      }

      if (req.body.email || req.body.login) {
        await User.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }] })
          .then((user: mongoose.Document) => {
            if (user) {
              if (user.get('email') === req.body.email) {
                res.status(409).json({ error: 'Email is taken!' });
              } else {
                res.status(409).json({ error: 'Login is taken!' });
              }
            }
          })
          .catch((error) => console.error(error));
      }

      await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      return res.status(200).end();
    })
    .catch((err: Error) => console.error(err));
});

router.get('/:id/notes', isAuth, async (req: Request, res: Response) => {
  const userId = req.params.id;
  await User.findById(userId, (err: Error, user: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Note not found!' }).end();
    }
    const userNotes = user.get('notes');
    return res.status(200).json(userNotes).end();
  });
});

router.get('/:id/notes/:nid', isAuth, async (req: Request, res: Response) => {
  await User.findById(req.params.id, (err: Error, foundUser: mongoose.Document) => {
    if (err) {
      return res.status(404).end();
    }
    return foundUser.get('notes').forEach((note) => {
      if (`${note._id}` === `${req.params.nid}`) {
        res.status(200).json(note).end();
      }
    });
  });
});

router.post('/:id/notes', isAuth, async (req: Request, res: Response) => {
  const newNote = new Note(req.body);
  const userId = req.params.id;
  await User.findById(userId, (err: Error, userObject: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Note not found!' }).end();
    }
    userObject.get('notes').push(newNote);
    userObject.save();
    return res.status(200).end();
  });
});

router.delete('/:id/notes/:nid', isAuth, async (req: Request, res: Response) => {
  await User.updateOne(
    { _id: req.params.id },
    { $pull: { notes: { _id: { $in: [req.params.nid] } } } },
    {},
    (err: Error) => {
      if (err) {
        return res.status(404).end();
      }
      return res.status(200).end();
    }
  );
});

router.put('/:id/notes/:nid', isAuth, async (req: Request, res: Response) => {
  await User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      return res.status(404).end();
    }
    foundUser.notes = foundUser.notes.map((note) => {
      if (`${note._id}` === `${req.params.nid}`) {
        note = req.body;
      }
      return note;
    });
    foundUser.save();
    return res.status(200).end();
  });
});

router.post('/:id/favourites', isAuth, async (req: Request, res: Response) => {
  const favUser = new Favourites(req.body);
  const userId = req.params.id;
  await User.findById(userId, (err: Error, favObj: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Not found.' }).end();
    }
    favObj.get('favourites').push(favUser);
    favObj.save();
    return res.status(200).end();
  });
});

router.get('/:id/favourites', isAuth, async (req: Request, res: Response) => {
  const userId = req.params.id;
  await User.findById(userId, (err: Error, user: mongoose.Document) => {
    if (err) {
      return res.status(404).json({ error: 'Favourite list is empty' }).end();
    }
    const userFavs = user.get('favourites');
    return res.status(200).json(userFavs).end();
  });
});

router.delete('/:id/favourites/:fid', isAuth, async (req: Request, res: Response) => {
  await User.updateOne(
    { _id: req.params.id },
    { $pull: { favourites: { _id: { $in: [req.params.fid] } } } },
    {},
    (err: Error) => {
      if (err) {
        return res.status(404).end();
      }
      return res.status(200).end();
    }
  );
});

export default router;
