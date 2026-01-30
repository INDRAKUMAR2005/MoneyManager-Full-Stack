const Transaction = require('../models/Transaction');

// @desc    Get all transactions with optional filters
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
    try {
        const { frequency, selectedDate, type, division } = req.query; // Filtering options can be expanded

        let query = {};

        if (type && type !== 'all') {
            query.type = type;
        }

        if (division && division !== 'all') {
            query.division = division;
        }

        // Add date filtering logic here based on 'frequency' (7, 30, 365, custom) is common usage
        // For simplicity, we will return all or specific range if asked.
        // The user asked for month wise, weekly, yearly.
        // We can handle specific date ranges on the frontend by passing start/end dates or handle here.

        // Handling custom date range if passed
        if (req.query.startDate && req.query.endDate) {
            query.date = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };
        }

        const transactions = await Transaction.find(query).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
    try {
        const { title, amount, type, date, category, reference, division } = req.body;

        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        await transaction.deleteOne();

        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Update transaction
// @route   PUT /api/v1/transactions/:id
// @access  Public
exports.updateTransaction = async (req, res, next) => {
    try {
        let transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        // Check if transaction is older than 12 hours
        const createdDate = new Date(transaction.createdAt);
        const now = new Date();
        const diffMs = now - createdDate;
        const diffHrs = diffMs / (1000 * 60 * 60);

        if (diffHrs > 12) {
            return res.status(400).json({
                success: false,
                error: 'Transactions cannot be edited after 12 hours.'
            });
        }

        transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
