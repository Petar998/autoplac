const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const complaintSchema = new Schema(
    {
        buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' },
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
        complaintDate: { type: Date },
        description: { type: String },
        rejected: { type: Boolean },
    }
)

module.exports = mongoose.model('Complaint', complaintSchema)