const mongoose = require('mongoose')

const buyerSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    personalID: { type: String },
    place: { type: String },
    postalCode: { type: String },
    street: { type: String },
    streetNumber: { type: String },
    phone: { type: String }
})

module.exports = mongoose.model('Buyer', buyerSchema)