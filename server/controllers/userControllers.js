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
            password: encryptedPassword,
            phone
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
    const {email, password} = req.body;
    console.log()
    
    try {
        const userData = await Users.find({email: email});
        if(userData.length === 0) {
            res.status(409).json({error: "Invalid Email or password"})
        }
    
        await bcrypt.compare(password, userData[0].password, (err, result) => {
            if(err) {
                res.status(500).json({error: "Something went wrong"});
            }
            
            if(result) {
                res.status(200).json(userData);
            } else {
                res.status(401).json({error: "Invalid credentials"});
            }

        })

    } catch(error) {
        console.log(error);
        res.json({error: "Something went wrong"});
    }

}

const getUser = async(req, res) => {
    const userId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({error: 'Something Went wrong'});
    }

    const user = await Users.findById(userId);
    if(!user) {
        return res.status(404).json({error: 'Unauthorized Access'});
    } else {
        const userData = Object.assign({}, user, {
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            orders: user.orders,
        })
        res.status(200).json(userData);
    }

    // res.status(200).json({msg: "Get User API working"});
}

const deleteUser = async(req, res) => {
    res.status(200).json({msg: "Delete user API working"});
}

const updateUser = async(req, res) => {
    const userId = req.params;
    if(!mongoose.Types.ObjectId.isValid(userId.id)) {
        console.log(userId.id)
        return res.status(404).json({error: 'Sorry! Workout doesn\'t exist'});
    }

    console.log(req.body);
    console.log(req.body.orders);

    const updateUser = await Users.findOneAndUpdate({_id: userId.id}, {
        ...req.body
    }, {new: true})


    if(!updateUser) {
        return res.status(404).json({error: 'Sorry User doesn\'t exist'});
    } else {
        res.status(200).json({msg: "Updated"});
    }
    // res.status(200).json({msg: "Update user api working"});
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser,
    login
}