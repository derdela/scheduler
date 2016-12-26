const mongoose = require('mongoose');

const Teacher = mongoose.model('Teacher', {
    name: String,
    availabilty: [{
        day: String,
        from: Date,
        to: Date
    }],
    bookings: [{
        day: String,
        from: Date,
        to: Date
    }]
});

module.exports = { Teacher }