const Sell = require('../models/sell');
const Car = require('../models/car');
const Buyer = require('../models/buyer');

exports.getAll = async (req, res) => {
    const filters = req.query && req.query.filter ? JSON.parse(req.query.filter) : {};
    const sorter = req.query && req.query.sorter ? JSON.parse(req.query.sorter) : { createdAt: -1 };
    const skip = req.query && req.query.offset ? Number(req.query.offset) : 0;
    try {
        const count = await Sell.countDocuments(filters);
        const limit = req.query && req.query.limit ? Number(req.query.limit) : count;
        const items = await Sell.find(filters)
            .sort(sorter)
            .limit(Number(limit))
            .skip(Number(skip))
            .lean()
            .populate('car buyer');
        return res.status(200).json({ count, items } || { count: 0, items: [] });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    if (!req.params.id || req.params.id.length !== 24) {
        return res.status(401).json({
            message: 'Wrong id format.',
        });
    }
    try {
        const sell = await Sell.findById({ _id: req.params.id }).populate('buyer car');
        if (!sell) {
            return res.status(401).json({ message: 'Sell does not exist.' });
        }
        return res.status(200).json(sell);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.post = async (req, res) => {
    try {
        const item = new Sell(req.body);
        const data = req.body;
        if (!data.existBuyer) {
            let buyer = new Buyer({
                firstName: data.firstName, lastName: data.lastName, personalID: data.personalID,
                place: data.place, postalCode: data.postalCode, street: data.street, streetNumber: data.streetNumber, phone: data.phone
            });
            item.buyer = buyer._id;
            await buyer.save()
        } else {
            item.buyer = data.existBuyer
        }
        await Car.updateOne({ _id: data.car }, { sold: true })
        await item.save();
        return res.status(201).json({ message: 'Created' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    if (!req.params.id || req.params.id.length !== 24) {
        return res.status(401).json({ message: 'Wrong id format.' });
    }
    try {
        const id = req.params.id;
        const item = await Sell.findById(id);
        if (!item) {
            return res.status(401).json({ message: 'Does not exist.' });
        }
        await Buyer.deleteOne({ _id: item.buyer });
        await Car.updateOne({ _id: item.car }, { sold: false });
        await item.remove();
        return res.status(200).json({ message: 'Removed' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    if (!req.params.id || req.params.id.length !== 24) {
        return res.status(401).json({ message: 'Wrong id format.' });
    }
    try {
        const id = req.params.id;
        const sell = await Sell.findById(id);
        const buyerData = {
            _id: sell.buyer,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            personalID: req.body.personalID,
            place: req.body.place,
            postalCode: req.body.postalCode,
            street: req.body.street,
            streetNumber: req.body.streetNumber,
            phone: req.body.phone
        }

        if (req.body.existBuyer && req.body.existBuyer !== sell.buyer) {
            await Buyer.updateOne({ _id: req.body.existBuyer }, { ...buyerData });
        } else {
            await Buyer.updateOne({ _id: sell.buyer }, { ...buyerData });
        }

        if (sell.car !== req.body.car) {
            await Car.updateOne({ _id: sell.car }, { sold: false });
            await Car.updateOne({ _id: req.body.car }, { sold: true });
        }
        await Sell.updateOne({ _id: id }, { ...req.body, buyer: sell.buyer });
        return res.status(200).json({ message: 'Updated' });
    } catch (error) {
        console.log('server err', error)
        return res.status(500).json({ message: error.message });
    }
};