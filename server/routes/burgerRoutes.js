const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    }
, 
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.originalname}`);
    }
})

const upload = multer({
    storage: multerStorage
})

const cors = require('cors');

const {
    getBurgers,
    getBurger,
    getAddons,
    deleteBurger,
    updateBurger,
    addBurger
} = require('../controllers/burgerControllers');


router.get('/burgersList', cors(), getBurgers);
router.get('/getAddons', cors(), getAddons);
router.get('/:id', cors(), getBurger);
router.post('/addBurger', cors(), upload.single("burger_image"), addBurger);
router.delete('/:id', cors(), deleteBurger);
router.patch('/:id', cors(), updateBurger);


module.exports = router;