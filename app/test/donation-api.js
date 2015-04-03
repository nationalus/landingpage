var supertest = require('supertest'),
    dbCleaner = require('./utils'),
    app = require('../app');

describe('POST /donate', function() {
    it('Donate Endpoint', function(done) {
        supertest(app)
        .post('/donate')
        .send({
            stripeToken : 'asdfghjkl',
            amount : 1000,
            email : 'grim.reaper@reaper.com',
            zipCode : '12345'
        })
        .expect(200)
        .end(function(err, res) {
            if (err) {
                console.log(err);
                return done(err);
            }
            done();
        });
    });  
});

