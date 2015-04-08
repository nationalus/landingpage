var supertest = require('supertest'),
    dbCleaner = require('./utils'),
    app = require('../app');

describe('POST /donate', function() {
    it('Donate Endpoint', function(done) {
        this.timeout(4000);
        supertest(app)
        .post('/donate')
        .send({
            source : {
                object : 'card',
                number : '4111111111111111',
                exp_month : '04',
                exp_year : '2016',
                cvc : '123'
            },
            amount : 1000,
            currency : 'usd',
            address : 'Diagon Alley',
            name : 'Grim Reaper',
            occupation : 'Reaper of Souls',
            employer : 'Fate',
            email : 'grim.reaper@reaper.com',
            zipCode : '12345'
        })
        .expect(200)
        .end(function(err, res) {
            if (err) {
                console.log(err);
                return done(err);
            }
            return done();
        });
    });  
});

