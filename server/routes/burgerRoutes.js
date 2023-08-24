const express = require('express');
const router = express.Router();

const cors = require('cors');

const {
    getBurgers,
    getBurger,
    getAddons
} = require('../controllers/burgerControllers');


router.get('/burgersList', cors(), getBurgers);
router.get('/getBurger', cors(), getBurger);
router.get('/getAddons', cors(), getAddons);

module.exports = router;