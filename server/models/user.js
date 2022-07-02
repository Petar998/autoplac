const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        ime: { type: String },
        prezime: { type: String },
        email: { type: String },
        lozinka: { type: String },
    }
)
module.exports = mongoose.model('User', userSchema)