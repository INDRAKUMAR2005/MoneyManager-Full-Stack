const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive amount']
    },
    type: {
        type: String,
        required: [true, 'Please specify type (income or expense)'],
        enum: ['income', 'expense']
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    reference: {
        type: String, // Use this for "Description" / line item description
        trim: true
    },
    description: {
        type: String // Additional notes if optional
    },
    division: {
        type: String,
        enum: ['Office', 'Personal'],
        default: 'Personal',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
