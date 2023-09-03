const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder
} = require('../controllers/orderControllers')

// Get list of all orders
router.get('/getOrders', cors(), getOrders);

// Get details of a single order
router.get('/:id', cors(), getOrder);

// Create an order
router.post('/createOrder', cors(), createOrder);


// Delete an Order
router.delete('/:id', cors(), deleteOrder);


module.exports = router;