'use strict'

var dbURI = require('../config').testDB,
    mongoose = require('mongoose'),
    dbCleaner = require('./utils'),
    should = require('should'),
    donationModel = require('../models/donations').model;

describe('Donation Model', function() {
    describe('Create', function() {
        it('Creates a new donation', function(done) {
            donationModel.create({
                amount : 1000,
                email : 'grim.reaper@reaper.com',
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
                email : 'grim.reaper@reaper.com',
                zipcode : '12345'
            }, function(err, created) {
                should.not.exist(created);
                should.exist(err);
                done();
            });
        });
        it('Attempts to create a donation without email', function(done) {
            donationModel.create({
                amount : 1000,
                zipcode : '12345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
        it('Attempts to create a donation without zipcode', function(done) {
            donationModel.create({
                amount : 1000,
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
                amount : 1000,
                email : 'grim.reaper',
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
                amount : 1000,
                email : '@reaper.com',
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
                amount : 1000,
                email : 'grim.reaperreaper.com',
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
                amount : 1000,
                email : 'grim.reaper@reaper.com',
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
                amount : 1000,
                email : 'grim.reaper@reaper.com',
                zipcode : '1345' 
            }, function(err, created) {
                should.exist(err);
                should.not.exist(created);
                done();
            });
        });
    }); 
});
