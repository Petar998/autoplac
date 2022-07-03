const express = require('express')
const router = express.Router()
const Buyer = require('../models/buyer')
const Sell = require('../models/sell')
const Car = require('../models/car')
const Complaint = require('../models/complaint')
// router.get('/new', async (req, res) => {
//     const buyers = await Buyer.find();
//     const sells = await Sell.find().populate('vozilo');
//     res.render('complaints/new', { buyers: buyers, sells: sells })
// })
// router.post('/', async (req, res) => {
//     try {
//         let complaint = new Complaint({
//             kupac: req.body.kupac, vozilo: req.body.vozilo, datumReklamacije: new Date(req.body.datumReklamacije), opis: req.body.opis
//         });
//         await complaint.save()
//         res.redirect('/index')
//     } catch (error) {
//         const buyers = await Buyer.find();
//         const sells = await Sell.find().populate('vozilo');
//         res.render('complaints/new', {
//             buyers: buyers, cars: [], sells: sells
//         })
//     }
// })
module.exports = router