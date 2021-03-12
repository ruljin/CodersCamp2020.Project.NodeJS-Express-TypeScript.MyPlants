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

describe('/plant for plants', () => {
  let testedPlant;

  const tokenAdmin =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGI4MzM4ODk3Mjg3MGRmNGI0MTkzNyIsImVtYWlsIjoiYWRtaW4iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjE1NTYxNTUwLCJleHAiOjE2MTU1NjUxNTB9.KLrndG1xl4Kq4Vrr3rLpDu8I1QepHpWVDqqff3jXzb4';

  const tokenUser =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGI4MzZjODk3Mjg3MGRmNGI0MTkzOCIsImVtYWlsIjoidXNlciIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjE1NTYxNTg0LCJleHAiOjE2MTU1NjUxODR9.g7PZcMNNf_hpNbgYpYeRarvTyvKFAWyXo3K0c8Qb9Wo';

  beforeEach(async () => {
    await Plant.deleteMany({});
    await Comment.deleteMany({});
    testedPlant = await Plant.create(testPlant);
  });

  describe('GET', () => {
    it('GET respond with json containing all plants', (done) => {
      request(app).get('/api/plant/').expect(200, done);
    });
    it('GET get plant by ID', (done) => {
      request(app).get(`/api/plant/${testedPlant.id}`).expect(200, done);
    });
  });

  describe('POST', () => {
    it('POST create a new plant', (done) => {
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
  });

  describe('PUT', () => {
    it('PUT change plant to accepted', (done) => {
      request(app).put(`/api/plant/${testedPlant.id}`).set('Authorization', `Bearer ${tokenAdmin}`).expect(200, done);
    });
  });

  describe('DELETE', () => {
    it('DELETE delete one plant', (done) => {
      request(app)
        .delete(`/api/plant/${testedPlant.id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect(200, done);
    });
  });
});

describe('/plant for comments', () => {
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

  describe('GET comments', () => {
    it('GET all comments of a plant', (done) => {
      request(app).get(`/api/plant/${testedPlant.id}/comments`).expect(200, done);
    });
  });

  describe('POST comment', () => {
    it('POST new comment of a plant', (done) => {
      request(app)
        .post(`/api/plant/${testedPlant.id}/comments`)
        .send({
          user: '123456789103',
          text: 'NEW Test comment'
        })
        .expect(200, done);
    });
  });

  describe('DELETE comment', () => {
    it('DELETE comment', (done) => {
      request(app).delete(`/api/plant/${testedPlant.id}/comments/${testedComment.id}`).expect(200, done);
    });
  });

  describe('PUT change comment', () => {
    it('PUT change comment', (done) => {
      request(app)
        .put(`/api/plant/${testedPlant.id}/comments/${testedComment.id}`)
        .send({
          user: '123456789103',
          text: 'NEW Test comment changed'
        })
        .expect(200, done);
      done();
    });
  });
});
