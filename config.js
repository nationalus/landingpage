'use strict'

var fs = require('fs');

module.exports = function() { 
    var config = {
        secretKey : process.env.STRIP_SECRET_KEY || 
            'sk_test_pnRBYcLcnwtEjDB5NEvrwOnm',
        port : process.env.PORT || '8443',
        dbURI : process.env.MONGOLAB_URI || 'mongodb://localhost/landing-test',
        apiKey : process.env.API || 'API Key'
    };
    return config;
};
     
