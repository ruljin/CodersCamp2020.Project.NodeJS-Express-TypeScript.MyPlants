import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import User from '../models/user';

dotenv.config();
const { JWT_KEY } = process.env;

const router = express.Router();

router.get('/', (req, res) => {
  User.User.find({}, (err, users) => {
    res.send(users);
  });
});

router.post('/', (req, res) => {
  User.User.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }] })
    .then(async (user: mongoose.Document) => {
      if (user) {
        if (user.get('email') === req.body.email) {
          res.status(409).json({ error: 'Email exist!' });
        } else {
          res.status(409).json({ error: 'Login exist!' });
        }
      } else {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        const newUser = new User.User(req.body);
        newUser.save();
        res.sendStatus(200).end();
      }
    })
    .catch((err: Error) => console.error(err));
});

router.post('/login', (req, res) => {
  User.User.findOne({ email: req.body.email })
    .then((user: mongoose.Document) => {
      if (!user) {
        res.status(404).json({ error: 'User doesn\'t exist.' });
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
              res.status(200).json({ error: 'Succesful login!', token });
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

router.delete('/:id', (req, res) => {
  User.User.findById(req.params.id)
    .then(async (userToRemove: mongoose.Document) => {
      if (!userToRemove) {
        return res.status(400).json({ error: `Cannot find user with the id of ${req.params.id}` });
      }

      const userId = { _id: req.params.id };
      await User.User.findByIdAndRemove(userId);
      return res
        .status(200)
        .json({ response: `User of id ${req.params.id} was deleted.` })
        .end();
    })
    .catch((err: Error) => console.error(err));
});

router.put('/:id', (req, res) => {
  User.User.findById(req.params.id)
    .then(async (result: mongoose.Document) => {
      if (!result) {
        return res.status(400).json({ error: `Cannot find user with the id of ${req.params.id}` });
      }

      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      }

      if (req.body.email || req.body.login) {
        await User.User.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }] })
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

      await User.User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      return res.status(200).end();
    })
    .catch((err: Error) => console.error(err));
});

export default router;
