'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

var zipcodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

var DonationSchema = new Schema({
    amount : { 
        type : Number,
        required : true,  
        min : 3,
        max : 199
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        maxlength : 256,
        match : emailRegex
    },
    zipcode : {
        type : String,
        required : true,
        match : zipcodeRegex
    },
    firstName : {
        type : String,
        maxlength : 256,
        required : true
    },
    lastName : {
        type : String,
        maxlength : 256,
        required : true
    },
    created : {
        type : Date,
        default : Date.now()
    },
    employer : {
        type : String,
        maxlength : 256,
    },
    occupation : {
        type : String,
        maxlength : 256,
    },
    address : {
        street : {
            type : String,
            maxlength : 256,
            required : true
        },
        city : {
            type : String,
            maxlength : 256,
            required : true
        },
        state : {
            type : String,
            maxlength : 256,
            required : true
        }
    } 
});

var DonationModel = mongoose.model('Donation', DonationSchema);

module.exports = {
    model : DonationModel 
};
    
