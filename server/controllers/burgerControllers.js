const mongoose = require('mongoose');
const Burger = require('../models/burgerModel');
const Addons = require('../models/addonsModel');



const getBurgers = async(req, res) => {
    const burgersData = await Burger.find({});
    res.status(200).json(burgersData);
}

const getBurger = async(req, res) => {
    const burger_name = req.query.burgerName;
    const burgerData = await Burger.find({burger_name: burger_name});
    res.status(200).json(burgerData);
}

const getAddons = async(req, res) => {
    const addonsData = await Addons.find({});
    res.status(200).json(addonsData);
}

module.exports = {
    getBurgers,
    getBurger,
    getAddons
}