const bcrypt = require('bcryptjs');
const User = require('../models/user');

const SALT_WORK_FACTOR = 10;

exports.getAll = async (req, res) => {
    const filters = req.query && req.query.filter ? JSON.parse(req.query.filter) : {};
    const sorter = req.query && req.query.sorter ? JSON.parse(req.query.sorter) : { createdAt: -1 };
    const skip = req.query && req.query.offset ? Number(req.query.offset) : 0;
    try {
        const count = await User.countDocuments(filters);
        const limit = req.query && req.query.limit ? Number(req.query.limit) : count;
        const items = await User.find(filters)
            .sort(sorter)
            .limit(Number(limit))
            .skip(Number(skip))
            .select({ password: 0 })
            .lean();
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
        const user = await User.findById({ _id: req.params.id }).select({ password: 0 });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist.' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.post = async (req, res) => {
    try {
        const item = new User(req.body);
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
        const item = await User.findById(id);
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
        if (req.body.newPassword) {
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            req.body.password = await bcrypt.hash(req.body.newPassword, salt);
        }
        await User.updateOne({ _id: id }, { ...req.body });
        return res.status(200).json({ message: 'Updated' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};