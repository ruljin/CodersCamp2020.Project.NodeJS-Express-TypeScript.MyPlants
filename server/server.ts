import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import './database.ts';
import userController from './controllers/userController';
import noteController from './controllers/noteController';

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.use('/api/user', userController);
app.use('/api/user/:id/note', noteController);

export default app;
