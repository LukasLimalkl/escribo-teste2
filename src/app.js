const express = require('express');
const router = require('./routes/router.js');
const bodyParser = require('body-parser');
const { errorRouter } = require('./middleware/index.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);
app.use(errorRouter);

module.exports = app;
