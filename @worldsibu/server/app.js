// @ts-check

const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router;

const drugCtrl = require('./controllers/drug.controller');

dotenv.config();

const app = express();
const port = process.env.PORT || 10010;
const config = { appRoot: __dirname };

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '40mb'
}));

app.use(bodyParser.json({ limit: '40mb' }));

app.listen(port, () =>
  console.log('Running in port  %d', port));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const router = Router();

router.get

app.use(router);

module.exports = app;
