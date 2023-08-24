const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const burgerSchema = new Schema({
    burger_name: {
        type: String,
        required: true
    },
    burger_price: {
        type: Number,
        required: true
    },
    image_path: {
        type: String,
        required: true
    },
    preparation_time: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Burgers', burgerSchema);
