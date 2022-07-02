const express = require('express')
const router = express.Router()
const Buyer = require('../models/buyer')
const Sell = require('../models/sell')
const Car = require('../models/car')
const soldCar = require('../events');
router.get('/new', async (req, res) => {
    const cars = await Car.find({ prodat: 'ne' });
    res.render('sells/new', {
        cars: cars
    })
})
router.post('/', async (req, res) => {
    try {
        const formData = req.body;
        let buyer = new Buyer({
            imeKupca: formData.imeKupca, prezimeKupca: formData.prezimeKupca, jmbg: formData.jmbg,
            mestoBoravka: { ulica: formData.ulica, broj: formData.broj, mesto: formData.mesto, ptt: formData.ptt }, telefon: formData.telefon
        });
        let sell = new Sell({ kupac: buyer._id, vozilo: formData.vozilo, datumProdaje: new Date(req.body.datumProdaje) });
        await buyer.save()
        await sell.save()
        await Car.updateOne({ _id: formData.vozilo }, { prodat: 'da' })
        soldCar.sell()
        res.redirect('/index')
    } catch (error) {
        console.log(error);
    }
})
module.exports = router