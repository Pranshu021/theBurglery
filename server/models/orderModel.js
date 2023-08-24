const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_id: {
        type: Number,
        required: true
    },

    customer_name: {
        type: String,
        required: true
    },

    customer_phone: {
        type: String,
        required: true
    },

    order_name: {
        type: String,
        required: true
    },

    order_price: {
        type: Number,
        required: true
    },

    addons: [{
        name: String,
        quantity: Number,
        price: Number,
        total_amount: Number
    }],

    total_amount: {
        type: Number,
        required: true
    },

    order_status: {
        type: String,
        required: true
    },

    addons_amount: Number
}, {
    timestamps: true
})


module.exports = mongoose.model('orders', orderSchema);
