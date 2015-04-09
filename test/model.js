'use strict'

var dbURI = require('../config').testDB,
    mongoose = require('mongoose'),
    should = require('should'),
    dbCleaner = require('./utils'),
    donationModel = require('../models/donations').model;

describe('Donation Model', function() {
    describe('Create', function() {
        it('Creates a new donation', function(done) {
            donationModel.create({
                amount : 100,
                email : 'grim.reaper@reaper.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '12345' 
            }, function(err, created) {
                should.not.exist(err);
                should.exist(created);
                created.email.should.equal(
                    'grim.reaper@reaper.com');
                created.amount.should.equal(100);
                created.zipcode.should.equal('12345');
                done();
            });
        });
    });
    describe('Invalid', function() {
        it('Attempts to create a donation without amount', function(done) {
            donationModel.create({
                email : 'grim.reaper@reaper.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '12345' 
            }, function(err, created) {
                should.not.exist(created);
                should.exist(err);
                done();
            });
        });
        it('Attempts to create a donation without email', function(done) {
            donationModel.create({
                amount : 100,
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '12345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation without zipcode', function(done) {
            donationModel.create({
                amount : 100,
                email : 'grim.reaper@reaper.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                occupation : 'Reaper of Souls',
                employer : 'Fate',
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation with invalid email', 
            function(done) {
            donationModel.create({
                name : 'Grim Reaper',
                address : 'Diagon Alley',
                amount : 100,
                email : 'grim.reaper',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '12345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation with invalid email', 
            function(done) {
            donationModel.create({
                amount : 100,
                email : 'grim.reaper@.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '12345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation with invalid email', 
            function(done) {
            donationModel.create({
                amount : 100,
                email : 'grim.reaperreaper.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '12345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation with invalid zipcode', 
            function(done) {
            donationModel.create({
                amount : 100,
                email : 'grim.reaper@reaper.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : 'a2345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation with invalid zipcode', 
            function(done) {
            donationModel.create({
                amount : 100,
                email : 'grim.reaper@reaper.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '2345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation without address', 
            function(done) {
            donationModel.create({
                amount : 100,
                email : 'grim.reaper@reaper.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '12345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation without employer', 
            function(done) {
            donationModel.create({
                amount : 100,
                email : 'grim.reaper@reaper.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                occupation : 'Reaper of Souls',
                zipcode : '12345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation without occupation', 
            function(done) {
            donationModel.create({
                amount : 100,
                email : 'grim.reaper@reaper.com',
                firstName : 'Grim',
                lastName : 'Reaper',
                address : {
                    city : 'Death Valley',
                    state :  'CA',
                    street : 'Silver Lane'
                },
                employer : 'Fate',
                zipcode : '12345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
    }); 
});
