import * as express from 'express';
import User from '../models/user';

const router = express.Router();

router.get('/', (req, res) => {
  User.User.find({}, (err, users) => {
    res.send(users);
  });
});

router.post('/', (req, res) => {
  const data = new User.User(req.body);
  data.save((err) => {
    if (err) console.error(err);
    else {
      res.sendStatus(200).end();
    }
  });
});

export default router;
