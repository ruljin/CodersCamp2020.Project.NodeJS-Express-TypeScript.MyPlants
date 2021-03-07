import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import './database.ts';

import plantController from './controllers/plantController';
import newPlantController from './controllers/newPlantController';
import userController from './controllers/userController';
import messageController from './controllers/messageController';

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
app.use('/api/message', messageController);
app.use('/api/plant', plantController);
app.use('/api/newPlant', newPlantController);

export default app;
