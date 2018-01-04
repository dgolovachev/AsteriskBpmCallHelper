var winston = require('winston');
winston.configure({
    transports: [
        new (winston.transports.Console)({ timestamp: true, json: false, colorize: true }),
        new (winston.transports.File)({ filename: 'log.log' })
    ]
});

module.exports = winston;