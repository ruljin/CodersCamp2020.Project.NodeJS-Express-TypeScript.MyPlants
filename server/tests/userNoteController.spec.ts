import request from 'supertest';
import app from '../app';
import { User, Note } from '../models/user';

const testUser = {
  login: 'login',
  email: 'email',
  password: 'password',
  name: 'user',
  surname: 'user',
  admin: false,
  plants: [],
  notes: [
    {
      title: 'new public note',
      text: 'sample public text'
    }
  ]
};

const testNote = {
  title: 'test note',
  text: 'sample text'
};

describe('/tests for user notes', () => {
  let testedUser;
  let testedNote;

  beforeEach(async () => {
    await User.deleteMany({ });
    await Note.deleteMany({ });
    testedUser = await User.create(testUser);
    testedNote = await Note.create(testNote);
    testedUser.get('notes').push(testedNote);
    testedUser.save();
  });

  describe('GET', () => {
    it('GET all notes', (done) => {
      request(app)
        .get(`/api/user/${testedUser.id}/notes/`)
        .expect(200, done);
    });
    it('GET notes by ID', (done) => {
      request(app)
        .get(`/api/user/${testedUser.id}}/notes/${testedNote.id}`)
        .expect(200, done);
    });
  });

  describe('POST', () => {
    it('POST note', (done) => {
      request(app)
        .post(`/api/user/${testedUser.id}/notes/`)
        .send({
          title: 'tytul',
          text: 'tresc notki'
        })
        .expect(200, done);
    });
  });
  describe('DELETE', () => {
    it('DELETE note', (done) => {
      request(app)
        .delete(`/api/user/${testedUser.id}/notes/${testedNote.id}`)
        .expect(200, done);
    });
  });
  describe('PUT', () => {
    it('PUT changes to note', (done) => {
      request(app)
        .put(`/api/user/${testedUser.id}/notes/${testedNote.id}`)
        .send({
          title: 'nowy tytul',
          text: 'nowa tresc'
        })
        .expect(200, done);
      done();
    });
  });
});
