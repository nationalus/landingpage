'use strict'

var express = require('express'),
    donateCtrl = require('./controllers/donate'),
    form = require('express-form'),
    field = form.field,
    router = express.Router();

var form = form(
    field('source').custom(function(value) {
        if (value.stripeToken ? !value.customer : value.customer) {
            return value.stripeToken ? value.stripeToken : value.customer;
        } else {
            throw new Error();
        }
    }),
    field('stripeToken').trim().required().notEmpty(),
    field('amount').trim().isInt().toInt(),
    field('currency').trim().isString().equals('usd'),
    field('email').trim().isEmail().required(),
    field('address').trim().required(),
    field('name').trim().required(),
    field('occupation').trim().isString().required(),
    field('employer').trim().isString().required(),
    field('zipCode').trim().required().notEmpty()
);

router.post('/donate', form, donateCtrl.checkout);

module.exports = router; 
