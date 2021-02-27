import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

import './database';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

import './router/router';

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
})

export { app };
