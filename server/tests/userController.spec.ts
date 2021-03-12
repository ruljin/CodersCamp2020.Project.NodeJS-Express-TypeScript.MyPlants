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
  plants: []
};

describe('/tests for all user', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  test('POST user (register)', (done) => {
    request(app)
      .post('/api/user/')
      .send({
        name: 'user',
        login: 'user',
        surname: 'user',
        email: 'user',
        password: 'user',
        admin: false
      })
      .expect(200, done);
  });

  test('POST admin (register)', (done) => {
    request(app)
      .post('/api/user/')
      .send({
        name: 'admin',
        login: 'admin',
        surname: 'admin',
        email: 'admin',
        password: 'admin',
        admin: true
      })
      .expect(200, done);
  });

  test('POST login', (done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'user',
        password: 'user'
      })
      .expect(200, done);
  });
});

describe('/tests for logged user (is Auth)', () => {
  let testedUser;
  let tokenUser;

  beforeAll(async (done) => {
    testedUser = await User.create(newUser);
    request(app)
      .post('/api/user/login')
      .send({ email: 'user', password: 'user' })
      .end((err, res) => {
        tokenUser = res.body.token;
        done();
      });
  });

  test('GET user by id', (done) => {
    request(app).get(`/api/user/${testedUser.id}`).expect(200, done);
  });

  test('PUT user', (done) => {
    request(app)
      .put(`/api/user/${testedUser.id}`)
      .send({ surname: 'newSurname' })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('DELETE one user', (done) => {
    request(app).delete(`/api/user/${testedUser.id}`).set('Authorization', `Bearer ${tokenUser}`).expect(200, done);
  });
});
