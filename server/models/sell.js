const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sellSchema = new Schema(
    {
        buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' },
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
        sellDate: { type: Date }
    }
)

module.exports = mongoose.model('Sell', sellSchema)