import * as userController from '../controllers/userController';

const express = require('express');
const router = express.Router();

const api = '/api/';

// app.use(`${api}/plant`, plantController);
app.use(`${api}/user`, userController);