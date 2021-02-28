import { MongoClient } from 'mongodb';

require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_URL}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  if (err) console.error(err);
  const collection = client.db('test').collection('devices');
  console.log(collection);
  client.close();
});
