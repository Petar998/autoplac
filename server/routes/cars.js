const express = require('express')
const router = express.Router()
const Car = require('../models/car')
const streams = require('../streamAndUtil')
router.get('/new', (req, res) => {
    res.render('cars/new', { car: new Car(req.body), errorMessage: '' })
})
router.post('/', async (req, res) => {
    let car = new Car(req.body)
    car.prodat = 'ne';
    try {
        await car.save()
        streams.reader.pipe(streams.writer)
        res.redirect('/index')
    } catch (error) {
        res.render('cars/new', {
            car: car,
        })
    }
})
module.exports = router