const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    sifraVozila: { type: String },
    marka: { type: String },
    model: { type: String },
    godiste: { type: String },
    brojKilometara: { type: Number },
    karoserija: { type: String },
    vrstaGoriva: { type: String },
    brojSedista: { type: Number },
    zapreminaMotora: { type: String },
    cenaEvri: { type: Number },
    boja: { type: String },
    zemljaUvoza: { type: String },
    prodat: { type: String }
})

module.exports = mongoose.model('Car', carSchema)