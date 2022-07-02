const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sellSchema = new Schema(
    {
        kupac: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' },
        vozilo: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
        datumProdaje: { type: Date }
    }
)

module.exports = mongoose.model('Sell', sellSchema)