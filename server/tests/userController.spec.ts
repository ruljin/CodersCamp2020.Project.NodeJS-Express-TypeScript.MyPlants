import request from 'supertest';
import app from '../app';
import { User, Note, Favourites } from '../models/user';

const newUser = {
  name: 'test',
  login: 'test',
  surname: 'test',
  email: 'test@test.pl',
  password: 'password',
  confirmPassword: 'password',
  notes: [],
  plants: [],
  favourites: []
};

const testUserWithNote = {
  login: 'login',
  email: 'email@test.pl',
  password: 'password',
  confirmPassword: 'password',
  name: 'userWithNote',
  surname: 'user',
  plants: [],
  notes: []
};

const testUserWithFavourites = {
  login: 'userTest',
  email: 'emailTest@test.pl',
  password: 'password',
  confirmPassword: 'password',
  name: 'userWWithFavorite',
  surname: 'userFav',
  plants: [],
  notes: [],
  favourites: []
};

const testNote = {
  title: 'test note',
  text: 'sample text',
  plant: '123123123123',
  private: true
};

const favourites = {
  user: '123456789876'
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
        email: 'user@test.pl',
        password: 'password',
        confirmPassword: 'password'
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
        email: 'admin@test.pl',
        password: 'password',
        confirmPassword: 'password',
        admin: true
      })
      .expect(200, done);
  });

  test('POST login', (done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'user@test.pl',
        password: 'password'
      })
      .expect(200, done);
  });
});

describe('/tests for logged user (is Auth)', () => {
  let testedUser;
  let testedUserWithNote;
  let testedNote;
  let tokenUser;
  let testedFav;
  let testedUserWithFavourites;

  beforeAll(async (done) => {
    await Note.deleteMany({});
    testedUser = await User.create(newUser);
    testedUserWithNote = await User.create(testUserWithNote);
    testedUserWithFavourites = await User.create(testUserWithFavourites);
    testedNote = await Note.create(testNote);
    testedFav = await Favourites.create(favourites);
    testedUserWithFavourites.get('favourites').push(favourites);
    testedUserWithFavourites.save();
    testedUserWithNote.get('notes').push(testedNote);
    testedUserWithNote.save();
    request(app)
      .post('/api/user/login')
      .send({ email: 'user@test.pl', password: 'password' })
      .end((err, res) => {
        tokenUser = res.body.token;
        done();
      });

    beforeEach(async () => {
      await Favourites.deleteMany({});
    });
  });

  test('GET user by id', (done) => {
    request(app).get(`/api/user/${testedUser.id}`).set('Authorization', `Bearer ${tokenUser}`).expect(200, done);
  });

  test('PUT user', (done) => {
    request(app)
      .put(`/api/user/${testedUser.id}`)
      .send({ surname: 'newSurname', password: 'password', confirmPassword: 'password' })
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

  test('POST user to favourites', (done) => {
    request(app)
      .post(`/api/user/${testedUserWithFavourites.id}/favourites/`)
      .send({
        user: '123456789876'
      })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('GET favourite users', (done) => {
    request(app)
      .get(`/api/user/${testedUserWithFavourites.id}/favourites/`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('DELETE favourite user', (done) => {
    request(app)
      .delete(`/api/user/${testedUserWithFavourites.id}/favourites/${testedFav.id}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });
});
