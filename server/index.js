const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const user_router = require('./routes/users.routes');
const slider_router = require('./routes/slider.routes');

dotenv.config();
app.use(bodyParser.json());
app.use(cors());




DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(() => {
    console.log('MongoDB Connected')
})

//routers


app.get('/api', (req, res) => {
    res.send('Hello World!')
})


app.use('/api', user_router)
app.use('/api/sliders', slider_router)
app.use('/images', express.static('images'))


PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})