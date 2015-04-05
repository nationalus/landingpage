'use strict'

var config = require('../config')(),
    mongoose = require('mongoose');

before(function(done) {
    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function() {});
        }
        return done();
    }


    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.dbURI, function(err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
});

beforeEach(function(done) {
    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function() {});
        }
        return done();
    }


    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.dbURI, function(err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
});

afterEach(function(done) {
    return done();
});

