'use strict';

const bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  winston = require('winston'),
  cookieParser = require('cookie-parser');
  
/**
 * Configure express.
 *
 * @param {*} express
 * @param {*} app
 * @param {String} envOverride
 */
module.exports = function (express, app, envOverride) {
  /* jshint maxstatements: 16 */
  const env = envOverride || process.env.NODE_ENV || 'local';

  app.set('env', env);
  app.set('port', process.env.PORT || 8081);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Allow PUT, PATCH and DELETE
  app.use(methodOverride());

  app.use(express.static('public'));

  let allowHeaders = [
    'Accept',
    'Authorization',
    'Content-Type'
  ];

  //AJAX calls should be allowed from all domains
  app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.header('Access-Control-Max-Age', '600');
    return next();
  });

  // This header is set by nginx when proxy'ing requests
  app.use(function (request, response, next) {
    request.forwardedSecure = (request.headers['x-forwarded-proto'] === 'https');
    return next();
  });

  app.get('/health-check', (req, res) => {
    let serviceName = require(__dirname + '/../../package.json').name;
    let serviceVersion = require(__dirname + '/../../package.json').version;
    res.serverOk({ env: env, service: serviceName, version: serviceVersion });
  });

  app.use((err, req, res, next) => {
    winston.error(`Error at API call(${req.originalUrl}): ${err}`);
    next(err);
  });

  app.disable('x-powered-by');

  // enhance the regular express response
  require('./express.enhance')(express);

};
