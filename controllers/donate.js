'use strict'

var config = require('../config')(),
    stripe = require('stripe')(config.secretKey),
    logger = config.logger,
    model = require('../models/donations').model;

module.exports = {
    checkout : function(req, res, next) {
        if (req.form.isValid) {
            var source = req.body.stripeToken,
                amount = req.body.amount,
                email = req.body.email,
                zipCode = req.body.zipCode,
                firstName = req.body['first-name'],
                lastName = req.body['last-name'],
                city = req.body.city,
                street = req.body.street,
                state = req.body.state,
                occupation = req.body.occupation,
                employer = req.body.employer;

            stripe.charges.create({
                amount : amount,
                currency : 'usd',
                card : source, 
                receipt_email : email,
                description : 'Thank you for donating to Statesmen'
            }, function(err, charge) {
                if (err) {
                    if (err.rawType === 'invalid_request_error' ||
                        err.rawType === 'api_error') {
                        logger.error(err);
                        return res.status(400).send(err.message);
                    } else if (err.rawType === 'card_error') {
                        logger.error(err);
                        return res.status(400).send(err.code);
                    } else {
                        logger.error(err);
                        return res.status(500).send("Unknown Error recieved from " + 
                            "stripe"); 
                    }
                } else if (!charge) {
                    logger.error(err);
                    return res.status(500).send("Server Error");
                } else {
                    model.create({
                        amount : amount,
                        email : email,
                        firstName : firstName,
                        lastName : lastName,
                        address : {
                            street : street,
                            city : city,
                            state : state
                        },
                        zipcode : zipCode,
                        occupation : occupation,
                        employer : employer
                    }, function(err, donation) {
                        if (err || !donation) {
                            logger.error(err);
                            return res.status(500).send("Server Error");
                        } else {
                            return res.status(200).send("Success");
                        }
                    });
                }
            });
        } else {
            logger.debug(req.form);
            res.status(400).send("Invalid Form");
        }
    }
};
            
