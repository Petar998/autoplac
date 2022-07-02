const mongoose = require('mongoose')

const buyerSchema = new mongoose.Schema({
    imeKupca: { type: String },
    prezimeKupca: { type: String },
    jmbg: { type: String },
    mestoBoravka: {
        ulica: { type: String },
        broj: { type: String },
        mesto: { type: String },
        ptt: { type: String }
    },
    telefon: { type: String }
})

module.exports = mongoose.model('Buyer', buyerSchema)