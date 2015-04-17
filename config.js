'use strict';

var winston = require('winston'),
    logger = new (winston.Logger)({
        transports : [
            new (winston.transports.Console)({
                level : 'debug',
                colorize : true,
                timestamp : true,
                showLevel : true
            })
        ]
    });

module.exports = function() { 
    var config = {
        secretKey : process.env.STRIPE_SECRET_KEY || 
            'sk_test_pnRBYcLcnwtEjDB5NEvrwOnm',
        port : process.env.PORT || '8443',
        dbURI : process.env.MONGOLAB_URI || 'mongodb://localhost/landing-test',
        encoding : process.env.NODE_ENV === 'dev' ? 'none' : 'gzip',
        root : process.env.NODE_ENV === 'dev' ? 'public' : 'dist',
        logger : logger
    };
    return config;
};
     
