import * as express from 'express';
import { User, Event } from '../models/user';

const router = express.Router();

router.get('/user/:id', async (req, res) => {
  await User.findById(req.params.id)
    .then(async (user: any) => {
      if (!user) {
        return res.sendStatus(404).end();
      }

      return res.status(200).json({ calendar: user.calendar });
    })
    .catch((err: Error) => console.log(err));
});

router.post('/user/:id/event', async (req, res) => {
  await User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.sendStatus(404).end();
    }
    user.calendar.events.push(new Event(req.body));
    user.save();
    return res.sendStatus(200).end();
  });
});

router.delete('/user/:id/event/:eid', async (req, res) => {
  await User.findById(req.params.id)
    .then((user: any) => {
      if (!user) {
        return res.sendStatus(404).end();
      }
      user.calendar.events = user.calendar.events.filter((event) => `${event._id}` !== `${req.params.eid}`);
      user.save();
      return res.sendStatus(200).end();
    });
});

router.put('/user/:id/event/:eid', async (req, res) => {
  await User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.sendStatus(404).end();
    }
    user.calendar.events = user.calendar.events.map((event) => {
      if (`${event._id}` === `${req.params.eid}`) {
        event = req.body;
        return event;
      }
      return event;
    });

    user.save();
    return res.sendStatus(200).end();
  });
});

router.get('/month/:month', async (req, res) => {
  if (Number.isNaN(parseInt(req.params.month, 10))) {
    return res.sendStatus(400).json({ error: 'Required parametr "month" to be a type of number' });
  }
  const events = [];
  await User.find({}, (err, users) => {
    if (err) {
      return res.sendStatus(400).end();
    }
    users.map((user: any) => {
      if (!user.calendar) {
        user.calendar = {
          events: []
        };
      }
      user.calendar.events.map((event) => {
        if (new Date(event.date).getMonth() === parseInt(req.params.month, 10)) {
          events.push(event);
        }
      });
    });
    return res.status(200).json({ events });
  });
  return null;
});

export default router;
