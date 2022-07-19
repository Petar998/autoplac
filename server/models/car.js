const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    brand: { type: String },
    model: { type: String },
    year: { type: String },
    mileage: { type: Number },
    body: { type: String },
    fuel: { type: String },
    seat: { type: String },
    cubicMeasure: { type: Number },
    price: { type: Number },
    color: { type: String },
    importCountry: { type: String },
    sold: { type: Boolean },
})

module.exports = mongoose.model('Car', carSchema)