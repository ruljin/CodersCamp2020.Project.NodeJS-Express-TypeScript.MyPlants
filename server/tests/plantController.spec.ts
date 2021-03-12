import request from 'supertest';
import app from '../app';
import { Plant, Comment } from '../models/plant';

const testPlant = {
  name: 'BIG test!',
  latin_name: 'BIG Test in latin',
  min_temperature: 1,
  max_temperature: 29,
  watering: 'test',
  watering_method: 'test',
  subsoil: 'test',
  conditioners: 'test',
  spraying: 'test',
  sunlight: 'test',
  humidity: 'test',
  application: 'test',
  accepted: false,
  species: '123123123123',
  comments: [
    {
      user: '123456789102',
      text: 'BIG Test comment in plant'
    }
  ],
  toxicity: {
    human: true,
    animal: true
  }
};

const testComment = {
  user: '123456789101',
  text: 'BIG Test comment'
};

describe('/POST tests for user', () => {
  let testedPlant;
  let testedComment;

  beforeEach(async () => {
    await Plant.deleteMany({});
    await Comment.deleteMany({});
    testedPlant = await Plant.create(testPlant);
    testedComment = await Comment.create(testComment);
    testedPlant.get('comments').push(testedComment);
    testedPlant.save();
  });

  test('GET respond with json containing all plants', (done) => {
    request(app).get('/api/plant/').expect(200, done);
  });

  test('GET get plant by ID', (done) => {
    request(app).get(`/api/plant/${testedPlant.id}`).expect(200, done);
  });

  describe('GET comments', () => {
    it('GET all comments of a plant', (done) => {
      request(app).get(`/api/plant/${testedPlant.id}/comments`).expect(200, done);
    });
  });
});

describe('/POST tests for user (isAuth)', () => {
  let testedPlant;
  let testedComment;

  let tokenUser;

  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({ email: 'user', password: 'user' })
      .end((err, res) => {
        tokenUser = res.body.token;
        done();
      });
  });

  beforeEach(async () => {
    await Plant.deleteMany({});
    await Comment.deleteMany({});
    testedPlant = await Plant.create(testPlant);
    testedComment = await Comment.create(testComment);
    testedPlant.get('comments').push(testedComment);
    testedPlant.save();
  });

  test('POST create a new plant', (done) => {
    request(app)
      .post('/api/plant/')
      .send({
        name: 'Test 5',
        latin_name: 'Test in latin 5',
        min_temperature: 1,
        max_temperature: 29,
        watering: 'test',
        watering_method: 'test',
        subsoil: 'test',
        conditioners: 'test',
        spraying: 'test',
        sunlight: 'test',
        humidity: 'test',
        application: 'test',
        accepted: false,
        species: '123123123123',
        comments: [],
        toxicity: {
          human: true,
          animal: true
        }
      })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('POST new comment of a plant', (done) => {
    request(app)
      .post(`/api/plant/${testedPlant.id}/comments`)
      .send({
        user: '123456789103',
        text: 'NEW Test comment'
      })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('DELETE comment', (done) => {
    request(app)
      .delete(`/api/plant/${testedPlant.id}/comments/${testedComment.id}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
  });

  test('PUT change comment', (done) => {
    request(app)
      .put(`/api/plant/${testedPlant.id}/comments/${testedComment.id}`)
      .send({
        user: '123456789103',
        text: 'NEW Test comment changed'
      })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200, done);
    done();
  });
});

describe('/POST tests for user', () => {
  let tokenAdmin;
  let testedPlant;

  beforeEach(async () => {
    await Plant.deleteMany({});
    await Comment.deleteMany({});
    testedPlant = await Plant.create(testPlant);
  });

  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({ email: 'admin', password: 'admin' })
      .end((err, res) => {
        tokenAdmin = res.body.token;
        done();
      });
  });

  it('PUT change plant to accepted', (done) => {
    request(app).put(`/api/plant/${testedPlant.id}`).set('Authorization', `Bearer ${tokenAdmin}`).expect(200, done);
  });

  it('DELETE delete one plant', (done) => {
    request(app).delete(`/api/plant/${testedPlant.id}`).set('Authorization', `Bearer ${tokenAdmin}`).expect(200, done);
  });
});
