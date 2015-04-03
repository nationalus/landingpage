'use strict'

var express = require('express'),
    donateCtrl = require('./controllers/donate'),
    form = require('express-form'),
    field = form.field,
    router = express.Router();

var form = form(
    field('stripeToken').trim().required().notEmpty(),
    field('amount').trim().isInt().toInt(),
    field('currency').trim().isString().equals('usd'),
    field('email').trim().isEmail().required(),
    field('zipCode').trim().required().notEmpty()
);

router.post('/donate', form, donateCtrl.checkout);

module.exports = router; 
