'use strict'

var config = require('../config');
var stripe = require('stripe')(config.secretKey);
var model = require('../models/donations').model;

module.exports = {
    checkout : function(req, res, next) {
        var stripeToken = req.body.stripeToken;
        var amount = req.body.amount,
            currency = req.body.currency,
            email = req.body.email,
            zipCode = req.body.zipCode;

        var charge = stripe.charges.create({
            amount : amount,
            currency : currency,
            source : stripeToken,
            receipt_email : email,
            description : 'Thank you for donating to Statesmen',
        }, function(err, charge) {
            if (err) {
                if (err.type === 'invalid_request_error' ||
                    err.type === 'api_error') {
                    return res.status(err.status).send(err.message);
                } else if (err.type === 'card_error') {
                    return res.status(400).send(err.code);
                } else {
                    return res.status(500).send("Server Error"); 
                }
            } else if (!charge) {
                return res.status(500).send("Server Error");
            } else {
                model.create({
                    amount : amount,
                    email : email,
                    zipCode : zipCode
                }, function(err, donation) {
                    if (err || !donation) {
                        // Debug Log
                        return res.status(500).send("Server Error");
                    } else {
                        return res.status(200).send("Success");
                    }
                });
            }
        });
    },
    validate : function(req, res, next) {
        req.checkBody('amount').notEmpty().isInt();
        req.checkBody('currency').isString().equals('usd');
        req.checkBody('stripeToken').notEmpty();
        req.checkBody('email').isEmail();
        req.checkBody('zipCode').notEmpty().isString();
       
        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).send('Invalid Form');
        }
        return next();
        
    }
};
            
