require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
export const mongoose = require('mongoose');


const PORT = process.env.PORT;

require('./database.ts');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

require('./router/router.ts');

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
})

module.exports = app;