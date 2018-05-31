'use strict';

const os = require('os');
const process = require('process');
const winston = require('winston');

/**
 * Encapsulates winston configurations.
 *
 * @param {Object} options - contains envOverride
 */
module.exports = function (options) {

    if (!winston) {
        throw new Error("winston was not loaded");
    }
    
    let envResults = undefined;
    if (options) {
        envResults = options.envOverride ? options.envOverride : process.env.NODE_ENV || 'local';
    } else {
        envResults = process.env.NODE_ENV || 'local';
    }

    const env = envResults;

    const hostname = os.hostname(),
        isProduction = (env === 'production'),
        isStaging = (env === 'staging'),
        isDevelopment = (env === 'development'),
        isTesting = (env === 'test');

    let serviceName = require(__dirname + '/../package.json').name;

    /**
     * Custom log format.
     *ת
     * @param {Object} options
     * @returns {String}
     */
    function logFormatter(options) {
        // Return string will be passed to the loggers.
        return options.timestamp() + ' - ' + hostname + ' - [' +
            options.level.toUpperCase() + '] - ' + (options.message !== undefined ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
    }

    let logLevelDefaults = {
        production: 'info',
        staging: 'debug',
        development: 'debug',
        test: 'error',
        local: 'debug'
    };

    let logLevel = process.env.LOG_LEVEL || logLevelDefaults[env] || 'info';

    winston.remove(winston.transports.Console);

    if (!isTesting) {
        // Log to local file.
        winston.add(winston.transports.File, {
            name: 'local-file-log',
            filename: __dirname + '/../logs/' + env + '.log',
            level: logLevel,
            json: false,
            maxsize: 100 * (1024 * 1024), // Max 100mb
            handleExceptions: isProduction, // Handle exceptions in production
            exitOnError: !isProduction, // Don't exit on error in production

            formatter: logFormatter,

            timestamp: function () {
                // Log UTC date format
                return (new Date()).toUTCString();
            }
        });

        winston.add(winston.transports.Console, {
            level: logLevel
        });
    }
};