const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);
app.use;

module.exports = app;
