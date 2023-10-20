const mongoose = require('mongoose');
const multer = require('multer');
const Burger = require('../models/burgerModel');
const Addons = require('../models/addonsModel');

const getBurgers = async(req, res) => {
    const burgersData = await Burger.find({}).sort({burger_price: 1});
    res.status(200).json(burgersData);
}

const getBurger = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid Item'});
    }
    const burgerData = await Burger.findById(id);
    if(burgerData) {
        res.status(200).json(burgerData);
    } else {
        return res.status(404).json({error: 'Invalid Item'});
    }
}

const addBurger = async(req, res) => {
    const { burger_name, burger_price, preparation_time } = req.body;
    const burger_image = req.file;
    const image_path = `images/${burger_image.originalname}`
    
    console.log(burger_image)
    const burger_data = {
        burger_name,
        burger_price: parseInt(burger_price),
        preparation_time: parseInt(preparation_time),
        image_path
    }

    try {
        const dbResponse = Burger.create(burger_data);
        res.status(200).send({msg: 'Burger Added'});
    } catch(error) {
        res.send({error: "DB Error"});
    }
}

const deleteBurger = async(req, res) => {
    res.status(200).json({msg: "API working"});
}

const updateBurger = async(req, res) => {
    res.status(200).json({msg: "API working"});
}

const getAddons = async(req, res) => {
    const addonsData = await Addons.find({});
    res.status(200).json(addonsData);
}



module.exports = {
    getBurgers,
    getBurger,
    getAddons,
    deleteBurger,
    updateBurger,
    addBurger
}