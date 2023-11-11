
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const configureExpress = () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  return app;
};

module.exports = configureExpress;
