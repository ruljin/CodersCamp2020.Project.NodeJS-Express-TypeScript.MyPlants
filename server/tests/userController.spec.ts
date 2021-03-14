import request from 'supertest';
import app from '../app';
import { User, Note } from '../models/user';

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

const testUserWithNote = {
  login: 'login',
  email: 'email',
  password: 'password',
  name: 'userWithNote',
  surname: 'user',
  admin: false,
  plants: [],
  notes: []
};

const testNote = {
  title: 'test note',
  text: 'sample text',
  plant: '123123123123',
  private: true
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
  let testedUserWithNote;
  let testedNote;
  let tokenUser;

  beforeAll(async (done) => {
    testedUser = await User.create(newUser);
    testedUserWithNote = await User.create(testUserWithNote);
    testedNote = await Note.create(testNote);
    testedUserWithNote.get('notes').push(testedNote);
    testedUserWithNote.save();
    request(app)
      .post('/api/user/login')
      .send({ email: 'user', password: 'user' })
      .end((err, res) => {
        tokenUser = res.body.token;
        done();
      });
  });

  test('GET user by id', (done) => {
    request(app).get(`/api/user/${testedUser.id}`).set('Authorization', `Bearer ${tokenUser}`).expect(200, done);
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

  test('GET all notes', (done) => {
    request(app)
      .get(`/api/user/${testedUserWithNote.id}/notes/`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('GET notes by ID', (done) => {
    request(app)
      .get(`/api/user/${testedUserWithNote.id}/notes/${testedNote.id}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('POST note', (done) => {
    request(app)
      .post(`/api/user/${testedUserWithNote.id}/notes/`)
      .send({
        title: 'tytul',
        text: 'tresc notki',
        plant: '123123123123',
        private: true
      })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('DELETE note', (done) => {
    request(app)
      .delete(`/api/user/${testedUserWithNote.id}/notes/${testedNote.id}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('PUT changes to note', (done) => {
    request(app)
      .put(`/api/user/${testedUserWithNote.id}/notes/${testedNote.id}`)
      .send({
        title: 'nowy tytul',
        text: 'nowa tresc',
        private: true,
        plant: '11111111111'
      })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });
});
