const express = require('express');
const router = express.Router();
const cors = require('cors');
require('dotenv').config();


const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login
} = require('../controllers/userControllers');

// Get a User
router.get('/:id', cors(), getUser);

// Login
router.post('/login', cors(), login);

// Create a User
router.post('/createUser', cors(), createUser);

// Update User info
router.patch('/:id', cors(), updateUser);

// Delete User
router.delete('/:id', cors(), deleteUser);


module.exports = router;
