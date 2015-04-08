'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

var zipcodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

var DonationSchema = new Schema({
    amount : { 
        type : Number,
        required : true,  
        min : 300,
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
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    created : {
        type : Date,
        default : Date.now()
    },
    employer : {
        type : String,
        required : true
    },
    occupation : {
        type : String,
        required : true
    },
    address : {
        street : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        state : {
            type : String,
            required : true
        }
    } 
});

var DonationModel = mongoose.model('Donation', DonationSchema);

module.exports = {
    model : DonationModel 
};
    
