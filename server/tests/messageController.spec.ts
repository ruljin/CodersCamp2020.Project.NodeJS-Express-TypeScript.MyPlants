import request from 'supertest';
import app from '../app';
import { Message } from '../models/message';

describe('GET message endpoint', () => {
  beforeEach(async () => {
    await Message.deleteMany({});
  });

  it('should return all messages', (done) => {
    request(app).get('/api/message/').expect(200, done);
  });
});

describe('POST message endpoint', () => {
  beforeEach(async () => {
    await Message.deleteMany({});
  });

  it('should post new message with specified date', (done) => {
    request(app)
      .post('/api/message/')
      .send({
        chat: '123456789101',
        text: 'Hello it\'s test',
        user: '123456789101',
        date: '2021-03-12'
      })
      .expect(200, done);
  });

  it('should post new message without specified date', (done) => {
    request(app)
      .post('/api/message/')
      .send({
        chat: '123456789101',
        text: 'Hello it\'s test',
        user: '123456789101'
      })
      .expect(200, done);
  });
});

describe('DELETE message endpoint', () => {
  let testMessage;

  beforeEach(async () => {
    await Message.deleteMany({});
    testMessage = await Message.create({
      chat: '123456789101',
      text: 'Hello it\'s test',
      user: '123456789101'
    });
  });

  it('should delete message', (done) => {
    request(app)
      .delete(`/api/message/${testMessage.id}`)
      .expect(200, done);
  });
});
