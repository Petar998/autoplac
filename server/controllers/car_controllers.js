const Car = require('../models/car');
const Image = require('../models/image');

exports.getAll = async (req, res) => {
    const filters = req.query && req.query.filter ? JSON.parse(req.query.filter) : {};
    const sorter = req.query && req.query.sorter ? JSON.parse(req.query.sorter) : { createdAt: -1 };
    const skip = req.query && req.query.offset ? Number(req.query.offset) : 0;
    try {
        const count = await Car.countDocuments(filters);
        const limit = req.query && req.query.limit ? Number(req.query.limit) : count;
        const items = await Car.find(filters)
            .sort(sorter)
            .limit(Number(limit))
            .skip(Number(skip))
            .lean()
            .populate('image');
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
        const car = await Car.findById({ _id: req.params.id }).populate('image');
        if (!car) {
            return res.status(401).json({ message: 'Car does not exist.' });
        }
        return res.status(200).json(car);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.post = async (req, res) => {
    try {
        const item = new Car(req.body);
        item.sold = false;
        if (req.body.insertedImage) {
            const image = new Image();
            image.type = req.body.insertedImage.type;
            image.uri = req.body.insertedImage.uri;
            image.name = req.body.insertedImage.uri.split('/').pop();
            item.image = image._id;
            await image.save();
        }
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
        const item = await Car.findById(id);
        if (!item) {
            return res.status(401).json({ message: 'Does not exist.' });
        }
        await Image.deleteOne({ _id: item.image });
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
        if (req.body.insertedImage) {
            const image = await Image.findOne({ uri: req.body.insertedImage.uri })
            if (!image) {
                if (req.body.image) {
                    await Image.deleteOne({ _id: req.body.image._id })
                }
                const image = new Image();
                image.type = req.body.insertedImage.type;
                image.uri = req.body.insertedImage.uri;
                image.name = req.body.insertedImage.uri.split('/').pop();
                await image.save();
                req.body.image = image._id;
            }
        } else if (!req.body.insertedImage) {
            await Image.deleteOne({ _id: req.body.image._id })
            delete req.body.image;
            await Car.updateOne({ _id: id }, { $unset: { image: '' } });
        }
        await Car.updateOne({ _id: id }, { ...req.body });
        return res.status(200).json({ message: 'Updated' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};