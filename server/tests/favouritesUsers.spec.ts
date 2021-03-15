import request from 'supertest';
import app from '../app';
import { Favourites, User } from '../models/user';

const newUser = {
  name: 'test',
  email: 'email',
  password: 'password',
  notes: [],
  plants: [],
  favourites: []
};

const favourites = {
  user: '123456789876'
};

describe('add user to favourite for logged users (isAuth)', () => {
  let tokenUser;
  let testedUser;
  let testedFav;

  beforeAll(async (done) => {
    testedUser = await User.create(newUser);
    testedFav = await Favourites.create(favourites);
    testedUser.get('favourites').push(favourites);
    request(app)
      .post('/api/user/login')
      .send({ email: 'user', password: 'user' })
      .end((err, res) => {
        tokenUser = res.body.token;
        done();
      });
  });

  beforeEach(async () => {
    await Favourites.deleteMany({ });
  });

  test('POST user to favourites', (done) => {
    request(app)
      .post(`/api/user/${testedUser.id}/favourites/`)
      .send({
        user: '123456789876'
      })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('GET favourite users', (done) => {
    request(app)
      .get(`/api/user/${testedUser.id}/favourites/`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('DELETE favourite user', (done) => {
    request(app)
      .delete(`/api/user/${testedUser.id}/favourites/${testedFav.id}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });
});
