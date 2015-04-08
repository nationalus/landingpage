'use strict'

var express = require('express'),
    donateCtrl = require('./controllers/donate'),
    form = require('express-form'),
    field = form.field,
    router = express.Router();

var form = form(
    field('amount').trim().isInt().toInt()
    .custom(function(amount) {
        if (amount < 300) {
            throw new Error("Amount was too small");
        }
    }),
    field('currency').required().trim().isString().equals('usd'),
    field('email').trim().isEmail().required(),
    field('address').trim().required(),
    field('name').trim().required(),
    field('occupation').trim().isString().required(),
    field('employer').trim().isString().required(),
    field('zipCode').trim().required().notEmpty()
);

router.post('/donate', form, donateCtrl.checkout);

module.exports = router; 
