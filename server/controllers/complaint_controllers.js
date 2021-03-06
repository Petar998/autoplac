const Complaint = require('../models/complaint');

exports.getAll = async (req, res) => {
    const filters = req.query && req.query.filter ? JSON.parse(req.query.filter) : {};
    const sorter = req.query && req.query.sorter ? JSON.parse(req.query.sorter) : { createdAt: -1 };
    const skip = req.query && req.query.offset ? Number(req.query.offset) : 0;
    try {
        const count = await Complaint.countDocuments(filters);
        const limit = req.query && req.query.limit ? Number(req.query.limit) : count;
        const items = await Complaint.find(filters)
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
        const complaint = await Complaint.findById({ _id: req.params.id }).populate('car buyer');
        if (!complaint) {
            return res.status(401).json({ message: 'Complaint does not exist.' });
        }
        return res.status(200).json(complaint);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.post = async (req, res) => {
    try {
        const item = new Complaint(req.body);
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
        const item = await Complaint.findById(id);
        if (!item) {
            return res.status(401).json({ message: 'Does not exist.' });
        }
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
        await Complaint.updateOne({ _id: id }, { ...req.body });
        return res.status(200).json({ message: 'Updated' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};