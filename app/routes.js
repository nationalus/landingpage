'use strict'

var express = require('express'),
    donateCtrl = require('./controllers/donate'),
    router = express.Router();

router.post('/donate', donateCtrl.validate);
router.post('/donate', donateCtrl.checkout);

module.exports = router; 
