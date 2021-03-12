import request, { agent } from 'supertest';
import app from '../app';

describe('GET /user', () => {
  let request = null;
  let server = null;

  beforeAll((done) => {
    server = app.listen(done);
    request = agent(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('respond with json containing a user by given id', (done) => request(app)
    .get('/api/user/603bd36cd5b57809e4fd4bc3')
    .expect(200, done));
});
