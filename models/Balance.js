const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    balance: {
        type: Number,
        required: true,
        default: 0.00
    },
    transactions: [
        {
            type: {
                type: String,
                enum: ['deposit', 'withdraw'],
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('Balance', balanceSchema)