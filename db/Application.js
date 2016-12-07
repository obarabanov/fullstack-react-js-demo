const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var	Application = new Schema({

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        min: 1,
        max: 99,
        required: true
    },

    zip: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Application', Application);
