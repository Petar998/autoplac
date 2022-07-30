const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    code: { type: String },
    brand: { type: String },
    model: { type: String },
    year: { type: String },
    mileage: { type: String },
    body: { type: String },
    fuel: { type: String },
    seat: { type: String },
    cubicMeasure: { type: String },
    price: { type: String },
    color: { type: String },
    importCountry: { type: String },
    sold: { type: Boolean },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
})

module.exports = mongoose.model('Car', carSchema)