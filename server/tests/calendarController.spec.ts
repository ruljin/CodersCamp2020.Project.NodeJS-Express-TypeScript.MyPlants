import request from 'supertest';
import app from '../app';
import { User } from '../models/user';

const newUser = {
  name: 'test',
  login: 'test',
  surname: 'test',
  email: 'test',
  password: 'test',
  admin: false,
  notes: [],
  plants: [],
  calendar: {
    events: []
  }
};

describe('testing calendar API', () => {
  let token;
  let testedUser;
  let eventId;

  beforeAll(async (done) => {
    testedUser = await User.create(newUser);

    await request(app)
      .post('/api/user/login')
      .send({ email: 'user', password: 'user' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  test('GET calendar by user id', (done) => {
    request(app)
      .get(`/api/calendar/user/${testedUser.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });

  test('POST calendar event', (done) => {
    request(app)
      .post(`/api/calendar/user/${testedUser.id}/event`)
      .send({
        title: 'test',
        description: 'test',
        author: testedUser.id,
        date: new Date()
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });

  test('PUT calendar event', (done) => {
    request(app)
      .get(`/api/calendar/user/${testedUser.id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        eventId = res.body.calendar.events[0].id;
        done();
      });

    request(app)
      .put(`/api/calendar/user/${testedUser.id}/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test2',
        description: 'test2',
        author: testedUser.id,
        date: new Date()
      })
      .expect(200, done);
  });

  test('GET events by month', (done) => {
    request(app)
      .get('/api/calendar/2')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });

  test('DELETE event', (done) => {
    request(app)
      .delete(`/api/calendar/user/${testedUser.id}/event/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });
});
