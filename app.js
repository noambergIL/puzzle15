'use strict';

const express = require('express'),
  expressSetup = require('./config/express.setup'),
  logSetup = require('./config/winston.setup'),
  winston = require('winston');

// Load environment variables from .env file.
require('dotenv-safe').load();

// Set environment
const environment = process.env.NODE_ENV || 'local';

logSetup(winston);

const app = express();

expressSetup(express, app, environment);

winston.info(`Loading node server, Environment ${app.get('env')}`);

// swagger
require('./config/swagger')(app, () => {

  // Load routes
  require('./src/routers/game.route')(app);

  // Create the server
  app.listen(app.get('port'), function (err) {
    if (err) {
      winston.error(`Error launching service : ${err}`);
      throw  err;
    } else {
      winston.info(`Server is listening on port: ${app.get('port')}`);
    }
  });
});

module.exports = app;
