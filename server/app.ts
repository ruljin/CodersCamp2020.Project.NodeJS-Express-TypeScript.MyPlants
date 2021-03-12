import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import './database.ts';

import plantController from './controllers/plantController';
import userController from './controllers/userController';
import noteController from './controllers/noteController';
import messageController from './controllers/messageController';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/user', userController);
app.use('/api/user/:id/note', noteController);
app.use('/api/message', messageController);
app.use('/api/plant', plantController);

export default app;
