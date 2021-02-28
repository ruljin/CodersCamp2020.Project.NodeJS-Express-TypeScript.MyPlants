import * as mongoose from 'mongoose';

require('custom-env').env(`${process.env.NODE_ENV}`, './server/config/');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;

database.once('open', () => {
  console.log('Database connected');
});

database.on('error', (err) => {
  console.error(`Connection error, ${err}`);
});
