const mongoose = require('mongoose');

const IpsauceSchema = new mongoose.Schema({
    candidate: {
        type: Number,
        required: [true, "You must choose a candidate"],
        unique: true
    },
    vote: {
        type: Number,
        required: [true, "You have to vote"]

    }
})

module.exports = mongoose.models.Ipsauce || mongoose.model('Ipsauce', IpsauceSchema);