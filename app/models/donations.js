'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

var zipcodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

var DonationSchema = new Schema({
    amount : { 
        type : Number,
        required : true,  
        max : 19900
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        match : emailRegex
    },
    zipcode : {
        type : String,
        required : true,
        match : zipcodeRegex
    } 
});

module.exports = {
    model : mongoose.model('Donation', DonationSchema)
};
    
