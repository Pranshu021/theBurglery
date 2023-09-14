const mongoose = require('mongoose');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async(req, res) => {
    const {username, email, password, phone} = req.body;

    try {
        // Check if Old user
        const oldUser = await Users.find({email: email});

        if(oldUser.length > 0) {
            res.status(409).send("User already Exists");
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await Users.create({
            username,
            email,
            password,
        })

        const token = jwt.sign({user_id: newUser._id, email}, process.env.TOKEN_KEY, {expiresIn: "2h"});
        newUser.token = token;

        newUser.save();

        res.status(201).json(newUser);
    } catch(error) {
        console.log(error);
        res.json({error: "Something went wrong"});
    }

    // res.status(200).json({msg: "Create User API working"});
}

const login = async(req, res) => {
    res.status(200).json({msg: "Login API working"});
}

const getUser = async(req, res) => {
    res.status(200).json({msg: "Get User API working"});
}

const deleteUser = async(req, res) => {
    res.status(200).json({msg: "Delete user API working"});
}

const updateUser = async(req, res) => {
    res.status(200).json({msg: "Update user api working"});
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser,
    login
}