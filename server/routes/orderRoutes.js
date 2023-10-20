const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    getUserOrders
} = require('../controllers/orderControllers')

// Get list of all orders
router.get('/getOrders', cors(), getOrders);

// Get list of orders for a user
router.get('/getOrders/:id', cors(), getUserOrders);

// Get details of a single order
router.get('/:id', cors(), getOrder);

// Create an order
router.post('/createOrder', cors(), createOrder);

// Delete an Order
router.delete('/:id', cors(), deleteOrder);


module.exports = router;