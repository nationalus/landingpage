'use strict'

var fs = require('fs');

module.exports = function() { 
    var config = {
        secretKey : process.env.SECRET_KEY || 'sk_test_HXKvNvuINMPeCBcFOORVsP3q',
        port : process.env.PORT || '8443',
        key : fs.readFileSync('key.pem').toString(),
        cert : fs.readFileSync('cert.pem').toString(),
        dbURI : 'mongodb://localhost/landing-test',
        apiKey : process.env.API || 'API Key'
    };
    return config;
};
     
