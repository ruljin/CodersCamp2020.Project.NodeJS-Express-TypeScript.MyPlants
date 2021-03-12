import * as request from 'supertest';
import app from '../server';
import { User } from '../models/user';

const newUser = {
  name: 'test',
  login: 'test',
  surname: 'test',
  email: 'test',
  password: 'test',
  admin: false,
  notes: [],
  plants: []
};

describe('/tests for user', () => {
  let testedUser;

  beforeEach(async () => {
    await User.deleteMany({});
    testedUser = await User.create(newUser);
  });

  describe('GET', () => {
    it('GET user by id', (done) => {
      request(app).get(`/api/user/${testedUser.id}`).expect(200, done);
    });
  });

  describe('POST /user', () => {
    it('POST user (register)', (done) => {
      request(app)
        .post('/api/user/')
        .send({
          name: 'newUser',
          login: 'newUser',
          surname: 'newUser',
          email: 'newUser',
          password: 'newUser',
          admin: false
        })
        .expect(200, done);
    });

    it('POST user (login)', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          login: 'newUser',
          password: 'newUser'
        })
        .expect(200, done);
    });
  });

  describe('PUT', () => {
    it('PUT user', (done) => {
      request(app).put(`/api/user/${testedUser.id}`).expect(200, done);
    });
  });

  describe('DELETE', () => {
    it('DELETE one user', (done) => {
      request(app).delete(`/api/user/${testedUser.id}`).expect(200, done);
    });
  });
});
