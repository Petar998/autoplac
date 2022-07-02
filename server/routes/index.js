const express = require('express')
const router = express.Router()
const writer = require('../writeFile');
const reader = require('../readFile');
router.get('/', (req, res) => {
    writer.writeFile()
    reader.readFile()
    res.redirect('/login')
})
router.get('/index', (req, res) => {
    res.render('index')
})
module.exports = router