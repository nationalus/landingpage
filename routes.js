'use strict'

var express = require('express'),
    donateCtrl = require('./controllers/donate'),
    form = require('express-form'),
    field = form.field,
    router = express.Router();

var form = form(
    field('stripeToken').required().trim()
    .custom(function(token) {
        if (typeof(token) !== 'string') {
            return token.toString()
        }
    }),
    field('amount').trim().isInt().toInt()
    .custom(function(amount) {
        if (amount < 300) {
            throw new Error("Amount was too small");
        }
    }),
    field('email').trim().isEmail().required(),
    field('state').trim().isString().required(),
    field('city').required().trim().isString(),
    field('street').required().trim().isString(),
    field('first-name').trim().required(),
    field('last-name').trim().required(),
    field('occupation').trim().isString().required(),
    field('employer').trim().isString().required(),
    field('zipCode').trim().required().notEmpty()
);

router.post('/donate', form, donateCtrl.checkout);

module.exports = router; 
