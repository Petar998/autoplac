const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: String },
    uri: { type: String },
})

module.exports = mongoose.model('Image', imageSchema)