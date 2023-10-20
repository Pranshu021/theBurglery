const mongoose = require('mongoose');

const Orders = require('../models/orderModel');

const getOrders = async(req, res) => {
    const ordersData = await Orders.find({}).sort({_id: -1});
    res.status(200).json(ordersData);
}


const getOrder = async(req, res) => {
    const orderId = req.params.id;
    console.log(orderId);
    const dbResponse = await Orders.find({order_id: orderId});
    if(dbResponse.length === 0) {
        console.log("Sending 404")
        res.json({error: "NOT FOUND"});
    } else if(dbResponse[0].order_status === "IN PROGRESS") {
        res.json({error: "IN PROGRESS"});
    } else {
        res.status(200).json({dbResponse});
    }
    // res.status(200).json({msg: "GetOrder api working"});
}

const getUserOrders = async(req, res) => {
    const user_id = req.params;
    console.log(user_id);
    if(!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: 'Invalid User'})
    }

    const dbResponse = await Orders.find({customer_id: user_id.id});
    res.status(200).json(dbResponse);

    // res.status(200).json({msg: "GetOrder api working"});
}

const createOrder = async(req, res) => {
    const { customer_id, customer_name, customer_phone, customer_email, burger_quantity, burger_price, burger_name, addons } = req.body;
    const numberOfPendingOrders = await Orders.find({});
    const order_id = numberOfPendingOrders.length + 1;
    const addons_amount = addons.reduce((sum, addon) => sum + addon.totalAmount, 0);
    const total_amount = (parseInt(burger_quantity) * parseInt(burger_price)) + addons_amount;

    console.log(addons_amount, total_amount);
    const orderData = {
        order_id,
        order_name: burger_name,
        order_quantity: burger_quantity,
        customer_email,
        customer_id,
        order_price: parseInt(burger_price),
        customer_name,
        customer_phone,
        addons: addons,
        addons_amount: addons_amount,
        order_status: "pending",
        total_amount
    }
    
    try {
        const order = await Orders.create(orderData);
        res.status(200).json(order);
    } catch(error) {
        console.log(error)
    }
    // res.status(200).json({msg: "createOrder api working"}); 
}


const deleteOrder = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Error! Order doesn\'t exist'})
    }

    const order = await Orders.findOneAndDelete({_id: id});

    if(!order) {
        return res.status(404).json({error: 'Error! Order doesn\'t exist'})
    } else {
        res.status(200).json({msg: "Delete successfull"})
    }
}


module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    getUserOrders
}