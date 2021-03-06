const Buyer = require('../models/buyer');

exports.getAll = async (req, res) => {
    const filters = req.query && req.query.filter ? JSON.parse(req.query.filter) : {};
    const sorter = req.query && req.query.sorter ? JSON.parse(req.query.sorter) : { createdAt: -1 };
    const skip = req.query && req.query.offset ? Number(req.query.offset) : 0;
    try {
        const count = await Buyer.countDocuments(filters);
        const limit = req.query && req.query.limit ? Number(req.query.limit) : count;
        const items = await Buyer.find(filters)
            .sort(sorter)
            .limit(Number(limit))
            .skip(Number(skip))
            .lean();
        return res.status(200).json({ count, items } || { count: 0, items: [] });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};