'use strict'

var fs = require('fs');

module.exports = {
    secretKey : process.env.SECRET_KEY || 'Test Key',
    port : process.env.PORT || '8443',
    key : fs.readFileSync('key.pem'),
    cert : fs.readFileSync('cert.pem'),
    dbURI : 'mongodb://localhost/landing-test',
    apiKey : process.env.API || 'API Key'
};
     
