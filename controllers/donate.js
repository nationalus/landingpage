'use strict'

var config = require('../config')(),
    stripe = require('stripe')(config.secretKey),
    model = require('../models/donations').model;

module.exports = {
    checkout : function(req, res, next) {
        if (req.form.isValid) {
            console.log(req.body.stripeToken);
            var source = req.body.stripeToken.toString(),
                amount = req.body.amount,
                currency = req.body.currency,
                email = req.body.email,
                zipCode = req.body.zipCode,
                name = req.body.name,
                address = req.body.address,
                occupation = req.body.occupation,
                employer = req.body.employer;

            stripe.charges.create({
                amount : amount,
                currency : currency,
                card : source, 
                receipt_email : email,
                description : 'Thank you for donating to Statesmen'
            }, function(err, charge) {
                if (err) {
                    if (err.rawType === 'invalid_request_error' ||
                        err.rawType === 'api_error') {
                        return res.status(400).send(err.message);
                    } else if (err.rawType === 'card_error') {
                        return res.status(400).send(err.code);
                    } else {
                        return res.status(500).send("Unknown Error recieved from " + 
                            "stripe"); 
                    }
                } else if (!charge) {
                    return res.status(500).send("Server Error");
                } else {
                    model.create({
                        amount : amount,
                        email : email,
                        name : req.body.name,
                        address : req.body.address,
                        zipcode : zipCode,
                        occupation : occupation,
                        employer : employer
                    }, function(err, donation) {
                        if (err || !donation) {
                            // Debug Log
                            return res.status(500).send("Server Error");
                        } else {
                            console.log(donation);
                            return res.status(200).send("Success");
                        }
                    });
                }
            });
        } else {
            res.status(400).send("Invalid Form");
        }
    }
};
            
