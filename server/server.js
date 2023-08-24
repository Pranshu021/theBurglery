const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const burgerRoutes = require('./routes/burgerRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(express.static('public'))
app.use('/api/burgers', burgerRoutes);
app.use('/api/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URI, {dbName: "theburglery"})
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("[+] Connected to DB");
        console.log("[+] Listening to port 3001")
    })
})
.catch((error) => {
    console.log(error)
})

