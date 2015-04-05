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
                amount : 1000,
                email : 'grim.reaper@reaper.com',
                name : 'Grim Reaper',
                address : 'Death Valley, CA 1234',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '12345' 
            }, function(err, created) {
                should.not.exist(err);
                should.exist(created);
                created.email.should.equal(
                    'grim.reaper@reaper.com');
                created.amount.should.equal(1000);
                created.zipcode.should.equal('12345');
                done();
            });
        });
    });
    describe('Invalid', function() {
        it('Attempts to create a donation without amount', function(done) {
            donationModel.create({
                name : 'Grim Reaper',
                address : 'Diagon Alley',
                email : 'grim.reaper@reaper.com',
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
                name : 'Grim Reaper',
                address : 'Diagon Alley',
                amount : 1000,
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
                name : 'Grim Reaper',
                address : 'Diagon Alley',
                amount : 1000,
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                email : 'grim.reaper@reaper.com'
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
                amount : 1000,
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
                name : 'Grim Reaper',
                address : 'Diagon Alley',
                amount : 1000,
                email : '@reaper.com',
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
                name : 'Grim Reaper',
                address : 'Diagon Alley',
                amount : 1000,
                email : 'grim.reaperreaper.com',
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
                name : 'Grim Reaper',
                address : 'Diagon Alley',
                amount : 1000,
                email : 'grim.reaper@reaper.com',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '1f345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation with invalid zipcode', 
            function(done) {
            donationModel.create({
                name : 'Grim Reaper',
                address : 'Diagon Alley',
                amount : 1000,
                email : 'grim.reaper@reaper.com',
                occupation : 'Reaper of Souls',
                employer : 'Fate',
                zipcode : '1345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation without address', 
            function(done) {
            donationModel.create({
                name : 'Grim Reaper',
                amount : 1000,
                email : 'grim.reaper@reaper.com',
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
                name : 'Grim Reaper',
                amount : 1000,
                address : 'Diagon Alley',
                email : 'grim.reaper@reaper.com',
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
                name : 'Grim Reaper',
                amount : 1000,
                address : 'Diagon Alley',
                email : 'grim.reaper@reaper.com',
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
