var supertest = require('supertest'),
    dbCleaner = require('./utils'),
    config = require('../config')(),
    stripe = require('stripe')(config.secretKey),
    app = require('../app');

describe('Endpoint Testing', function() {
    it('Valid Stripe request', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
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
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Too small of amount', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                amount : 299,
                currency : 'usd',
                address : 'Diagon Alley',
                name : 'Grim Reaper',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                email : 'grim.reaper@reaper.com',
                zipCode : '12345'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Donation without currency', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                amount : 1000,
                address : 'Diagon Alley',
                name : 'Grim Reaper',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                email : 'grim.reaper@reaper.com',
                zipCode : '12345'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Donation without address', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                currency : 'usd',
                amount : 1000,
                name : 'Grim Reaper',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                email : 'grim.reaper@reaper.com',
                zipCode : '12345'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Donation w/o name', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                amount : 1000,
                currency : 'usd',
                address : 'Diagon Alley',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                email : 'grim.reaper@reaper.com',
                zipCode : '12345'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Donation w/o occupation', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                amount : 1000,
                currency : 'usd',
                address : 'Diagon Alley',
                name : 'Grim Reaper',
                employer : 'Fate',
                email : 'grim.reaper@reaper.com',
                zipCode : '12345'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Donation w/o employer', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                amount : 1000,
                currency : 'usd',
                address : 'Diagon Alley',
                name : 'Grim Reaper',
                occupation : 'Reaper of Souls',
                email : 'grim.reaper@reaper.com',
                zipCode : '12345'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Donation w/ invalid email', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                amount : 1000,
                currency : 'usd',
                address : 'Diagon Alley',
                name : 'Grim Reaper',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                email : 'grim.reaper@',
                zipCode : '12345'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Donation w/o email', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                amount : 1000,
                currency : 'usd',
                address : 'Diagon Alley',
                name : 'Grim Reaper',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipCode : '12345'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Donation w/ invalid zipcode', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                amount : 1000,
                currency : 'usd',
                address : 'Diagon Alley',
                name : 'Grim Reaper',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                email : 'grim.reaper@reaper.com',
                zipCode : '1234'
            })
            .expect(500)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
    it('Donation w/o zipcode', function(done) {
        this.timeout(4000);
        new Promise(function(resolve, reject) {
            stripe.tokens.create({
                card : {
                    'number' : '4242424242424242',
                    'exp_month' : 12,
                    'exp_year' : 2016,
                    'cvc' : '123'
                }
            }, function(err, token) {
                if (err) return reject(err);
                return resolve(token);
            })
        })
        .then(function(token) {
            supertest(app)
            .post('/donate')
            .send({
                stripeToken : token.id,
                amount : 1000,
                currency : 'usd',
                address : 'Diagon Alley',
                name : 'Grim Reaper',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                email : 'grim.reaper@reaper.com'
            })
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                return done();
            });
        }).catch(function(err) {
            console.log(err);
            return done(err);
        });
    });  
});

