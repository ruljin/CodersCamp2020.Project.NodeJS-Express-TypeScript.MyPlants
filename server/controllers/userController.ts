import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import User from '../models/user';

const router = express.Router();

router.get('/', (req, res) => {
  User.User.find({}, (err, users) => {
    res.send(users);
  });
});

router.post('/', (req, res) => {
  User.User.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }] })
    .then((user: mongoose.Document) => {
      if (user) {
        if (user.get('email') === req.body.email) {
          res.status(409).json({ error: 'Email exist!' });
        } else {
          res.status(409).json({ error: 'Login exist!' });
        }
      } else {
        bcrypt.hash(req.body.password, 12).then((hashedPassword: string) => {
          const newUser = new User.User({
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            surname: req.body.surname,
            admin: req.body.admin
          });

          newUser.save();
          return res.sendStatus(200).end();
        });
      }
    })
    .catch((err: Error) => console.error(err));
});

router.post('/login', (req, res) => {
  User.User.findOne({ email: req.body.email })
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
              res.status(200).end();
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
    .then(async (userToRemove) => {
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

export default router;
