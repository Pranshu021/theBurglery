const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
    },

    orders: [
        {
            order_id: String
        }
    ],

    token: {
        type: String,
    }
})

module.exports = mongoose.model('users', UserSchema);


