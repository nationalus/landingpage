'use strict';

var express = require('express'),
    donateCtrl = require('./controllers/donate'),
    form = require('express-form'),
    field = form.field,
    router = express.Router();

var form = form(
    field('stripeToken').required().trim()
    .custom(function(token) {
        if (typeof(token) !== 'string') {
            return token.toString();
        }
    }),
    field('amount').trim().isInt().toInt()
    .custom(function(amount) {
        if (amount < 3 || amount > 199) {
            throw new Error("Donation must be greater than " +
                "$2 and less than $200");
        }
    }),
    field('email').trim().isEmail().required(),
    field('state').trim().isString().required(),
    field('city').required().trim().isString(),
    field('street').required().trim().isString(),
    field('first-name').trim().required().isString(),
    field('last-name').trim().required().isString(),
    field('occupation').isString().trim(),
    field('employer').isString().trim(),
    field('zipCode').trim().required().isString()
    .custom(function(zipcode) {
        if (zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {
            return;
        }
        throw new Error("Invalid zipcode");
    })
);

router.post('/donate', form, donateCtrl.checkout);

module.exports = router; 
