const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const complaintSchema = new Schema(
    {
        kupac: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' },
        vozilo: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
        datumReklamacije: { type: Date },
        opis: { type: String }
    }
)

module.exports = mongoose.model('Complaint', complaintSchema)