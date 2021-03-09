import * as request from 'supertest';
import * as app from '../server';

describe('GET /user', () => {
  it('respond with json containing a user by given id', (done) => {
    request(app.default.server)
      .get('/api/user/603bd36cd5b57809e4fd4bc3')
      .expect(200, done);
  });
});