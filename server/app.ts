import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import './database.ts';

import plantController from './controllers/plantController';
import userController from './controllers/userController';
import messageController from './controllers/messageController';
import calendarController from './controllers/calendarController';
import chatController from './controllers/chatController';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/user', userController);
app.use('/api/message', messageController);
app.use('/api/plant', plantController);
app.use('/api/calendar', calendarController);
app.use('/api/chat', chatController);

export default app;
